import type { Item } from "@/lib/cart";
import type { PRODUCTS_BY_SLUGS_QUERYResult } from "@/sanity/types";
import z from "zod";

const stripeLineItemSchema = z.object({
	price_data: z.object({
		currency: z.literal("eur"),
		product_data: z.object({
			name: z.string(),
		}),
		unit_amount: z.number(),
	}),
	quantity: z.number(),
});

export const stripeLineItemsSchema = z.array(stripeLineItemSchema);

export function buildStripeLineItems(
	cartItems: Item[],
	products: PRODUCTS_BY_SLUGS_QUERYResult,
): z.infer<typeof stripeLineItemsSchema> {
	return cartItems.map((cartItem) => {
		const product = products.find((p) => p.slug.current === cartItem.slug);
		if (!product)
			throw new Error(`Product not found for slug: ${cartItem.slug}`);

		let price = product.price;
		let name = product.name;
		if (cartItem.variant && product.variants) {
			const variant = product.variants.find((v) => v.name === cartItem.variant);
			if (variant && typeof variant.price === "number") {
				price = variant.price;
				if (variant.name) name += ` (${variant.name})`;
			}
		}

		return {
			price_data: {
				currency: "eur",
				product_data: {
					name,
				},
				unit_amount: Math.round(price * 100),
			},
			quantity: cartItem.quantity || 1,
		};
	});
}

import SingleProduct from "@/components/inventory/single";
import { api } from "@/trpc/server";

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const product = await api.inventory.getBySlug({ slug });

	return <SingleProduct product={product} />;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const product = await api.inventory.getBySlug({ slug });

	if (!product) {
		return {
			title: "Product Not Found",
		};
	}

	return {
		title: product.name,
		description:
			product.description ||
			`${product.name} - Available for $${product.price}`,
	};
}

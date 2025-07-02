"use client";

import { api } from "@/trpc/react";
import { useCart } from "@/hooks/cart-context";
import { useAuth } from "@clerk/nextjs";
import type { PRODUCT_BY_SLUG_QUERYResult } from "@/sanity/types";
import CartList from "@/components/cart/list";
import { Box, Button, Typography, Divider } from "@mui/material";

export default function CartPage() {
	const { cart } = useCart();
	const { userId, isSignedIn } = useAuth();

	let products: PRODUCT_BY_SLUG_QUERYResult[] = [];
	let cartItems = cart;

	if (isSignedIn) {
		const [items] = api.cart.getAll.useSuspenseQuery({ userId });
		cartItems = items.map(({ variant, ...rest }) => ({
			...rest,
			variant: variant === null ? undefined : variant,
		}));
		products = items.map((item) => {
			const [product] = api.inventory.getBySlug.useSuspenseQuery({
				slug: item.slug,
			});
			return product;
		});
	} else {
		products = cart.map((cartItem) => {
			const [product] = api.inventory.getBySlug.useSuspenseQuery({
				slug: cartItem.slug,
			});
			return product;
		});
	}

	// Calculate total
	const total = cartItems.reduce((sum, item) => {
		const product = products.find((p) => p?._id === item.itemId);
		if (!product) return sum;
		return sum + product.price * (item.quantity ?? 1);
	}, 0);

	return (
		<main>
			<Box sx={{ py: 4, maxWidth: 768, mx: "auto" }}>
				<Typography
					variant="h3"
					component="h1"
					align="center"
					gutterBottom
					fontWeight={700}
				>
					Your Cart
				</Typography>
				<Typography
					variant="h6"
					color="text.secondary"
					align="center"
					sx={{ mb: 4 }}
				>
					Review your selected items and proceed to checkout
				</Typography>
				<CartList products={products} cart={cartItems} />
				{cartItems.length > 0 && (
					<Box
						sx={{
							mt: 4,
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Divider sx={{ width: "100%", mb: 2 }} />
						<Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
							Total: ${total.toFixed(2)}
						</Typography>
						<Button
							variant="contained"
							color="primary"
							size="large"
							disabled={cartItems.length === 0}
							onClick={() => {
								/* Checkout action placeholder */
							}}
							sx={{ minWidth: 180, fontWeight: 600 }}
						>
							Checkout
						</Button>
					</Box>
				)}
			</Box>
		</main>
	);
}

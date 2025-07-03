"use client";

import { api } from "@/trpc/react";
import { useCart } from "@/hooks/cart-context";
import CartList from "@/components/cart/list";
import { Box, Button, Typography, Divider } from "@mui/material";

export default function CartPage() {
	const { cart } = useCart();

	const slugs = cart.map((cartItem) => cartItem.slug);
	const [products] = api.inventory.getProductsBySlugs.useSuspenseQuery({ slugs });

	const total = cart.reduce((sum, item) => {
		const product = products.find((p) => p?._id === item.itemId);
		if (!product) return sum;
		return sum + product.price * (item.quantity ?? 1);
	}, 0);

	return (
		<main>
			<Box sx={{ px: 4, py: 4, maxWidth: 768, mx: "auto" }}>
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
				<CartList products={products} cart={cart} />
				{cart.length > 0 && (
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
							disabled={cart.length === 0}
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

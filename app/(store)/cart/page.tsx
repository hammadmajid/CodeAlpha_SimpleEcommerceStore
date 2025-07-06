"use client";

import { api } from "@/trpc/react";
import { useCart } from "@/hooks/cart-context";
import CartList from "@/components/cart/list";
import CheckoutButton from "@/components/cart/checkout-button";
import { Box, Typography } from "@mui/material";

export default function CartPage() {
	const { cart } = useCart();

	const slugs = cart.map((cartItem) => cartItem.slug);
	const { data: products, isLoading } =
		api.inventory.getProductsBySlugs.useQuery(
			{
				slugs,
			},
			{
				enabled: cart.length > 0, // prevents SSR error during build
			},
		);

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

				{isLoading ? (
					<Box textAlign="center" py={8}>
						<Typography variant="h6" color="text.secondary">
							Loading...
						</Typography>
					</Box>
				) : products && products.length > 0 ? (
					<CartList products={products} cart={cart} />
				) : (
					<Box textAlign="center" py={8}>
						<Typography variant="h6" color="text.secondary">
							Your cart is empty.
						</Typography>
					</Box>
				)}
				{cart.length > 0 && products && (
					<CheckoutButton cart={cart} products={products} />
				)}
			</Box>
		</main>
	);
}

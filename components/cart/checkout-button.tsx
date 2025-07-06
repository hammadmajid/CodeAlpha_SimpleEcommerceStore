"use client";

import { Box, Button, Divider, Typography } from "@mui/material";
import type { Item } from "@/lib/cart";
import { api, type RouterOutputs } from "@/trpc/react";
import { buildStripeLineItems } from "@/utils/stripe";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface CheckoutButtonProps {
	cart: Item[];
	products: RouterOutputs["inventory"]["getProductsBySlugs"];
}

export default function CheckoutButton({
	cart,
	products,
}: CheckoutButtonProps) {
	const { userId, isSignedIn } = useAuth();
	const router = useRouter();

	if (!isSignedIn) {
		return <></>;
	}

	let total = 0;
	if (products) {
		total = cart.reduce((sum, item) => {
			const product = products.find((p) => p?._id === item.itemId);
			if (!product) return sum;
			return sum + product.price * (item.quantity ?? 1);
		}, 0);
	}

	const lineItems = buildStripeLineItems(cart, products);
	const mutation = api.payment.checkout.useMutation({
		onSuccess: (data) => {
			if (data.url) {
				window.location.href = data.url;
			}
		},
		onError: () => {
			router.push("/failed");
		},
	});

	const handleCheckout = () => {
		mutation.mutate({
			userId,
			lineItems,
		});
	};

	return (
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
				onClick={handleCheckout}
				sx={{ minWidth: 180, fontWeight: 600 }}
			>
				Checkout
			</Button>
		</Box>
	);
}

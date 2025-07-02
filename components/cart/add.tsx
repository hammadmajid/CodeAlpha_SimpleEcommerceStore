"use client";

import type { RouterInputs } from "@/trpc/react";
import { api } from "@/trpc/react";
import Button from "@mui/material/Button";
import { ShoppingCartSimpleIcon } from "@phosphor-icons/react/dist/ssr/ShoppingCartSimple";

export default function AddToCart({
	userId,
	itemId,
	slug,
	variant,
}: RouterInputs["cart"]["insertItem"]) {
	const mutation = api.cart.insertItem.useMutation();

	const handleClick = () => {
		mutation.mutate({
			userId,
			itemId,
			slug,
			variant,
		});
	};

	return (
		<Button
			size="small"
			variant="contained"
			color="primary"
			fullWidth
			sx={{ textTransform: "none", fontWeight: 500, py: 1.5, px: 4 }}
			startIcon={<ShoppingCartSimpleIcon weight="bold" />}
			onClick={handleClick}
			disabled={mutation.isPending}
		>
			{mutation.isPending
				? "Adding..."
				: mutation.error
					? mutation.error.message
					: "Add to Cart"}
		</Button>
	);
}

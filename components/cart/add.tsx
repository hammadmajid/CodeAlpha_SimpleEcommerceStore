"use client";

import type { RouterInputs } from "@/trpc/react";
import Button from "@mui/material/Button";
import { ShoppingCartSimpleIcon } from "@phosphor-icons/react/dist/csr/ShoppingCartSimple";
import { useCart } from "@/hooks/cart-context";

export default function AddToCart({ itemId, slug, variant }: RouterInputs["cart"]["insertItem"]["item"]) {
	const { addItem, loading } = useCart();

	const handleClick = () => {
		addItem({ itemId, slug, variant, quantity: null });
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
			disabled={loading}
		>
			{loading ? "Adding..." : "Add to Cart"}
		</Button>
	);
}

"use client";

import type { RouterInputs } from "@/trpc/react";
import { api } from "@/trpc/react";
import Button from "@mui/material/Button";
import { ShoppingCartSimpleIcon } from "@phosphor-icons/react/dist/ssr/ShoppingCartSimple";
import { useUser } from "@clerk/nextjs";
import { useCart } from "@/hooks/cart-context";

type AddToCartProps = RouterInputs["cart"]["insertItem"]["item"];

function AddToCartButton({
	onClick,
	disabled,
	children,
}: {
	onClick: () => void;
	disabled?: boolean;
	children: React.ReactNode;
}) {
	return (
		<Button
			size="small"
			variant="contained"
			color="primary"
			fullWidth
			sx={{ textTransform: "none", fontWeight: 500, py: 1.5, px: 4 }}
			startIcon={<ShoppingCartSimpleIcon weight="bold" />}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</Button>
	);
}

export default function AddToCart({ itemId, slug, variant }: AddToCartProps) {
	const { isLoaded, isSignedIn, user } = useUser();
	const mutation = api.cart.insertItem.useMutation();
	const { addItem } = useCart();

	if (!isSignedIn) {
		const handleGuestAdd = () => {
			addItem({ itemId, slug, variant });
		};
		return (
			<AddToCartButton onClick={handleGuestAdd}>Add to Cart</AddToCartButton>
		);
	}

	const handleClick = () => {
		mutation.mutate({
			userId: user.id,
			item: {
				itemId,
				slug,
				variant,
			},
		});
	};

	return (
		<AddToCartButton
			onClick={handleClick}
			disabled={mutation.isPending || !isLoaded}
		>
			{mutation.isPending
				? "Adding..."
				: mutation.error
					? mutation.error.message
					: "Add to Cart"}
		</AddToCartButton>
	);
}

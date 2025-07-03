import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Typography,
	IconButton,
	Grid,
	Chip,
} from "@mui/material";
import { MinusIcon } from "@phosphor-icons/react/dist/csr/Minus";
import { PlusIcon } from "@phosphor-icons/react/dist/csr/Plus";
import { TrashIcon } from "@phosphor-icons/react/dist/csr/Trash";
import { SpinnerGap } from "@phosphor-icons/react/dist/csr/SpinnerGap";
import type { RouterOutputs } from "@/trpc/react";
import { urlFor } from "@/sanity/lib/image";
import type { Item } from "@/lib/cart";
import { useCart } from "@/hooks/cart-context";
import "./list.css"; // (create this file if it doesn't exist)

interface CartListProps {
	products: RouterOutputs["inventory"]["getProductsBySlugs"];
	cart: Item[];
}

export default function CartList({ products, cart }: CartListProps) {
	const { addItem, removeItem, decrementItem, pendingAction, pendingItem } = useCart();

	const handleIncrement = (itemId: string, variant?: string | null) => {
		const item = cart.find(
			(i) => i.itemId === itemId && (variant ?? null) === (i.variant ?? null),
		);
		if (item) {
			addItem(item);
		}
	};

	const handleDecrement = (itemId: string, variant?: string | null) => {
		decrementItem(itemId, variant);
	};

	const handleRemove = (itemId: string, variant?: string | null) => {
		removeItem(itemId, variant);
	};

	if (!cart.length) {
		return (
			<Box textAlign="center" py={8}>
				<Typography variant="h6" color="text.secondary">
					Your cart is empty.
				</Typography>
			</Box>
		);
	}

	return (
		<Grid container spacing={3}>
			{cart.map((cartItem) => {
				const product = products.find((p) => p?._id === cartItem.itemId);
				if (!product) return null;

				const variant =
					cartItem.variant &&
					product.variants?.find((v) => v._key === cartItem.variant);

				const image =
					product.images?.[0] ||
					"https://via.placeholder.com/150?text=No+Image";

				const isPending =
					pendingItem &&
					pendingItem.itemId === cartItem.itemId &&
					(pendingItem.variant ?? null) === (cartItem.variant ?? null);

				return (
					<Grid
						size={{ xs: 12 }}
						key={cartItem.itemId + (cartItem.variant || "")}
					>
						<Card sx={{ display: "flex", alignItems: { xs: "flex-start", sm: "center" }, p: 2, flexDirection: { xs: "column", sm: "row" } }}>
							<CardMedia
								component="img"
								image={
									typeof image === "string"
										? image
										: urlFor(image).width(120).height(120).url()
								}
								alt={product.name}
								sx={{
									width: 120,
									height: 120,
									objectFit: "cover",
									borderRadius: 2,
									mr: { xs: 0, sm: 2 },
									mb: { xs: 2, sm: 0 },
								}}
							/>
							<CardContent sx={{ flex: 1, width: "100%" }}>
								<Typography variant="h6" sx={{ fontWeight: 600 }}>
									{product.name}
								</Typography>
								{variant && (
									<Chip
										label={variant.name}
										size="small"
										color="secondary"
										sx={{ mb: 1, mt: 1 }}
									/>
								)}
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{
										mb: 1,
										overflow: "hidden",
										textOverflow: "ellipsis",
										display: "-webkit-box",
										WebkitLineClamp: 2,
										WebkitBoxOrient: "vertical",
									}}
								>
									{product.description}
								</Typography>
								<Typography
									variant="subtitle1"
									color="primary"
									sx={{ fontWeight: 600 }}
								>
									${product.price.toFixed(2)}
								</Typography>
							</CardContent>
							{/* Responsive action buttons */}
							<Box
								display="flex"
								flexDirection={{ xs: "row", sm: "row" }}
								alignItems={{ xs: "center", sm: "center" }}
								justifyContent={{ xs: "space-between", sm: "flex-end" }}
								width={{ xs: "100%", sm: "auto" }}
								sx={{ mt: { xs: 2, sm: 0 }, gap: { xs: 2, sm: 0 } }}
							>
								{/* Group inc/dec */}
								<Box display="flex" alignItems="center" gap={1}>
									<IconButton
										size="small"
										onClick={() =>
											handleDecrement(cartItem.itemId, cartItem.variant)
										}
										disabled={
											!!((cartItem.quantity ?? 1) <= 1 ||
											(isPending && pendingAction === "decrement"))
										}
										aria-label="decrement"
									>
										{isPending && pendingAction === "decrement" ? (
											<SpinnerGap className="spin" size={16} />
										) : (
											<MinusIcon />
										)}
									</IconButton>
									<Typography>{cartItem.quantity}</Typography>
									<IconButton
										size="small"
										onClick={() =>
											handleIncrement(cartItem.itemId, cartItem.variant)
										}
										disabled={
											!!((cartItem.quantity ?? 1) >= 10 ||
											(isPending && pendingAction === "increment"))
										}
										aria-label="increment"
									>
										{isPending && pendingAction === "increment" ? (
											<SpinnerGap className="spin" size={16} />
										) : (
											<PlusIcon />
										)}
									</IconButton>
								</Box>
								{/* Remove button with spacing */}
								<Box ml={{ xs: 0, sm: 2 }} mt={{ xs: 0, sm: 0 }}>
									<IconButton
										size="small"
										onClick={() => handleRemove(cartItem.itemId, cartItem.variant)}
										disabled={!!(isPending && pendingAction === "remove")}
										aria-label="remove"
									>
										{isPending && pendingAction === "remove" ? (
											<SpinnerGap className="spin" size={16} />
										) : (
											<TrashIcon />
										)}
									</IconButton>
								</Box>
							</Box>
						</Card>
					</Grid>
				);
			})}
		</Grid>
	);
}

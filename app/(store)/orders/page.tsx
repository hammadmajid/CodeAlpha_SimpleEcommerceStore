"use client";

import { api } from "@/trpc/react";
import {
	Box,
	Typography,
	Card,
	CardContent,
	List,
	ListItem,
	Divider,
} from "@mui/material";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type { Order, OrderItem as OrderItemType } from "@/types/item";

function OrderItem({ order }: { order: Order }) {
	return (
		<Card sx={{ mb: 3 }}>
			<CardContent>
				<Typography variant="subtitle1" fontWeight={600}>
					Order ID: {order.id}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Status: {order.status}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Total:{" "}
					{typeof order.total === "number"
						? `$${(order.total / 100).toFixed(2)}`
						: "-"}{" "}
					{order.currency?.toUpperCase()}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Placed:{" "}
					{order.createdAt && new Date(order.createdAt).toLocaleString()}
				</Typography>
				<Divider sx={{ my: 1 }} />
				<Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
					Items:
				</Typography>
				<List disablePadding>
					{order.items?.map((item: OrderItemType) => (
						<ListItem
							key={String(item.productId) + String(item.description)}
							sx={{ pl: 0 }}
						>
							<Box>
								<Typography variant="body2">
									{String(item.description || item.productId)} x{item.quantity}
								</Typography>
								<Typography variant="caption" color="text.secondary">
									Amount:{" "}
									{typeof item.amount === "number"
										? `$${(item.amount / 100).toFixed(2)}`
										: "-"}
								</Typography>
							</Box>
						</ListItem>
					))}
				</List>
			</CardContent>
		</Card>
	);
}

export default function OrdersPage() {
	const { userId, isSignedIn, isLoaded } = useAuth();
	const router = useRouter();

	if (!isSignedIn) {
		return router.push("/");
	}

	const { data: orders, isLoading } = api.payment.getOrders.useQuery(
		{ userId },
		{ enabled: !!userId },
	);

	if (!isLoaded || isLoading) {
		return (
			<main>
				<Box textAlign="center" py={8}>
					<Typography variant="h6" color="text.secondary">
						Loading...
					</Typography>
				</Box>
			</main>
		);
	}

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
					Your Orders
				</Typography>
				<Typography
					variant="h6"
					color="text.secondary"
					align="center"
					sx={{ mb: 4 }}
				>
					View your past orders and their details
				</Typography>
				{orders && orders.length > 0 ? (
					<List>
						{orders.map((order) => {
							const mappedOrder: Order = {
								...order,
								items: order.items?.map((item) => ({
									...item,
									productId:
										typeof item.productId === "string"
											? item.productId
											: item.productId && "id" in item.productId
												? (item.productId as { id: string }).id
												: item.productId === undefined
													? null
													: String(item.productId),
								})),
							};
							return <OrderItem key={order.id} order={mappedOrder} />;
						})}
					</List>
				) : (
					<Box textAlign="center" py={8}>
						<Typography variant="h6" color="text.secondary">
							You have no orders yet.
						</Typography>
					</Box>
				)}
			</Box>
		</main>
	);
}

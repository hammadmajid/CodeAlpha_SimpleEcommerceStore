"use client";

import React from "react";
import type { Item } from "@/lib/cart";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext } from "react";
import { useGuestCart } from "./guest-cart";

// Unified cart API type
interface UnifiedCart {
	cart: Item[];
	itemCount: number;
	addItem: (item: Item) => void;
	removeItem: (itemId: string, variant?: string | null) => void;
	clearCart: () => void;
	decrementItem: (itemId: string, variant?: string | null) => void;
	loading: boolean;
	pendingAction?: "increment" | "decrement" | "remove" | null;
	pendingItem?: { itemId: string; variant?: string | null } | null;
}

const CartContext = createContext<UnifiedCart | undefined>(undefined);

function useUnifiedCart(): UnifiedCart {
	const { isLoaded, isSignedIn, user } = useUser();
	const guest = useGuestCart();

	// Server cart logic
	const userId = user?.id;
	const enabled = isLoaded && isSignedIn && !!userId;

	// Fetch server cart only if enabled
	const { data: serverCart = [], isLoading } = api.cart.getAll.useQuery(
		enabled ? { userId } : { userId: "" },
		{
			enabled,
		},
	);
	const { data: serverCount = 0 } = api.cart.getItemsCount.useQuery(
		enabled ? { userId } : { userId: "" },
		{ enabled },
	);
	const utils = api.useUtils();

	// Track pending action and item
	const [pendingAction, setPendingAction] = React.useState<"increment" | "decrement" | "remove" | null>(null);
	const [pendingItem, setPendingItem] = React.useState<{ itemId: string; variant?: string | null } | null>(null);

	const insertMutation = api.cart.insertItem.useMutation({
		onMutate: async (vars) => {
			setPendingAction("increment");
			setPendingItem({ itemId: vars.item.itemId, variant: vars.item.variant });
		},
		onSettled: () => {
			setPendingAction(null);
			setPendingItem(null);
		},
		onSuccess: async () => {
			if (userId) {
				await utils.cart.getAll.invalidate({ userId });
				await utils.cart.getItemsCount.invalidate({ userId });
			}
		},
	});
	const removeMutation = api.cart.removeItem.useMutation({
		onMutate: async (vars) => {
			setPendingAction("remove");
			setPendingItem({ itemId: vars.itemId, variant: vars.variant });
		},
		onSettled: () => {
			setPendingAction(null);
			setPendingItem(null);
		},
		onSuccess: async () => {
			if (userId) {
				await utils.cart.getAll.invalidate({ userId });
				await utils.cart.getItemsCount.invalidate({ userId });
			}
		},
	});
	const clearMutation = api.cart.clearCart.useMutation({
		onSuccess: async () => {
			if (userId) {
				await utils.cart.getAll.invalidate({ userId });
				await utils.cart.getItemsCount.invalidate({ userId });
			}
		},
	});
	const decrementMutation = api.cart.decrementItem.useMutation({
		onMutate: async (vars) => {
			setPendingAction("decrement");
			setPendingItem({ itemId: vars.itemId, variant: vars.variant });
		},
		onSettled: () => {
			setPendingAction(null);
			setPendingItem(null);
		},
		onSuccess: async () => {
			if (userId) {
				await utils.cart.getAll.invalidate({ userId });
				await utils.cart.getItemsCount.invalidate({ userId });
			}
		},
	});

	if (enabled) {
		return {
			cart: serverCart,
			itemCount: serverCount,
			addItem: (item) => {
				if (!userId) return;
				insertMutation.mutate({ userId, item });
			},
			removeItem: (itemId, variant) => {
				if (!userId) return;
				removeMutation.mutate({
					userId,
					itemId,
					variant: variant ?? undefined,
				});
			},
			clearCart: () => {
				if (!userId) return;
				clearMutation.mutate({ userId });
			},
			decrementItem: (itemId, variant) => {
				if (!userId) return;
				decrementMutation.mutate({
					userId,
					itemId,
					variant: variant ?? undefined,
				});
			},
			loading:
				isLoading ||
				insertMutation.isPending ||
				removeMutation.isPending ||
				clearMutation.isPending ||
				decrementMutation.isPending,
			pendingAction,
			pendingItem,
		};
	}

	// Fallback to guest cart
	return { ...guest, loading: false, pendingAction: null, pendingItem: null };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
	const cart = useUnifiedCart();
	return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) throw new Error("useCart must be used within a CartProvider");
	return context;
}

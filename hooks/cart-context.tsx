"use client";

import type React from "react";
import { createContext, useContext } from "react";
import { useGuestCart } from "./guest-cart";
import { useUser } from "@clerk/nextjs";
import { api } from "@/trpc/react";
import type { Item } from "@/lib/cart";

// Unified cart API type
interface UnifiedCart {
	cart: Item[];
	itemCount: number;
	addItem: (item: Item) => void;
	removeItem: (itemId: string, variant?: string | null) => void;
	clearCart: () => void;
	loading: boolean;
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
	const insertMutation = api.cart.insertItem.useMutation({
		onSuccess: async () => {
			if (userId) {
				await utils.cart.getAll.invalidate({ userId });
				await utils.cart.getItemsCount.invalidate({ userId });
			}
		},
	});
	const removeMutation = api.cart.removeItem.useMutation({
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
			loading:
				isLoading ||
				insertMutation.isPending ||
				removeMutation.isPending ||
				clearMutation.isPending,
		};
	}

	// Fallback to guest cart
	return { ...guest, loading: false };
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

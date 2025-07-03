"use client";

import type { Item } from "@/lib/cart";
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "guest_cart";

export function useGuestCart() {
	const [cart, setCart] = useState<Item[]>(() => {
		if (typeof window === "undefined") return [];
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
	}, [cart]);

	const itemCount = cart.reduce(
		(total, item) => total + (item.quantity ?? 1),
		0,
	);

	const addItem = useCallback((item: Item) => {
		setCart((prev) => {
			const idx = prev.findIndex(
				(i) =>
					i.itemId === item.itemId &&
					(i.variant ?? null) === (item.variant ?? null),
			);

			if (idx !== -1) {
				// Item exists, increment quantity
				return prev.map((i, j) =>
					j === idx ? { ...i, quantity: (i.quantity ?? 1) + 1 } : i,
				);
			}
			// Item does not exist, add with quantity 1
			return [...prev, { ...item, quantity: 1 }];
		});
	}, []);

	const removeItem = useCallback((itemId: string, variant?: string | null) => {
		setCart((prev) =>
			prev.filter(
				(i) =>
					i.itemId !== itemId ||
					(variant !== undefined && i.variant !== variant),
			),
		);
	}, []);

	const clearCart = useCallback(() => {
		setCart([]);
	}, []);

	const decrementItem = useCallback((itemId: string, variant?: string | null) => {
		setCart((prev) => {
			const idx = prev.findIndex(
				(i) => i.itemId === itemId && (i.variant ?? null) === (variant ?? null)
			);
			if (idx === -1) return prev;
			const item = prev[idx];
			if ((item.quantity ?? 1) > 1) {
				return prev.map((i, j) =>
					j === idx ? { ...i, quantity: (i.quantity ?? 1) - 1 } : i
				);
			} else {
				return prev.filter((_, j) => j !== idx);
			}
		});
	}, []);

	return { cart, itemCount, addItem, removeItem, clearCart, decrementItem };
}

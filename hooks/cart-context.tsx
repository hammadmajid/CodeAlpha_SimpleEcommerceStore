"use client";

import type React from "react";
import { createContext, useContext } from "react";
import { useGuestCart } from "./guest-cart";

const CartContext = createContext<ReturnType<typeof useGuestCart> | undefined>(
	undefined,
);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const cart = useGuestCart();
	return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) throw new Error("useCart must be used within a CartProvider");
	return context;
}

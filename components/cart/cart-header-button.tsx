"use client";

import Button from "@mui/material/Button";
import { ShoppingCartSimpleIcon } from "@phosphor-icons/react/dist/csr/ShoppingCartSimple";
import { NextLinkComposed } from "@/components/link";
import { useCart } from "@/hooks/cart-context";
import Box from "@mui/material/Box";

export default function CartButton() {
  const { itemCount } = useCart();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button
        variant="text"
        color="inherit"
        sx={{ minWidth: 0, padding: 1 }}
        aria-label="Cart"
        startIcon={<ShoppingCartSimpleIcon weight="bold" />}
        component={NextLinkComposed}
        to={{ pathname: "/cart" }}
      >
        {itemCount}
      </Button>
    </Box>
  );
}

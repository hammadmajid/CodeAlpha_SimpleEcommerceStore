import { api } from "@/trpc/server";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { ShoppingCartSimpleIcon } from "@phosphor-icons/react/dist/ssr/ShoppingCartSimple";
import { SignInIcon } from "@phosphor-icons/react/dist/ssr/SignIn";
import Link from "next/link";
import type React from "react";
import { NextLinkComposed } from "./link";

const Header: React.FC = () => {
	const itemCount = api.cart.getItemsCount({ userId: "foo" });

	return (
		<AppBar position="static">
			<Toolbar sx={{ padding: "16px 24px", minHeight: "80px" }}>
				<Typography
					variant="h6"
					noWrap
					sx={{ flexGrow: 1, fontWeight: 900, fontSize: "1.5rem" }}
				>
					<Link
						href="/"
						style={{
							textDecoration: "none",
							color: "inherit",
						}}
					>
						PREPEN
					</Link>
				</Typography>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Box
						sx={{
							position: "relative",
							width: { xs: "200px", sm: "300px" },
							display: { xs: "none", sm: "flex" },
							alignItems: "center",
						}}
					>
						<MagnifyingGlassIcon
							size={24}
							weight="bold"
							color="#000"
							style={{
								position: "absolute",
								left: "12px",
								zIndex: 1,
							}}
						/>
						<InputBase
							placeholder="SEARCH PRODUCTS..."
							inputProps={{ "aria-label": "search" }}
							sx={{
								width: "100%",
								paddingLeft: "48px !important",
								color: "#000000",
								fontWeight: 600,
								textTransform: "uppercase",
								fontSize: "0.9rem",
								"& input::placeholder": {
									color: "#666666",
									opacity: 1,
									textTransform: "uppercase",
									fontWeight: 600,
								},
							}}
						/>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Button
							variant="text"
							color="inherit"
							sx={{ minWidth: 0, padding: 1 }}
							aria-label="Cart"
							startIcon={<ShoppingCartSimpleIcon weight="bold" />}
							component={NextLinkComposed}
							to={{
								pathname: "/cart",
							}}
						>
							{itemCount}
						</Button>
					</Box>
					<SignedOut>
						<SignInButton>
							<Button
								variant="contained"
								color="secondary"
								startIcon={<SignInIcon weight="bold" />}
							>
								Sign In
							</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<UserButton
							appearance={{
								elements: {
									avatarBox: {
										borderRadius: 0,
										border: "2px solid #000",
										boxShadow: "4px 4px 0 #000",
										fontWeight: 900,
										width: "48px",
										height: "48px",
										minWidth: "48px",
										minHeight: "48px",
									},
								},
							}}
						/>
					</SignedIn>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;

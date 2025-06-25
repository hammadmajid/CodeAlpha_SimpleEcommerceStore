"use client";

import type React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header: React.FC = () => (
	<AppBar position="static">
		<Toolbar sx={{ padding: "16px 24px", minHeight: "80px" }}>
			<Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 900, fontSize: "1.5rem" }}>
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
						display: "flex",
						alignItems: "center"
					}}
				>
					<SearchIcon
						sx={{
							position: "absolute",
							left: "12px",
							zIndex: 1,
							color: "#000000"
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
							}
						}}
					/>
				</Box>
				<SignedOut>
					<SignInButton>
						<Button variant="contained" color="secondary">
							Sign In
						</Button>
					</SignInButton>
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</Box>
		</Toolbar>
	</AppBar>
);

export default Header;

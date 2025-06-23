"use client";

import type React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		width: "250px",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
	},
}));

const Header: React.FC = () => (
	<AppBar position="static">
		<Toolbar>
			<Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
				prepen
			</Typography>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search products"
						inputProps={{ "aria-label": "search" }}
					/>
				</Search>
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

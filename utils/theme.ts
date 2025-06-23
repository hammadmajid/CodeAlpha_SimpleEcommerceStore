"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	// cssVariables: true,
	typography: {
		fontFamily: "var(--font-roboto)",
	},
	shape: {
		borderRadius: 8,
	},
});

export default theme;

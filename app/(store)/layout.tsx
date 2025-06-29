import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/utils/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/react";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

export const metadata: Metadata = {
	title: "PREPEN",
	description: "A school supplies store.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {


	return (
		<html lang="en" className={roboto.variable}>
			<body>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<ClerkProvider>
							<TRPCReactProvider>
								<Header />
								{children}
							</TRPCReactProvider>
						</ClerkProvider>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}

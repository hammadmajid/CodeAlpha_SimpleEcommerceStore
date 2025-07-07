import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: "#fafafa",
				borderTop: "2px solid #000",
				py: 4,
				px: { xs: 2, sm: 6 },
				mt: 8,
				mb: 8,
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					justifyContent: "space-between",
					alignItems: { xs: "flex-start", sm: "center" },
					gap: 4,
				}}
			>
				{/* First column */}
				<Box>
					<Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
						Navigation
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
						<Link href="/" style={{ textDecoration: "none", color: "#222" }}>
							Home
						</Link>
						<Link
							href="/cart"
							style={{ textDecoration: "none", color: "#222" }}
						>
							Cart
						</Link>
						<Link
							href="/orders"
							style={{ textDecoration: "none", color: "#222" }}
						>
							Orders
						</Link>
					</Box>
				</Box>
				{/* Second column */}
				<Box>
					<Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
						Resources
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
						<a
							href="https://github.com/hammadmajid/prepen"
							target="_blank"
							rel="noopener noreferrer"
							style={{ textDecoration: "none", color: "#222" }}
						>
							GitHub
						</a>
						<Link
							href="/privacy"
							style={{ textDecoration: "none", color: "#222" }}
						>
							Privacy
						</Link>
						<Link
							href="/legal"
							style={{ textDecoration: "none", color: "#222" }}
						>
							Legal
						</Link>
					</Box>
				</Box>
				{/* Third column */}
				<Box sx={{ minWidth: 180 }}>
					<Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
						&nbsp;
					</Typography>
					<Typography variant="body2" color="text.secondary">
						&copy; {new Date().getFullYear()} PREPEN. All rights reserved.
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}

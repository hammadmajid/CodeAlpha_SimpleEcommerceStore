import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";

export default function CanceledPage() {
	return (
		<Container
			maxWidth="sm"
			sx={{
				py: 8,
				textAlign: "center",
				background: "#fff",
				border: "4px solid #000",
				borderRadius: 4,
				boxShadow: "8px 8px 0 #000",
			}}
		>
			{/* <CancelIcon sx={{ fontSize: 64, color: "#d50000", mb: 2 }} /> */}
			<Typography
				variant="h3"
				fontWeight={900}
				gutterBottom
				sx={{ letterSpacing: 2 }}
			>
				Payment Canceled
			</Typography>
			<Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
				Your payment was not completed. You can try again or return to the
				store.
			</Typography>
			<Button
				component={Link}
				href="/"
				variant="contained"
				sx={{
					background: "#fff",
					color: "#000",
					border: "2px solid #000",
					boxShadow: "4px 4px 0 #000",
					fontWeight: 700,
					"&:hover": {
						background: "#f5f5f5",
						boxShadow: "2px 2px 0 #000",
					},
				}}
			>
				Back to Home
			</Button>
		</Container>
	);
}

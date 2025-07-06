import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "next/link";

export default function SuccessPage() {
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
			{/* <CheckCircleIcon sx={{ fontSize: 64, color: "#00c853", mb: 2 }} /> */}
			<Typography
				variant="h3"
				fontWeight={900}
				gutterBottom
				sx={{ letterSpacing: 2 }}
			>
				Payment Successful!
			</Typography>
			<Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
				Thank you for your purchase. Your order is being processed.
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

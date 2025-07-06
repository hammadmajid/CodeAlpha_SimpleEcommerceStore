import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CheckSquareIcon } from "@phosphor-icons/react/dist/ssr/CheckSquare";
import Link from "next/link";

export default function SuccessPage() {
	return (
		<Container
			maxWidth="sm"
			sx={{
				py: 10,
				my: 10,
				textAlign: "center",
				background: "#fff",
				border: "4px solid #000",
				borderRadius: 4,
				boxShadow: "8px 8px 0 #000",
			}}
		>
			<CheckSquareIcon size="64" />
			<Typography
				variant="h3"
				fontWeight={900}
				gutterBottom
				sx={{ letterSpacing: 2, mt: 2 }}
			>
				Payment Successful!
			</Typography>
			<Typography variant="h6" color="text.secondary" sx={{ mb: 6, mt: 2 }}>
				Thank you for your purchase. Your order is being processed.
			</Typography>
			<Button
				component={Link}
				href="/"
				variant="contained"
				color="primary"
				sx={{
					border: "2px solid #000",
					boxShadow: "4px 4px 0 #000",
					fontWeight: 700,
					"&:hover": {
						background: "#1976d2",
						boxShadow: "2px 2px 0 #000",
					},
				}}
			>
				Back to Home
			</Button>
		</Container>
	);
}

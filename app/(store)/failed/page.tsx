import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { XSquareIcon } from "@phosphor-icons/react/dist/ssr/XSquare";
import Link from "next/link";

export default function FailedPage() {
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
			<XSquareIcon size="64" />
			<Typography
				variant="h3"
				fontWeight={900}
				gutterBottom
				sx={{ letterSpacing: 2, mt: 2 }}
			>
				Payment Failed
			</Typography>
			<Typography variant="h6" color="text.secondary" sx={{ mb: 6, mt: 2 }}>
				There was an error processing your payment. Please try again or contact
				support.
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

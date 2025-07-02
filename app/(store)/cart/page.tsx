import { api } from "@/trpc/server";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default async function CartPage() {
	const items = await api.cart.getAll({ userId: "foo" });

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Typography variant="h3" component="h1" gutterBottom align="center">
				Your Cart
			</Typography>
			<Typography
				variant="h6"
				color="text.secondary"
				align="center"
				sx={{ mb: 4 }}
			>
				{items.length === 0
					? "Your cart is empty."
					: "Review the items in your cart below."}
			</Typography>

			{items.length > 0 && (
				<Box display="flex" justifyContent="center">
					<TableContainer
						component={Paper}
						sx={{ maxWidth: 600, borderRadius: 2, boxShadow: 1 }}
					>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Product</TableCell>
									<TableCell>Variant</TableCell>
									<TableCell align="right">Quantity</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{items.map((item, idx) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<TableRow key={idx}>
										<TableCell>{item.slug}</TableCell>
										<TableCell>{item.variant || "-"}</TableCell>
										<TableCell align="right">{item.quantity}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			)}
		</Container>
	);
}

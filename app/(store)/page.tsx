import ProdutctList from "@/components/inventory/list";
import { api } from "@/trpc/server";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default async function ProductsPage() {
	const products = await api.inventory.getAll();

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Typography variant="h3" component="h1" gutterBottom align="center">
				Our Products
			</Typography>

			<Typography
				variant="h6"
				color="text.secondary"
				align="center"
				sx={{ mb: 4 }}
			>
				Discover our amazing collection of products
			</Typography>
			<ProdutctList products={products} />
		</Container>
	);
}

import {
	Container,
	Typography,
	Grid,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Button,
	Chip,
	Box
} from '@mui/material';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PRODUCTS_QUERY } from '@/lib/queries';
import type { Product } from '@/types/product';

async function getProducts(): Promise<Product[]> {
	return await client.fetch(PRODUCTS_QUERY);
}

export default async function ProductsPage() {
	const products = await getProducts();

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Typography variant="h3" component="h1" gutterBottom align="center">
				Our Products
			</Typography>

			<Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
				Discover our amazing collection of products
			</Typography>

			<Grid container spacing={3}>
				{products.map((product) => (
					<Grid key={product._id}>
						<Card
							sx={{
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								transition: 'transform 0.2s ease-in-out',
								'&:hover': {
									transform: 'translateY(-4px)',
									boxShadow: 3
								}
							}}
						>
							{product.images && product.images[0] && (
								<CardMedia
									component="img"
									height="250"
									image={urlFor(product.images[0]).width(400).height(250).url()}
									alt={product.images[0].alt || product.name}
									sx={{ objectFit: 'cover' }}
								/>
							)}

							<CardContent sx={{ flexGrow: 1 }}>
								<Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
									<Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 600 }}>
										{product.name}
									</Typography>
									{product.featured && (
										<Chip label="Featured" color="primary" size="small" />
									)}
								</Box>

								{product.description && (
									<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
										{product.description.length > 100
											? `${product.description.substring(0, 100)}...`
											: product.description
										}
									</Typography>
								)}

								<Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
									${product.price.toFixed(2)}
								</Typography>

								{product.category && (
									<Chip
										label={product.category.name}
										variant="outlined"
										size="small"
										sx={{ mt: 1 }}
									/>
								)}
							</CardContent>

							<CardActions sx={{ p: 2, pt: 0 }}>
								<Link href={`/product/${product.slug.current}`} passHref>
									<Button
										size="small"
										variant="contained"
										fullWidth
										sx={{ textTransform: 'none', fontWeight: 500 }}
									>
										View Details
									</Button>
								</Link>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>

			{products.length === 0 && (
				<Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
					<Typography variant="h6" color="text.secondary">
						No products found. Add some products in Sanity Studio!
					</Typography>
				</Box>
			)}
		</Container>
	);
}
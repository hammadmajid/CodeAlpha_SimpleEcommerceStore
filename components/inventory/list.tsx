import {
	Typography,
	Grid,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Chip,
	Box,
} from "@mui/material";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { RouterOutputs } from "@/trpc/react";
import AddToCart from "../cart/add";

interface ProdutctListProps {
	products: RouterOutputs["inventory"]["getAll"];
}

export default function ProdutctList({ products }: ProdutctListProps) {
	return (
		<Grid container spacing={3}>
			{products.map((product) => (
				<Grid
					key={product._id}
					size={{
						xs: 12,
						sm: 6,
						md: 4,
						lg: 3,
					}}
					display="flex"
					justifyContent="center"
				>
					<Card
						sx={{
							width: "100%",
							maxWidth: 420,
							height: "100%",
							display: "flex",
							flexDirection: "column",
							transition: "transform 0.2s ease-in-out",
							"&:hover": {
								transform: "translateY(-4px)",
								boxShadow: 3,
							},
						}}
					>
						<Link
							href={`/product/${product.slug.current}`}
							style={{
								textDecoration: "none",
								color: "inherit",
								flexGrow: 1,
								display: "block",
							}}
							tabIndex={-1}
						>
							{product.images?.[0] && (
								<CardMedia
									component="img"
									height="250"
									image={urlFor(product.images[0]).width(400).height(250).url()}
									alt={product.images[0].alt || product.name}
									sx={{ objectFit: "cover" }}
								/>
							)}
							<CardContent sx={{ flexGrow: 1 }}>
								<Box
									display="flex"
									justifyContent="space-between"
									alignItems="flex-start"
									mb={1}
								>
									<Typography
										gutterBottom
										variant="h6"
										component="h2"
										sx={{ fontWeight: 600 }}
									>
										{product.name}
									</Typography>
									{product.featured && (
										<Chip label="Featured" color="primary" size="small" />
									)}
								</Box>

								{product.description && (
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{
											mb: 2,
											overflow: "hidden",
											textOverflow: "ellipsis",
											display: "-webkit-box",
											WebkitLineClamp: 3,
											WebkitBoxOrient: "vertical",
										}}
									>
										{product.description}
									</Typography>
								)}

								<Typography
									variant="h6"
									color="primary"
									sx={{ fontWeight: 600 }}
								>
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
						</Link>

						<CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
							<AddToCart
								itemId={product._id}
								slug={product.slug.current}
							/>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}

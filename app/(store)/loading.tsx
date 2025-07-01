import {
	Container,
	Grid,
	Card,
	CardContent,
	CardActions,
	Box,
	Skeleton,
	Typography,
} from "@mui/material";

export default function Loading() {
	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			{/* Page Title */}
			<Typography variant="h3" component="h1" gutterBottom align="center">
				Our Products
			</Typography>

			{/* Page Subtitle */}
			<Typography
				variant="h6"
				color="text.secondary"
				align="center"
				sx={{ mb: 4 }}
			>
				Discover our amazing collection of products
			</Typography>

			{/* Products Grid Skeleton */}
			<Grid container spacing={3}>
				{[...Array(6)].map((_, index) => {
					const key = `skeleton-product-${index}`;
					return (
						<Grid size={{ xs: 12, sm: 6, md: 4 }} key={key}>
							<Card
								sx={{
									height: 370,
									display: "flex",
									flexDirection: "column",
								}}
							>
								{/* Product Image Skeleton */}
								<Skeleton variant="rectangular" width="100%" height={180} />

								<CardContent sx={{ flexGrow: 1 }}>
									{/* Product Name and Featured Chip Row */}
									<Box
										display="flex"
										justifyContent="space-between"
										alignItems="flex-start"
										mb={1}
									>
										<Skeleton variant="text" width="70%" height={28} />
										<Skeleton
											variant="rectangular"
											width={50}
											height={18}
											sx={{ borderRadius: 12 }}
										/>
									</Box>

									{/* Product Description Skeleton */}
									<Box sx={{ mb: 2 }}>
										<Skeleton variant="text" width="100%" height={16} />
										<Skeleton variant="text" width="85%" height={16} />
									</Box>

									{/* Product Price Skeleton */}
									<Skeleton
										variant="text"
										width={60}
										height={24}
										sx={{ mb: 1 }}
									/>

									{/* Category Chip Skeleton */}
									<Skeleton
										variant="rectangular"
										width={70}
										height={16}
										sx={{ borderRadius: 12 }}
									/>
								</CardContent>

								<CardActions sx={{ p: 2, pt: 0 }}>
									{/* View Details Button Skeleton */}
									<Skeleton
										variant="rectangular"
										width="100%"
										height={32}
										sx={{ borderRadius: 1 }}
									/>
								</CardActions>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
}

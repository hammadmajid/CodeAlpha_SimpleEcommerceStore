import { Box, Divider, Skeleton, Grid, Card, CardContent, CardMedia } from "@mui/material";

export default function CartLoading() {
  return (
	<main>
	  <Box sx={{ px: 4, py: 4, maxWidth: 768, mx: "auto" }}>
		{/* Title Skeleton */}
		<Skeleton variant="text" width={180} height={48} sx={{ mx: "auto", mb: 1 }} />
		{/* Subtitle Skeleton */}
		<Skeleton variant="text" width={320} height={32} sx={{ mx: "auto", mb: 4 }} />

		{/* Cart Items Skeleton */}
		<Grid container spacing={3}>
		  {[...Array(2)].map((_, idx) => (
			<Grid size={{ xs: 12 }} key={idx}>
			  <Card sx={{ display: "flex", alignItems: { xs: "flex-start", sm: "center" }, p: 2, flexDirection: { xs: "column", sm: "row" } }}>
				<CardMedia>
				  <Skeleton variant="rectangular" width={120} height={120} sx={{ borderRadius: 2, mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }} />
				</CardMedia>
				<CardContent sx={{ flex: 1, width: "100%" }}>
				  <Skeleton variant="text" width={160} height={32} sx={{ mb: 1 }} />
				  <Skeleton variant="rectangular" width={80} height={24} sx={{ mb: 1, borderRadius: 12 }} />
				  <Skeleton variant="text" width={220} height={20} sx={{ mb: 1 }} />
				  <Skeleton variant="text" width={60} height={28} />
				</CardContent>
				{/* Action Buttons Skeleton */}
				<Box display="flex" flexDirection={{ xs: "row", sm: "row" }} alignItems="center" justifyContent={{ xs: "space-between", sm: "flex-end" }} width={{ xs: "100%", sm: "auto" }} sx={{ mt: { xs: 2, sm: 0 }, gap: { xs: 2, sm: 0 } }}>
				  <Box display="flex" alignItems="center" gap={1}>
					<Skeleton variant="rectangular" width={32} height={32} />
					<Skeleton variant="text" width={24} height={28} />
					<Skeleton variant="rectangular" width={32} height={32} />
				  </Box>
				  <Box ml={{ xs: 0, sm: 2 }} mt={{ xs: 0, sm: 0 }}>
					<Skeleton variant="rectangular" width={32} height={32} />
				  </Box>
				</Box>
			  </Card>
			</Grid>
		  ))}
		</Grid>

		{/* Checkout Summary Skeleton */}
		<Box sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
		  <Divider sx={{ width: "100%", mb: 2 }} />
		  <Skeleton variant="text" width={120} height={32} sx={{ mb: 2 }} />
		  <Skeleton variant="rectangular" width={180} height={48} sx={{ borderRadius: 1 }} />
		</Box>
	  </Box>
	</main>
  );
}

import {
    Container,
    Grid,
    Card,
    CardContent,
    CardActions,
    Box,
    Skeleton
} from '@mui/material';

export default function Loading() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Page Title Skeleton */}
            <Box display="flex" justifyContent="center" mb={2}>
                <Skeleton variant="text" width={250} height={48} />
            </Box>

            {/* Page Subtitle Skeleton */}
            <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
                <Skeleton variant="text" width={400} height={32} />
            </Box>

            {/* Products Grid Skeleton */}
            <Grid container spacing={3}>
                {[...Array(6)].map((_, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {/* Product Image Skeleton */}
                            <Skeleton variant="rectangular" width="100%" height={250} />

                            <CardContent sx={{ flexGrow: 1 }}>
                                {/* Product Name and Featured Chip Row */}
                                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                                    <Skeleton variant="text" width="70%" height={32} />
                                    <Skeleton variant="rectangular" width={65} height={20} sx={{ borderRadius: 12 }} />
                                </Box>

                                {/* Product Description Skeleton */}
                                <Box sx={{ mb: 2 }}>
                                    <Skeleton variant="text" width="100%" height={20} />
                                    <Skeleton variant="text" width="85%" height={20} />
                                </Box>

                                {/* Product Price Skeleton */}
                                <Skeleton variant="text" width={80} height={32} sx={{ mb: 1 }} />

                                {/* Category Chip Skeleton */}
                                <Skeleton variant="rectangular" width={90} height={20} sx={{ borderRadius: 12 }} />
                            </CardContent>

                            <CardActions sx={{ p: 2, pt: 0 }}>
                                {/* View Details Button Skeleton */}
                                <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 1 }} />
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
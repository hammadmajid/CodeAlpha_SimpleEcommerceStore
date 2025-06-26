import {
    Container,
    Grid,
    Card,
    Box,
    Skeleton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material';

export default function Loading() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Back Button Skeleton */}
            <Box sx={{ mb: 3 }}>
                <Skeleton variant="rectangular" width={140} height={36} sx={{ borderRadius: 1 }} />
            </Box>

            <Grid container spacing={4}>
                {/* Product Images Skeleton */}
                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}>
                    <Box>
                        {/* Main Image Skeleton */}
                        <Card sx={{ mb: 2 }}>
                            <Skeleton variant="rectangular" width="100%" height={400} />
                        </Card>

                        {/* Thumbnail Images Skeleton */}
                        <Grid container spacing={1}>
                            {[...Array(3)].map((_, index) => (
                                <Grid size={{ xs: 4 }} key={index}>
                                    <Skeleton variant="rectangular" width="100%" height={100} sx={{ borderRadius: 1 }} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>

                {/* Product Details Skeleton */}
                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}>
                    <Box>
                        {/* Product Name and Category Skeleton */}
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <Skeleton variant="text" width={300} height={48} />
                            <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 12 }} />
                        </Box>

                        <Skeleton variant="rectangular" width={120} height={24} sx={{ mb: 2, borderRadius: 12 }} />

                        {/* Price Skeleton */}
                        <Skeleton variant="text" width={150} height={56} sx={{ mb: 3 }} />

                        {/* Description Skeleton */}
                        <Box sx={{ mb: 3 }}>
                            <Skeleton variant="text" width="100%" height={24} />
                            <Skeleton variant="text" width="90%" height={24} />
                            <Skeleton variant="text" width="95%" height={24} />
                        </Box>

                        {/* Add to Cart Button Skeleton */}
                        <Skeleton variant="rectangular" width={160} height={48} sx={{ mb: 4, borderRadius: 1 }} />

                        {/* Specifications Skeleton */}
                        <Box sx={{ mb: 3 }}>
                            <Skeleton variant="text" width={140} height={32} sx={{ mb: 2 }} />
                            <TableContainer component={Paper} variant="outlined">
                                <Table size="small">
                                    <TableBody>
                                        {[...Array(4)].map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Skeleton variant="text" width={100} height={20} />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton variant="text" width={150} height={20} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        {/* Physical Properties Skeleton */}
                        <Box sx={{ mb: 3 }}>
                            <Skeleton variant="text" width={180} height={32} sx={{ mb: 2 }} />
                            <TableContainer component={Paper} variant="outlined">
                                <Table size="small">
                                    <TableBody>
                                        {[...Array(3)].map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Skeleton variant="text" width={80} height={20} />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton variant="text" width={100} height={20} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Detailed Description Skeleton */}
            <Box sx={{ mt: 6 }}>
                <Skeleton variant="text" width={200} height={40} sx={{ mb: 3 }} />
                <Paper sx={{ p: 3 }}>
                    {[...Array(5)].map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="text"
                            width={index === 4 ? "60%" : "100%"}
                            height={24}
                            sx={{ mb: 1 }}
                        />
                    ))}
                </Paper>
            </Box>

            {/* Product Variants Skeleton */}
            <Box sx={{ mt: 6 }}>
                <Skeleton variant="text" width={180} height={40} sx={{ mb: 3 }} />
                <Grid container spacing={2}>
                    {[...Array(3)].map((_, index) => (
                        <Grid
                            key={index}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}>
                            <Card>
                                <Skeleton variant="rectangular" width="100%" height={200} />
                                <Box sx={{ p: 2 }}>
                                    <Skeleton variant="text" width="80%" height={28} />
                                    <Skeleton variant="text" width="60%" height={28} />
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
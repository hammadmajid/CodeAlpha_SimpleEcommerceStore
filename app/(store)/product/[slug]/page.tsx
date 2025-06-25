import {
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    Box,
    Chip,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    ImageList,
    ImageListItem
} from '@mui/material';
import { ArrowBack, ShoppingCart } from '@mui/icons-material';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PRODUCT_BY_SLUG_QUERY } from '@/lib/queries';
import { PortableText } from '@portabletext/react';
import type { Product } from '@/types/product';

async function getProduct(slug: string): Promise<Product | null> {
    return await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Back Button */}
            <Box sx={{ mb: 3 }}>
                <Link href="/" passHref>
                    <Button
                        startIcon={<ArrowBack />}
                        variant="outlined"
                        sx={{ textTransform: 'none' }}
                    >
                        Back to Home
                    </Button>
                </Link>
            </Box>
            <Grid container spacing={4}>
                {/* Product Images */}
                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}>
                    {product.images && product.images.length > 0 && (
                        <Box>
                            {/* Main Image */}
                            <Card sx={{ mb: 2 }}>
                                <CardMedia
                                    component="img"
                                    image={urlFor(product.images[0]).width(600).height(400).url()}
                                    alt={product.images[0].alt || product.name}
                                    sx={{ height: 400, objectFit: 'cover' }}
                                />
                            </Card>

                            {/* Thumbnail Images */}
                            {product.images.length > 1 && (
                                <ImageList cols={4} gap={8}>
                                    {product.images.slice(1).map((image, index) => (
                                        <ImageListItem key={index}>
                                            <img
                                                src={urlFor(image).width(150).height(150).url()}
                                                alt={image.alt || `${product.name} ${index + 2}`}
                                                style={{
                                                    width: '100%',
                                                    height: 100,
                                                    objectFit: 'cover',
                                                    borderRadius: 4,
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            )}
                        </Box>
                    )}
                </Grid>

                {/* Product Details */}
                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}>
                    <Box>
                        {/* Product Name and Category */}
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                                {product.name}
                            </Typography>
                            {product.featured && (
                                <Chip label="Featured" color="primary" />
                            )}
                        </Box>

                        {product.category && (
                            <Chip
                                label={product.category.name}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        )}

                        {/* Price */}
                        <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 3 }}>
                            ${product.price.toFixed(2)}
                        </Typography>

                        {/* Description */}
                        {product.description && (
                            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                                {product.description}
                            </Typography>
                        )}

                        {/* Add to Cart Button */}
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingCart />}
                            sx={{
                                mb: 4,
                                py: 1.5,
                                px: 4,
                                textTransform: 'none',
                                fontWeight: 600
                            }}
                        >
                            Add to Cart
                        </Button>

                        {/* Product Specifications */}
                        {product.specifications && product.specifications.length > 0 && (
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Specifications
                                </Typography>
                                <TableContainer component={Paper} variant="outlined">
                                    <Table size="small">
                                        <TableBody>
                                            {product.specifications.map((spec, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ fontWeight: 500 }}>{spec.name}</TableCell>
                                                    <TableCell>{spec.value}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        )}

                        {/* Product Dimensions and Weight */}
                        {(product.dimensions || product.weight) && (
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Physical Properties
                                </Typography>
                                <TableContainer component={Paper} variant="outlined">
                                    <Table size="small">
                                        <TableBody>
                                            {product.weight && (
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 500 }}>Weight</TableCell>
                                                    <TableCell>{product.weight}g</TableCell>
                                                </TableRow>
                                            )}
                                            {product.dimensions && (
                                                <>
                                                    {product.dimensions.length && (
                                                        <TableRow>
                                                            <TableCell sx={{ fontWeight: 500 }}>Length</TableCell>
                                                            <TableCell>{product.dimensions.length} cm</TableCell>
                                                        </TableRow>
                                                    )}
                                                    {product.dimensions.width && (
                                                        <TableRow>
                                                            <TableCell sx={{ fontWeight: 500 }}>Width</TableCell>
                                                            <TableCell>{product.dimensions.width} cm</TableCell>
                                                        </TableRow>
                                                    )}
                                                    {product.dimensions.height && (
                                                        <TableRow>
                                                            <TableCell sx={{ fontWeight: 500 }}>Height</TableCell>
                                                            <TableCell>{product.dimensions.height} cm</TableCell>
                                                        </TableRow>
                                                    )}
                                                </>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
            {/* Detailed Description */}
            {product.detailedDescription && (
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                        Detailed Description
                    </Typography>
                    <Paper sx={{ p: 3 }}>
                        <PortableText value={product.detailedDescription} />
                    </Paper>
                </Box>
            )}
            {/* Product Variants */}
            {product.variants && product.variants.length > 0 && (
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                        Available Variants
                    </Typography>
                    <Grid container spacing={2}>
                        {product.variants.map((variant, index) => (
                            <Grid
                                key={index}
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 4
                                }}>
                                <Card>
                                    {variant.image && (
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={urlFor(variant.image).width(300).height(200).url()}
                                            alt={variant.name}
                                        />
                                    )}
                                    <Box sx={{ p: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {variant.name}
                                        </Typography>
                                        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                                            ${variant.price.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Container>
    );
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: product.name,
        description: product.description || `${product.name} - Available for $${product.price}`,
    };
}
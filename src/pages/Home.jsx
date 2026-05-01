import { Box, Grid, Stack, Typography, CircularProgress, Alert, Chip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useThemeContext } from "../context/ThemeContext";
import ProductCard from "../components/products/ProductCard";
import { fetchProducts } from "../Api/productApi";
import { useState } from "react";


export default function HomePage() {
    const { state } = useThemeContext();

    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });
    const [selectedCategory, setSelectedCategory] = useState("all");
    const categories = ["all", ...new Set(products.map(p => p.category))];
    const filteredProducts =
        selectedCategory === "all" ? products
            : products.filter(p => p.category === selectedCategory);
    return (
        <Box sx={{ maxWidth: 1280, mx: "auto", px: 3, py: 4 }}>
            <Stack direction={"row"} spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
                {categories.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        clickable
                        color={selectedCategory === cat ? "primary" : "default"}
                        onClick={() => setSelectedCategory(cat)}
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: 600
                        }}
                    />
                ))}
            </Stack>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
                All Products
            </Typography>

            {/* Loading state */}
            {isLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                    <CircularProgress color="success" size={52} />
                </Box>
            )}

            {/* Error state */}
            {isError && (
                <Alert severity="error" sx={{ mt: 4 }}>
                    {error.message}
                </Alert>
            )}

            {products && state.view === "grid" && (
                <Grid container spacing={3}>
                    {filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <ProductCard product={product} view="grid" />
                        </Grid>
                    ))}
                </Grid>
            )}

            {products && state.view === "list" && (
                <Stack spacing={2}>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} view="list" />
                    ))}
                </Stack>
            )}

        </Box>
    );
}

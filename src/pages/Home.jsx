import { useMemo, useState } from "react";
import {
    Box,
    Grid,
    Stack,
    Typography,
    Chip,
    Drawer,
    Button,
    useMediaQuery,
} from "@mui/material";
import { FilterList, SearchOff } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { useThemeContext } from "../context/ThemeContext";
import ProductCard from "../components/products/ProductCard";
import ProductFilters, { getDefaultFilters } from "../components/products/ProductFilters";
import ProductSort, { sortProducts } from "../components/products/ProductSort";
import ProductPagination, { paginate, PAGE_SIZE } from "../components/products/ProductPagination";
import { fetchProducts } from "../Api/productApi";
import { LoadingState, ProductGridSkeleton } from "../components/common/LoadingState";
import { ErrorState } from "../components/common/ErrorState";
import { EmptyState } from "../components/common/EmptyState";
import { useSEO } from "../hooks/useSEO";

export default function HomePage() {
    const { state } = useThemeContext();
    const isMobile = useMediaQuery("(max-width:900px)");
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    const { data: products, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [page, setPage] = useState(1);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filters, setFilters] = useState(getDefaultFilters());

    useSEO({
        title: searchQuery ? `Search: ${searchQuery}` : "All Products",
        description:
            "Browse our full product catalog — filter by price, rating, brand, and availability, or search for exactly what you need.",
    });

    const categories = useMemo(
        () => ["all", ...new Set((products ?? []).map((p) => p.category))],
        [products]
    );

    const filteredProducts = useMemo(() => {
        let list = products ?? [];

        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            list = list.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.category?.toLowerCase().includes(q) ||
                    p.brand?.toLowerCase().includes(q) ||
                    p.description?.toLowerCase().includes(q)
            );
        }

        if (selectedCategory !== "all") {
            list = list.filter((p) => p.category === selectedCategory);
        }

        list = list.filter(
            (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );

        if (filters.minRating > 0) {
            list = list.filter((p) => (p.rating ?? 0) >= filters.minRating);
        }

        if (filters.brands.length > 0) {
            list = list.filter((p) => filters.brands.includes(p.brand));
        }

        if (filters.inStockOnly) {
            list = list.filter((p) => p.stock > 0);
        }

        return sortProducts(list, sortBy);
    }, [products, searchQuery, selectedCategory, filters, sortBy]);

    const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
    const pagedProducts = useMemo(
        () => paginate(filteredProducts, page, PAGE_SIZE),
        [filteredProducts, page]
    );

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setPage(1);
    };

    const handleFiltersChange = (next) => {
        setFilters(next);
        setPage(1);
    };

    const handleClearFilters = () => {
        setFilters(getDefaultFilters());
        setPage(1);
    };

    const handleClearSearch = () => {
        setSearchParams({});
        setPage(1);
    };

    const filtersContent = (
        <ProductFilters
            products={products ?? []}
            filters={filters}
            onChange={handleFiltersChange}
            onClear={handleClearFilters}
        />
    );

    return (
        <Box sx={{ maxWidth: 1280, mx: "auto", px: 3, py: 4 }}>
            {searchQuery ? (
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2, flexWrap: "wrap" }}>
                    <Typography variant="h4" fontWeight={700}>
                        Results for &ldquo;{searchQuery}&rdquo;
                    </Typography>
                    <Chip label={`${filteredProducts.length} found`} size="small" color="success" />
                    <Button size="small" onClick={handleClearSearch}>
                        Clear search
                    </Button>
                </Stack>
            ) : (
                <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
                    All Products
                </Typography>
            )}

            <Stack direction={"row"} spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
                {categories.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        clickable
                        color={selectedCategory === cat ? "primary" : "default"}
                        onClick={() => handleCategoryChange(cat)}
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: 600
                        }}
                    />
                ))}
            </Stack>

            {/* Loading state (first load) */}
            {isLoading && (
                <>
                    <LoadingState message="Loading products..." minHeight={120} />
                    <ProductGridSkeleton count={8} />
                </>
            )}

            {/* Error state */}
            {isError && (
                <ErrorState
                    title="Couldn't load products"
                    message={error?.message || "Something went wrong while fetching the catalog."}
                    onRetry={refetch}
                />
            )}

            {products && (
                <Grid container spacing={3}>
                    {!isMobile && (
                        <Grid item md={3}>
                            {filtersContent}
                        </Grid>
                    )}

                    <Grid item xs={12} md={9}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
                        >
                            {isMobile ? (
                                <Button
                                    startIcon={<FilterList />}
                                    variant="outlined"
                                    color="success"
                                    size="small"
                                    onClick={() => setFiltersOpen(true)}
                                >
                                    Filters
                                </Button>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    {filteredProducts.length} products
                                </Typography>
                            )}
                            <ProductSort value={sortBy} onChange={setSortBy} />
                        </Stack>

                        {filteredProducts.length === 0 ? (
                            <EmptyState
                                icon={SearchOff}
                                title={searchQuery ? "No results found" : "No products match your filters"}
                                message={
                                    searchQuery
                                        ? `We couldn't find anything for "${searchQuery}". Try a different keyword.`
                                        : "Try adjusting or clearing your filters to see more products."
                                }
                                actionLabel="Clear Filters"
                                onAction={handleClearFilters}
                            />
                        ) : state.view === "grid" ? (
                            <Grid container spacing={3}>
                                {pagedProducts.map((product) => (
                                    <Grid item xs={12} sm={6} lg={4} key={product.id}>
                                        <ProductCard product={product} view="grid" />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Stack spacing={2}>
                                {pagedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} view="list" />
                                ))}
                            </Stack>
                        )}

                        <ProductPagination page={page} count={pageCount} onChange={setPage} />
                    </Grid>
                </Grid>
            )}

            {/* Mobile filters drawer */}
            <Drawer anchor="right" open={filtersOpen} onClose={() => setFiltersOpen(false)}>
                <Box sx={{ width: 300, p: 3 }}>{filtersContent}</Box>
            </Drawer>
        </Box>
    );
}

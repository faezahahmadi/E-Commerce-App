import { useMemo } from "react";
import {
    Box,
    Typography,
    Slider,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Stack,
    Divider,
    Rating,
} from "@mui/material";

/**
 * ProductFilters
 * Sidebar/drawer content for advanced filtering: price range, rating,
 * brand, and availability. Purely controlled — all state lives in the
 * parent (Home page) so it stays in sync with sorting/pagination/search.
 */
export default function ProductFilters({ products, filters, onChange, onClear }) {
    const priceBounds = useMemo(() => {
        if (!products?.length) return [0, 1000];
        const prices = products.map((p) => p.price);
        return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
    }, [products]);

    const brands = useMemo(() => {
        const set = new Set(
            (products ?? []).map((p) => p.brand).filter(Boolean)
        );
        return [...set].sort();
    }, [products]);

    const handlePriceChange = (_, newValue) => {
        onChange({ ...filters, priceRange: newValue });
    };

    const handleRatingChange = (rating) => {
        onChange({ ...filters, minRating: filters.minRating === rating ? 0 : rating });
    };

    const handleBrandToggle = (brand) => {
        const next = filters.brands.includes(brand)
            ? filters.brands.filter((b) => b !== brand)
            : [...filters.brands, brand];
        onChange({ ...filters, brands: next });
    };

    const handleAvailabilityToggle = () => {
        onChange({ ...filters, inStockOnly: !filters.inStockOnly });
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                    Filters
                </Typography>
                <Button size="small" onClick={onClear}>
                    Clear All
                </Button>
            </Stack>

            {/* Price Range */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                    Price Range
                </Typography>
                <Slider
                    value={filters.priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(v) => `$${v}`}
                    min={priceBounds[0]}
                    max={priceBounds[1]}
                    color="success"
                    size="small"
                />
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                        ${filters.priceRange[0]}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        ${filters.priceRange[1]}
                    </Typography>
                </Stack>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Rating */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                    Minimum Rating
                </Typography>
                <Stack spacing={0.5}>
                    {[4, 3, 2, 1].map((r) => (
                        <Stack
                            key={r}
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            onClick={() => handleRatingChange(r)}
                            sx={{
                                cursor: "pointer",
                                p: 0.5,
                                borderRadius: 1,
                                backgroundColor: filters.minRating === r ? "action.selected" : "transparent",
                                "&:hover": { backgroundColor: "action.hover" },
                            }}
                        >
                            <Rating value={r} readOnly size="small" />
                            <Typography variant="body2" color="text.secondary">
                                & up
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Brand */}
            {brands.length > 0 && (
                <>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                            Brand
                        </Typography>
                        <FormGroup sx={{ maxHeight: 220, overflowY: "auto" }}>
                            {brands.map((brand) => (
                                <FormControlLabel
                                    key={brand}
                                    control={
                                        <Checkbox
                                            size="small"
                                            color="success"
                                            checked={filters.brands.includes(brand)}
                                            onChange={() => handleBrandToggle(brand)}
                                        />
                                    }
                                    label={<Typography variant="body2">{brand}</Typography>}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                </>
            )}

            {/* Availability */}
            <Box>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                    Availability
                </Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            size="small"
                            color="success"
                            checked={filters.inStockOnly}
                            onChange={handleAvailabilityToggle}
                        />
                    }
                    label={<Typography variant="body2">In Stock Only</Typography>}
                />
            </Box>
        </Box>
    );
}

export function getDefaultFilters(priceBounds = [0, 1000]) {
    return {
        priceRange: priceBounds,
        minRating: 0,
        brands: [],
        inStockOnly: false,
    };
}

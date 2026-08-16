import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const SORT_OPTIONS = [
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: Low → High" },
    { value: "price-desc", label: "Price: High → Low" },
    { value: "rating", label: "Rating" },
];

export default function ProductSort({ value, onChange }) {
    return (
        <FormControl size="small" sx={{ minWidth: 190 }}>
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select
                labelId="sort-label"
                label="Sort by"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {SORT_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export function sortProducts(products, sortBy) {
    const list = [...products];
    switch (sortBy) {
        case "price-asc":
            return list.sort((a, b) => a.price - b.price);
        case "price-desc":
            return list.sort((a, b) => b.price - a.price);
        case "rating":
            return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        case "newest":
        default:
            // dummyjson has no creation date, so id desc is used as a "newest" proxy
            return list.sort((a, b) => b.id - a.id);
    }
}

import { Box, Pagination } from "@mui/material";

export const PAGE_SIZE = 12;

export function paginate(items, page, pageSize = PAGE_SIZE) {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
}

export default function ProductPagination({ page, count, onChange }) {
    if (count <= 1) return null;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 2 }}>
            <Pagination
                page={page}
                count={count}
                color="success"
                shape="rounded"
                onChange={(_, value) => {
                    onChange(value);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
            />
        </Box>
    );
}

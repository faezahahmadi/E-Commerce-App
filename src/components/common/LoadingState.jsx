import { Box, CircularProgress, Typography, Skeleton, Grid } from "@mui/material";

/**
 * Full-area spinner, used for page/section-level loading.
 */
export function LoadingState({ message = "Loading...", minHeight = 320 }) {
    return (
        <Box
            role="status"
            aria-live="polite"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                minHeight,
                width: "100%",
            }}
        >
            <CircularProgress color="success" size={48} />
            {message && (
                <Typography variant="body2" color="text.secondary">
                    {message}
                </Typography>
            )}
        </Box>
    );
}

/**
 * Skeleton grid that mimics the product card layout, used while the
 * product catalog is first loading so the page doesn't jump/flash.
 */
export function ProductGridSkeleton({ count = 8 }) {
    return (
        <Grid container spacing={3}>
            {Array.from({ length: count }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <Box sx={{ borderRadius: 3, overflow: "hidden" }}>
                        <Skeleton variant="rectangular" height={180} />
                        <Box sx={{ pt: 1 }}>
                            <Skeleton variant="text" width="40%" height={24} />
                            <Skeleton variant="text" width="90%" />
                            <Skeleton variant="text" width="60%" />
                            <Skeleton variant="rectangular" height={36} sx={{ mt: 1, borderRadius: 1 }} />
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

export default LoadingState;

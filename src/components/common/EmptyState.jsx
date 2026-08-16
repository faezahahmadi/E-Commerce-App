import { Box, Typography, Button } from "@mui/material";
import { Inbox } from "@mui/icons-material";

/**
 * Generic empty state for lists with nothing to show
 * (empty cart, empty wishlist, no search results, no filter matches, etc).
 */
export function EmptyState({
    icon: Icon = Inbox,
    title = "Nothing here yet",
    message,
    actionLabel,
    onAction,
    minHeight = 320,
}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 1.5,
                minHeight,
                width: "100%",
                px: 2,
            }}
        >
            <Icon sx={{ fontSize: 64, color: "text.disabled" }} />
            <Typography variant="h6" fontWeight={700} color="text.secondary">
                {title}
            </Typography>
            {message && (
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
                    {message}
                </Typography>
            )}
            {actionLabel && onAction && (
                <Button variant="contained" color="success" onClick={onAction} sx={{ mt: 1 }}>
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
}

export default EmptyState;

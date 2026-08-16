import { Box, Typography, Button, Alert, AlertTitle } from "@mui/material";
import { ErrorOutline, Refresh } from "@mui/icons-material";

/**
 * Full-area error state with an optional retry action.
 * Falls back to a friendly generic message if none is provided.
 */
export function ErrorState({
    title = "Something went wrong",
    message = "We couldn't load this content. Please check your connection and try again.",
    onRetry,
    minHeight = 320,
    variant = "block", // "block" | "inline"
}) {
    if (variant === "inline") {
        return (
            <Alert
                severity="error"
                action={
                    onRetry ? (
                        <Button color="inherit" size="small" onClick={onRetry} startIcon={<Refresh />}>
                            Retry
                        </Button>
                    ) : undefined
                }
                sx={{ mt: 2 }}
            >
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        );
    }

    return (
        <Box
            role="alert"
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
            <ErrorOutline sx={{ fontSize: 56, color: "error.main" }} />
            <Typography variant="h6" fontWeight={700}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
                {message}
            </Typography>
            {onRetry && (
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<Refresh />}
                    onClick={onRetry}
                    sx={{ mt: 1 }}
                >
                    Try Again
                </Button>
            )}
        </Box>
    );
}

export default ErrorState;

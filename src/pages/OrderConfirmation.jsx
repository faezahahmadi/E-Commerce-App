import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Paper,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    Step,
    Stepper,
    StepLabel,
    DialogActions,
} from "@mui/material";
import { CheckCircle, LocalShipping } from "@mui/icons-material";
import { formatCurrency } from "../utils/format";
import { useSEO } from "../hooks/useSEO";

export default function OrderConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const [trackingOpen, setTrackingOpen] = useState(false);

    useSEO({ title: "Order Confirmed", description: "Your order has been placed successfully." });

    const order = location.state;

    // If someone lands here directly (e.g. page refresh with no state),
    // show a graceful fallback instead of a broken/blank page.
    if (!order) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "60vh",
                    gap: 2,
                    textAlign: "center",
                    px: 3,
                }}
            >
                <Typography variant="h5" fontWeight={700}>
                    No recent order found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
                    We couldn't find details for a recent order. If you just completed checkout,
                    this can happen after a page refresh.
                </Typography>
                <Button variant="contained" color="success" onClick={() => navigate("/")}>
                    Continue Shopping
                </Button>
            </Box>
        );
    }

    const { orderId, estimatedDelivery, total, itemCount } = order;

    return (
        <Box
            sx={{
                maxWidth: 560,
                mx: "auto",
                px: 3,
                py: 6,
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    width: 96,
                    height: 96,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    background: "linear-gradient(135deg, #00ff62 0%, #3ad55c 100%)",
                }}
            >
                <CheckCircle sx={{ fontSize: 56, color: "#052110" }} />
            </Box>

            <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
                Order Confirmed!
            </Typography>
            <Typography variant="h6" color="success.main" fontWeight={700} sx={{ mb: 2 }}>
                #{orderId}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Your order has been successfully placed.
            </Typography>

            <Paper variant="outlined" sx={{ p: 3, mb: 4, textAlign: "left" }}>
                <Stack spacing={1.5}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography color="text.secondary">Items</Typography>
                        <Typography fontWeight={600}>{itemCount}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography color="text.secondary">Total Paid</Typography>
                        <Typography fontWeight={700} color="success.main">
                            {formatCurrency(total)}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography color="text.secondary">Estimated delivery</Typography>
                        <Typography fontWeight={600}>{estimatedDelivery}</Typography>
                    </Stack>
                </Stack>
            </Paper>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                <Button
                    variant="outlined"
                    color="success"
                    size="large"
                    startIcon={<LocalShipping />}
                    onClick={() => setTrackingOpen(true)}
                >
                    Track Order
                </Button>
                <Button variant="contained" color="success" size="large" onClick={() => navigate("/")}>
                    Continue Shopping
                </Button>
            </Stack>

            <Dialog open={trackingOpen} onClose={() => setTrackingOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Tracking Order #{orderId}</DialogTitle>
                <DialogContent>
                    <Stepper activeStep={0} orientation="vertical">
                        <Step>
                            <StepLabel>Order placed</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Processing</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Shipped</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Out for delivery</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Delivered — est. {estimatedDelivery}</StepLabel>
                        </Step>
                    </Stepper>
                    <Typography variant="caption" color="text.disabled" sx={{ mt: 2, display: "block" }}>
                        This is a demo — live tracking isn't available in this app.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTrackingOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

import {
    Box,
    Typography,
    Paper,
    Stack,
    Divider,
    Avatar,
    Grid,
    Chip,
} from "@mui/material";
import { getDeliveryOptions, maskCardNumber, formatCurrency } from "../../utils/format";

export default function StepReview({ contact, shipping, delivery, payment, cartItems, subtotal }) {
    const deliveryOption = getDeliveryOptions()[delivery.method];
    const shippingCost = deliveryOption?.price ?? 0;
    const total = subtotal + shippingCost;

    return (
        <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                Review Your Order
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Double check everything before placing your order.
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                    <Paper variant="outlined" sx={{ p: 2.5, mb: 2 }}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
                            Order Summary ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
                        </Typography>
                        <Stack spacing={1.5} divider={<Divider />}>
                            {cartItems.map((item) => (
                                <Stack key={item.id} direction="row" spacing={1.5} alignItems="center">
                                    <Avatar variant="rounded" src={item.image} alt={item.title} />
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography variant="body2" fontWeight={600} noWrap>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Qty {item.quantity} × ${item.price}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" fontWeight={700}>
                                        {formatCurrency(item.price * item.quantity)}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Paper>

                    <Paper variant="outlined" sx={{ p: 2.5, mb: 2 }}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                            Shipping Address
                        </Typography>
                        <Typography variant="body2">
                            {shipping.firstName} {shipping.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {shipping.address}, {shipping.city}, {shipping.province} {shipping.postalCode}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {shipping.country}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {contact.email} · {contact.phone}
                        </Typography>
                    </Paper>

                    <Paper variant="outlined" sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                            <Typography variant="subtitle2" fontWeight={700}>
                                Delivery Method
                            </Typography>
                            <Chip
                                size="small"
                                color="success"
                                label={shippingCost === 0 ? "Free" : `$${shippingCost}`}
                            />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                            {deliveryOption?.label}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Paper variant="outlined" sx={{ p: 2.5, position: { md: "sticky" }, top: { md: 90 } }}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
                            Payment Method
                        </Typography>
                        <Typography variant="body2" fontFamily="monospace">
                            {maskCardNumber(payment.cardNumber)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {payment.nameOnCard}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Stack spacing={1}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography color="text.secondary">Subtotal</Typography>
                                <Typography>{formatCurrency(subtotal)}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography color="text.secondary">Shipping</Typography>
                                <Typography>{shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}</Typography>
                            </Stack>
                            <Divider />
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="h6">Total</Typography>
                                <Typography variant="h6" color="success.main" fontWeight={700}>
                                    {formatCurrency(total)}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

import {
    Box,
    Typography,
    Card,
    CardMedia,
    IconButton,
    Button,
    Divider,
    Stack,
    Paper,
    Tooltip,
} from "@mui/material";
import { Add, Remove, DeleteOutline, ShoppingCart } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import {
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
} from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    if (items.length === 0) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "60vh",
                    gap: 2,
                }}
            >
                <ShoppingCart sx={{ fontSize: 80, color: "text.disabled" }} />
                <Typography variant="h5" color="text.secondary">
                    Your cart is empty
                </Typography>
                <Button variant="contained" color="success" onClick={() => navigate("/")}>
                    Browse Products
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1000, mx: "auto", px: 3, py: 4 }}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
                Your Cart
            </Typography>

            <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>

                <Stack spacing={2} sx={{ flex: 1 }}>
                    {items.map((item) => (
                        <Card
                            key={item.id}
                            sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}
                        >
                            <CardMedia
                                component="img"
                                image={item.image}
                                alt={item.title}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    objectFit: "contain",
                                    borderRadius: 2,
                                    flexShrink: 0,
                                }}
                            />

                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="body1" fontWeight={600} noWrap>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ${item.price} each
                                </Typography>
                                <Typography variant="body2" color="success.main" fontWeight={600}>
                                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <Tooltip title="Decrease">
                                    <IconButton
                                        size="small"
                                        color="success"
                                        onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
                                    >
                                        <Remove fontSize="small" />
                                    </IconButton>
                                </Tooltip>

                                <Typography
                                    variant="body1"
                                    fontWeight={700}
                                    sx={{ minWidth: 28, textAlign: "center" }}
                                >
                                    {item.quantity}
                                </Typography>

                                <Tooltip title="Increase">
                                    <IconButton
                                        size="small"
                                        color="success"
                                        onClick={() => dispatch(increaseQuantity({ id: item.id }))}
                                    >
                                        <Add fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>

                            <Tooltip title="Remove item">
                                <IconButton
                                    color="error"
                                    onClick={() => dispatch(removeItem({ id: item.id }))}
                                >
                                    <DeleteOutline />
                                </IconButton>
                            </Tooltip>
                        </Card>
                    ))}

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => dispatch(clearCart())}
                        sx={{ alignSelf: "flex-start" }}
                    >
                        Clear Cart
                    </Button>
                </Stack>

                {/* Order Summary */}
                <Paper
                    sx={{
                        p: 3,
                        width: { xs: "100%", md: 280 },
                        height: "fit-content",
                        position: { md: "sticky" },
                        top: { md: 80 },
                    }}
                >
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                        Order Summary
                    </Typography>

                    <Stack spacing={1.5}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography color="text.secondary">Total Items</Typography>
                            <Typography fontWeight={600}>{totalQuantity}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="h6" color="success.main" fontWeight={700}>
                                ${totalPrice}
                            </Typography>
                        </Box>
                    </Stack>

                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        size="large"
                        sx={{ mt: 3 }}
                        onClick={() => navigate("/checkout")}
                    >
                        Checkout
                    </Button>

                    <Button
                        variant="text"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => navigate("/")}
                    >
                        Continue Shopping
                    </Button>
                </Paper>
            </Box>
        </Box>
    );
}

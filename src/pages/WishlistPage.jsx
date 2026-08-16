import {
    Box,
    Typography,
    Card,
    CardMedia,
    IconButton,
    Button,
    Stack,
    Tooltip,
    Chip,
} from "@mui/material";
import { DeleteOutline, ShoppingCartOutlined, FavoriteBorder } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItem, clearWishlist } from "../features/wishlistSlice";
import { addItem as addToCart } from "../features/cartSlice";
import EmptyState from "../components/common/EmptyState";
import { useSEO } from "../hooks/useSEO";

export default function WishlistPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((state) => state.wishlist.items);

    useSEO({
        title: `Wishlist${items.length ? ` (${items.length})` : ""}`,
        description: "View and manage the products you've saved to your wishlist.",
    });

    const handleMoveToCart = (item) => {
        dispatch(addToCart({ ...item, image: item.image }));
        dispatch(removeItem({ id: item.id }));
    };

    if (items.length === 0) {
        return (
            <EmptyState
                icon={FavoriteBorder}
                title="Your wishlist is empty"
                message="Save products you love by tapping the heart icon on any item."
                actionLabel="Browse Products"
                onAction={() => navigate("/")}
                minHeight="60vh"
            />
        );
    }

    return (
        <Box sx={{ maxWidth: 1000, mx: "auto", px: 3, py: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight={700}>
                    Wishlist <Chip label={items.length} size="small" color="success" sx={{ ml: 1 }} />
                </Typography>
                <Button variant="outlined" color="error" onClick={() => dispatch(clearWishlist())}>
                    Clear Wishlist
                </Button>
            </Stack>

            <Stack spacing={2}>
                {items.map((item) => (
                    <Card
                        key={item.id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 2,
                            cursor: "pointer",
                        }}
                        onClick={() => navigate(`/product/${item.id}`)}
                    >
                        <CardMedia
                            component="img"
                            image={item.image}
                            alt={item.title}
                            loading="lazy"
                            sx={{ width: 80, height: 80, objectFit: "contain", borderRadius: 2, flexShrink: 0 }}
                        />

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="body1" fontWeight={600} noWrap>
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {item.category}
                            </Typography>
                            <Typography variant="body1" color="success.main" fontWeight={700}>
                                ${item.price}
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} onClick={(e) => e.stopPropagation()}>
                            <Tooltip title="Move to cart">
                                <IconButton
                                    color="success"
                                    onClick={() => handleMoveToCart(item)}
                                    disabled={item.stock === 0}
                                >
                                    <ShoppingCartOutlined />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Remove">
                                <IconButton color="error" onClick={() => dispatch(removeItem({ id: item.id }))}>
                                    <DeleteOutline />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}

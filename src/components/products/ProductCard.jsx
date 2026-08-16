import { memo } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    Chip,
    Rating,
} from "@mui/material";
import { ShoppingCart, AddShoppingCart } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import WishlistButton from "../wishlist/WishlistButton";

function ProductCard({ product, view }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inCart = useSelector((state) =>
        state.cart.items.find((item) => item.id === product.id)
    );

    const outOfStock = product.stock === 0;

    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch(
            addItem({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.thumbnail || product.images?.[0] || product.image,
                category: product.category,
            })
        );
    };

    //  LIST VIEW 
    if (view === "list") {
        return (
            <Card
                onClick={() => navigate(`/product/${product.id}`)}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1.5,
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateX(4px)" },
                }}
            >
                <CardMedia
                    component="img"
                    image={product.thumbnail || product.image}
                    alt={product.title}
                    loading="lazy"
                    decoding="async"
                    sx={{
                        width: 90,
                        height: 90,
                        objectFit: "contain",
                        borderRadius: 2,
                        flexShrink: 0,
                    }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body1" fontWeight={600} noWrap>
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {product.category}
                    </Typography>
                    {product.rating != null && (
                        <Rating
                            value={product.rating?.rate ?? product.rating}
                            readOnly
                            size="small"
                            precision={0.5}
                        />
                    )}
                    {outOfStock && (
                        <Chip label="Out of Stock" size="small" color="error" sx={{ mt: 0.5 }} />
                    )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
                    <Typography variant="h6" color="primary" fontWeight={700}>
                        ${product.price}
                    </Typography>
                    <WishlistButton
                        product={product}
                        size="small"
                        sx={{ backgroundColor: "transparent", "&:hover": { backgroundColor: "action.hover" } }}
                    />
                    <Button
                        variant={inCart ? "outlined" : "contained"}
                        color="success"
                        size="small"
                        disabled={outOfStock}
                        startIcon={<ShoppingCart />}
                        onClick={handleAddToCart}
                    >
                        {outOfStock ? "Sold Out" : inCart ? `In Cart (${inCart.quantity})` : "Add"}
                    </Button>
                </Box>
            </Card>
        );
    }

    // GRID VIEW (default)
    return (
        <Card
            onClick={() => navigate(`/product/${product.id}`)}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (theme) =>
                        theme.palette.mode === "dark"
                            ? "0 8px 30px rgba(76,175,80,0.2)"
                            : "0 8px 24px rgba(0,0,0,0.12)",
                },
            }}
        >
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    image={product.thumbnail || product.image}
                    alt={product.title}
                    loading="lazy"
                    decoding="async"
                    sx={{ height: 180, objectFit: "contain", p: 2 }}
                />
                <WishlistButton
                    product={product}
                    size="small"
                    sx={{ position: "absolute", top: 8, right: 8 }}
                />
                {outOfStock && (
                    <Chip
                        label="Out of Stock"
                        size="small"
                        color="error"
                        sx={{ position: "absolute", top: 8, left: 8 }}
                    />
                )}
            </Box>
            <CardContent sx={{ flex: 1 }}>
                <Chip
                    label={product.category}
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ mb: 1, fontSize: "0.7rem" }}
                />
                <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5 }}>
                    {product.title.length > 50 ? product.title.slice(0, 50) + "…" : product.title}
                </Typography>
                {product.rating != null && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Rating
                            value={product.rating?.rate ?? product.rating}
                            readOnly
                            size="small"
                            precision={0.5}
                        />
                        <Typography variant="caption" color="text.secondary">
                            ({product.rating?.count ?? ""})
                        </Typography>
                    </Box>
                )}
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2, justifyContent: "space-between" }}>
                <Typography variant="h6" color="primary" fontWeight={700}>
                    ${product.price}
                </Typography>
                <Button
                    variant={inCart ? "outlined" : "contained"}
                    color="success"
                    size="small"
                    disabled={outOfStock}
                    startIcon={<AddShoppingCart />}
                    onClick={handleAddToCart}
                >
                    {outOfStock ? "Sold Out" : inCart ? `In Cart (${inCart.quantity})` : "Add to Cart"}
                </Button>
            </CardActions>
        </Card>
    );
}

export default memo(ProductCard);

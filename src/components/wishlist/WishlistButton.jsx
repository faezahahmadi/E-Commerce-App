import { IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleItem } from "../../features/wishlistSlice";

export default function WishlistButton({ product, size = "medium", sx = {} }) {
    const dispatch = useDispatch();
    const isWishlisted = useSelector((state) =>
        state.wishlist.items.some((item) => item.id === product.id)
    );

    const handleToggle = (e) => {
        e.stopPropagation();
        dispatch(
            toggleItem({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.thumbnail || product.images?.[0] || product.image,
                category: product.category,
                rating: product.rating,
                stock: product.stock,
            })
        );
    };

    return (
        <Tooltip title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"} arrow>
            <IconButton
                onClick={handleToggle}
                size={size}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                sx={{
                    backgroundColor: "rgba(0,0,0,0.35)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
                    ...sx,
                }}
            >
                {isWishlisted ? (
                    <Favorite fontSize={size} sx={{ color: "#ff4d6d" }} />
                ) : (
                    <FavoriteBorder fontSize={size} sx={{ color: "#fff" }} />
                )}
            </IconButton>
        </Tooltip>
    );
}

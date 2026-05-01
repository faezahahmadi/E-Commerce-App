import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../Api/productApi";
import { addItem } from "../features/cartSlice";

import {
    Container,
    Box,
    Typography,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { items: cartItems } = useSelector((state) => state.cart);
    const isInCart = cartItems.some((item) => item.id === parseInt(id));

    const { data: product, isLoading, error } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProductById(id),
    });
    console.log("url id", id)
    console.log("product", product)

    const handleAddToCart = () => {
        dispatch(addItem(product));
    };

    // Loading
    if (isLoading) {
        return (
            <Container sx={{ textAlign: "center", mt: 10 }}>
                <CircularProgress />
            </Container>
        );
    }

    // Error
    if (error || !product) {
        return (
            <Container sx={{ mt: 10 }}>
                <Alert severity="error">Product not found</Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 5 }}>
            <Button onClick={() => navigate(-1)}>← Back</Button>

            <Box
                sx={{
                    display: "flex",
                    gap: 5,
                    mt: 3,
                    flexDirection: { xs: "column", md: "row" },
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <img
                        src={product?.thumbnail || product?.images?.[0]}
                        alt={product.title}
                        style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }}
                    />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight="bold">
                        {product.title}
                    </Typography>

                    <Typography variant="h6" color="gray" sx={{ mt: 1 }}>
                        {product.category}
                    </Typography>

                    <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
                        ${product.price}
                    </Typography>

                    <Typography sx={{ mt: 3 }}>
                        {product.description}
                    </Typography>

                    <Box sx={{ mt: 4 }}>
                        {isInCart ? (
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/cart")}
                            >
                                Go to Cart
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default ProductDetails;

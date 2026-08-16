import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Badge,
    Tooltip,
    ButtonGroup,
    Button,
    useMediaQuery,
} from "@mui/material";
import {
    ShoppingCart,
    DarkMode,
    LightMode,
    GridView,
    ViewList,
    Search as SearchIcon,
    FavoriteBorder,
} from "@mui/icons-material";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import SearchBar from "./search/SearchBar";

const Navbar = () => {
    const { state, dispatch } = useThemeContext();
    const { totalQuantity } = useSelector((state) => state.cart);
    const wishlistCount = useSelector((state) => state.wishlist.items.length);
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:640px)");
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor:
                    state.mode === "dark"
                        ? "rgb(8, 24, 10)"
                        : "rgba(214, 245, 158, 0.75)",

                borderBottom: `1px solid ${state.mode === "dark"
                    ? "rgba(0, 255, 42, 0.2)"
                    : "rgba(0, 0, 0, 0.08)"
                    }`,
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 }, gap: 2 }}>
                {isMobile && mobileSearchOpen ? (
                    <SearchBar autoFocus fullWidth onClose={() => setMobileSearchOpen(false)} />
                ) : (
                    <>
                        <Box
                            onClick={() => navigate("/")}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                cursor: "pointer",
                                flexShrink: 0,
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight={700}
                                color={state.mode === "dark"
                                    ? "rgb(255, 255, 255)"
                                    : "rgba(8, 24, 10, 0.75)"}
                                sx={{ cursor: "pointer", letterSpacing: 1, whiteSpace: "nowrap" }}
                                onClick={() => navigate("/")}
                            >
                                Rosa Online Shop
                            </Typography>
                        </Box>

                        {!isMobile && (
                            <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                                <SearchBar />
                            </Box>
                        )}

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
                            {isMobile && (
                                <Tooltip title="Search" arrow>
                                    <IconButton onClick={() => setMobileSearchOpen(true)} sx={{ color: "inherit" }}>
                                        <SearchIcon />
                                    </IconButton>
                                </Tooltip>
                            )}

                            {!isMobile && (
                                <ButtonGroup
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        mr: 1,
                                        "& .MuiButton-root": {
                                            borderColor: "rgba(43, 255, 0, 0.3)",
                                            color: state.mode === "dark" ? "#e6f1ff" : "#050a18",
                                            "&:hover": {
                                                borderColor: "#00d2ff",
                                                backgroundColor: "rgba(0, 210, 255, 0.1)",
                                            },
                                        },
                                    }}
                                >
                                    <Tooltip title="Grid View" arrow>
                                        <Button
                                            variant={state.view === "grid" ? "contained" : "outlined"}
                                            onClick={() => dispatch({ type: "ToggleView" })}
                                            sx={{
                                                backgroundColor: state.view === "grid" ? "#15330c !important" : "transparent",
                                                color: state.view === "grid" ? "#0b1805 !important" : "inherit",
                                            }}
                                        >
                                            <GridView fontSize="small" />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="List View" arrow>
                                        <Button
                                            variant={state.view === "list" ? "contained" : "outlined"}
                                            onClick={() => dispatch({ type: "ToggleView" })}
                                            sx={{
                                                backgroundColor: state.view === "list" ? "#00ff55 !important" : "transparent",
                                                color: state.view === "list" ? "#050a18 !important" : "inherit",
                                            }}
                                        >
                                            <ViewList fontSize="small" />
                                        </Button>
                                    </Tooltip>
                                </ButtonGroup>
                            )}

                            <Tooltip title={state.mode === "dark" ? "Light Mode" : "Dark Mode"} arrow>
                                <IconButton
                                    onClick={() => dispatch({ type: "ToggleMode" })}
                                    sx={{
                                        color: "#00ff73",
                                        border: "1px solid rgba(0, 255, 34, 0.25)",
                                        borderRadius: "12px",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            backgroundColor: "rgba(21, 255, 0, 0.1)",
                                            transform: "rotate(15deg) scale(1.1)",
                                        },
                                    }}
                                >
                                    {state.mode === "dark" ? <LightMode /> : <DarkMode />}
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Wishlist" arrow>
                                <IconButton
                                    onClick={() => navigate("/wishlist")}
                                    sx={{
                                        p: 1.5,
                                        borderRadius: "14px",
                                        color: state.mode === "dark" ? "#e6f1ff" : "#051809",
                                    }}
                                >
                                    <Badge
                                        badgeContent={wishlistCount}
                                        sx={{
                                            "& .MuiBadge-badge": {
                                                background: "#ff4d6d",
                                                color: "#fff",
                                                fontWeight: 900,
                                                fontSize: "0.7rem",
                                            },
                                        }}
                                    >
                                        <FavoriteBorder sx={{ fontSize: 24 }} />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Shopping Cart" arrow>
                                <IconButton
                                    onClick={() => navigate("/cart")}
                                    sx={{
                                        p: 1.5,
                                        borderRadius: "14px",
                                        background: totalQuantity > 0
                                            ? "linear-gradient(135deg, #00ff62 0%, #3ad55c 100%)"
                                            : "rgba(51, 255, 0, 0.1)",
                                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                        "&:hover": {
                                            transform: "translateY(-3px)",
                                            boxShadow: "0 10px 20px -5px rgba(30, 255, 0, 0.4)",
                                        },
                                    }}>
                                    <Badge
                                        badgeContent={totalQuantity}
                                        sx={{
                                            "& .MuiBadge-badge": {
                                                background: state.mode === "dark" ? "#050a18" : "#fff",
                                                color: state.mode === "dark" ? "#51ff00" : "#091805",
                                                fontWeight: 900,
                                                fontSize: "0.7rem",
                                                border: "2px solid #00ff55",
                                            },
                                        }}
                                    >
                                        <ShoppingCart
                                            sx={{
                                                fontSize: 24,
                                                color: totalQuantity > 0
                                                    ? state.mode === "dark" ? "#05180b" : "#fff"
                                                    : state.mode === "dark" ? "#e6f1ff" : "#051809",
                                            }} />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

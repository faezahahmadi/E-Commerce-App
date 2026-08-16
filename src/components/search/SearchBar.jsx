import { useMemo, useRef, useState } from "react";
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Paper,
    List,
    ListItemButton,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Button,
    ClickAwayListener,
    Divider,
} from "@mui/material";
import { Search, Close, History, TrendingUp } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../Api/productApi";
import { useSearchHistory } from "../../hooks/useSearchHistory";
import { useDebounce } from "../../hooks/useDebounce";

export default function SearchBar({ onClose, autoFocus, fullWidth }) {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { history, addSearch, clearHistory } = useSearchHistory();

    // Reuses the same react-query cache key as the Home page, so this
    // never triggers a duplicate network request once products are cached.
    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5,
    });

    const debouncedQuery = useDebounce(query, 150);

    const suggestions = useMemo(() => {
        const q = debouncedQuery.trim().toLowerCase();
        if (!q || !products) return [];
        return products
            .filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.category?.toLowerCase().includes(q) ||
                    p.brand?.toLowerCase().includes(q)
            )
            .slice(0, 6);
    }, [debouncedQuery, products]);

    const runSearch = (term) => {
        const clean = term.trim();
        if (!clean) return;
        addSearch(clean);
        setOpen(false);
        setQuery("");
        onClose?.();
        navigate(`/?q=${encodeURIComponent(clean)}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") runSearch(query);
        if (e.key === "Escape") {
            setOpen(false);
            inputRef.current?.blur();
        }
    };

    const showDropdown = open;
    const trimmedQuery = query.trim();

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Box sx={{ position: "relative", width: fullWidth ? "100%" : { xs: "100%", sm: 320, md: 380 } }}>
                <TextField
                    inputRef={inputRef}
                    autoFocus={autoFocus}
                    fullWidth
                    size="small"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setOpen(true)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search fontSize="small" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {query ? (
                                    <IconButton size="small" onClick={() => setQuery("")}>
                                        <Close fontSize="small" />
                                    </IconButton>
                                ) : onClose ? (
                                    <IconButton size="small" onClick={onClose}>
                                        <Close fontSize="small" />
                                    </IconButton>
                                ) : null}
                            </InputAdornment>
                        ),
                        sx: { backgroundColor: "background.paper", borderRadius: 2 },
                    }}
                />

                {showDropdown && (
                    <Paper
                        elevation={6}
                        sx={{
                            position: "absolute",
                            top: "calc(100% + 6px)",
                            left: 0,
                            right: 0,
                            zIndex: 1400,
                            maxHeight: 420,
                            overflowY: "auto",
                            borderRadius: 2,
                        }}
                    >
                        {/* Empty query: show recent search history */}
                        {!trimmedQuery && (
                            <Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        px: 2,
                                        pt: 1.5,
                                    }}
                                >
                                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                                        RECENT SEARCHES
                                    </Typography>
                                    {history.length > 0 && (
                                        <Button size="small" onClick={clearHistory} sx={{ minWidth: "auto" }}>
                                            Clear history
                                        </Button>
                                    )}
                                </Box>
                                {history.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 2 }}>
                                        No recent searches yet.
                                    </Typography>
                                ) : (
                                    <List dense>
                                        {history.map((term) => (
                                            <ListItemButton key={term} onClick={() => runSearch(term)}>
                                                <History fontSize="small" sx={{ mr: 1.5, color: "text.disabled" }} />
                                                <ListItemText primary={term} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                )}
                            </Box>
                        )}

                        {/* Non-empty query: show live suggestions */}
                        {trimmedQuery && (
                            <Box>
                                <ListItemButton onClick={() => runSearch(trimmedQuery)}>
                                    <TrendingUp fontSize="small" sx={{ mr: 1.5, color: "success.main" }} />
                                    <ListItemText
                                        primary={
                                            <Typography variant="body2">
                                                Search for <strong>&ldquo;{trimmedQuery}&rdquo;</strong>
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>

                                {suggestions.length > 0 && <Divider />}

                                {suggestions.length > 0 ? (
                                    <List dense>
                                        {suggestions.map((product) => (
                                            <ListItemButton
                                                key={product.id}
                                                onClick={() => {
                                                    addSearch(product.title);
                                                    setOpen(false);
                                                    setQuery("");
                                                    onClose?.();
                                                    navigate(`/product/${product.id}`);
                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        variant="rounded"
                                                        src={product.thumbnail}
                                                        alt={product.title}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={product.title}
                                                    secondary={`$${product.price} · ${product.category}`}
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                ) : (
                                    // No-results state
                                    <Box sx={{ px: 2, py: 3, textAlign: "center" }}>
                                        <Typography variant="body2" color="text.secondary">
                                            No products found for &ldquo;{trimmedQuery}&rdquo;
                                        </Typography>
                                        <Typography variant="caption" color="text.disabled">
                                            Try a different keyword or browse all products.
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Paper>
                )}
            </Box>
        </ClickAwayListener>
    );
}

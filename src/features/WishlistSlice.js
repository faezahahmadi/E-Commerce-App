import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "rosa_wishlist";

function loadWishlist() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

const initialState = {
    items: loadWishlist(),
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addItem(state, action) {
            const exists = state.items.some((item) => item.id === action.payload.id);
            if (!exists) {
                state.items.push(action.payload);
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload.id);
        },
        toggleItem(state, action) {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.push(action.payload);
            }
        },
        clearWishlist(state) {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, toggleItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

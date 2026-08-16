import { useState, useEffect } from "react";

/**
 * useDebounce
 * Returns a debounced copy of `value` that only updates after `delay` ms
 * of inactivity. Used to avoid re-filtering/re-rendering on every keystroke.
 */
export function useDebounce(value, delay = 300) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debounced;
}

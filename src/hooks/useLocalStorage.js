import { useState, useEffect, useCallback } from "react";

/**
 * useLocalStorage
 * A useState-like hook that persists its value to localStorage.
 */
export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = window.localStorage.getItem(key);
            return stored !== null ? JSON.parse(stored) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Storage full or unavailable — fail silently, app still works in-memory.
        }
    }, [key, value]);

    const remove = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
        } catch {
            // ignore
        }
        setValue(initialValue);
    }, [key, initialValue]);

    return [value, setValue, remove];
}

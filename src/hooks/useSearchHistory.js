import { useCallback, useState } from "react";

const STORAGE_KEY = "rosa_search_history";
const MAX_ITEMS = 8;

function readHistory() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHistory(history) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // ignore quota / privacy-mode errors
  }
}

/**
 * useSearchHistory
 * Tracks the user's recent search terms in localStorage (most recent first,
 * de-duplicated, capped at MAX_ITEMS).
 */
export function useSearchHistory() {
  const [history, setHistory] = useState(readHistory);

  const addSearch = useCallback((term) => {
    const clean = term.trim();
    if (!clean) return;
    setHistory((prev) => {
      const deduped = prev.filter(
        (t) => t.toLowerCase() !== clean.toLowerCase(),
      );
      const next = [clean, ...deduped].slice(0, MAX_ITEMS);
      writeHistory(next);
      return next;
    });
  }, []);

  const removeSearch = useCallback((term) => {
    setHistory((prev) => {
      const next = prev.filter((t) => t !== term);
      writeHistory(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    writeHistory([]);
    setHistory([]);
  }, []);

  return { history, addSearch, removeSearch, clearHistory };
}

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  ReactNode,
  useCallback,
} from "react";
import { useLocalStorageStore } from "@/store/LocalStorageStore";

/* ================= types ================= */

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  currentTheme: number;
  toggleTheme: () => void;
  nextTheme: () => void;
  prevTheme: () => void;
  setThemeIndex: (index: number) => void;
};

/* ================= theme data ================= */

export const darkTheme = [
  { backgroundColor: "#1f1f1fff", color: "#EEEEFE", borderColor: "#000274ff", extraColor: "#d7f5edff" },
  { backgroundColor: "#003c11ff", color: "#e8ffe1ff", borderColor: "#260048ff", extraColor: "#cccfffff" },
  { backgroundColor: "#540000ff", color: "#dffff5ff", borderColor: "#002139ff", extraColor: "#fff5ccff" },
];

export const lightTheme = [
  { backgroundColor: "#EEEEEE", color: "#000000", borderColor: "#b68989ff", extraColor: "#863030ff" },
  { backgroundColor: "#e6ff80ff", color: "#260048ff", borderColor: "#61b879ff", extraColor: "#292993ff" },
  { backgroundColor: "#c5ffd5ff", color: "#2d0028ff", borderColor: "#d0d063ff", extraColor: "#184b88ff" },
];

/* ================= context ================= */

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};

/* ================= provider ================= */

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  /** ⚠️ 初始值不要读 localStorage */
  const [theme, setTheme] = useState<Theme>("light");
  const [currentTheme, setCurrentTheme] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  /* ===== 首次 hydration：统一初始化 ===== */
  useEffect(() => {
    const store = useLocalStorageStore.getState();

    const storedTheme = store.getThemeCookie();
    const resolvedTheme: Theme =
      storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light";

    const storedIndex = parseInt(store.getThemeIndexCookie() ?? "0", 10);
    const themeArray = resolvedTheme === "dark" ? darkTheme : lightTheme;

    setTheme(resolvedTheme);
    setCurrentTheme(
      Number.isNaN(storedIndex)
        ? 0
        : Math.min(Math.max(0, storedIndex), themeArray.length - 1)
    );

    setHydrated(true);
  }, []);

  /* ===== DOM 同步（避免闪屏） ===== */
  useLayoutEffect(() => {
    if (!hydrated) return;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, hydrated]);

  /* ================= actions ================= */

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      useLocalStorageStore.getState().setThemeCookie(next);
      return next;
    });
    setCurrentTheme(0);
  }, []);

  const nextTheme = useCallback(() => {
    setCurrentTheme((prev) => {
      const arr = theme === "dark" ? darkTheme : lightTheme;
      const next = (prev + 1) % arr.length;
      useLocalStorageStore.getState().setThemeIndexCookie(String(next));
      return next;
    });
  }, [theme]);

  const prevTheme = useCallback(() => {
    setCurrentTheme((prev) => {
      const arr = theme === "dark" ? darkTheme : lightTheme;
      const next = (prev - 1 + arr.length) % arr.length;
      useLocalStorageStore.getState().setThemeIndexCookie(String(next));
      return next;
    });
  }, [theme]);

  const setThemeIndex = useCallback(
    (index: number) => {
      const arr = theme === "dark" ? darkTheme : lightTheme;
      const safe = Math.min(Math.max(0, index), arr.length - 1);
      setCurrentTheme(safe);
      useLocalStorageStore.getState().setThemeIndexCookie(String(safe));
    },
    [theme]
  );

  /* ================= render ================= */

  if (!hydrated) {
    return null; // 或 Skeleton，彻底避免不一致
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        currentTheme,
        toggleTheme,
        nextTheme,
        prevTheme,
        setThemeIndex,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/*
  封装的ThemeContext组件，提供主题，实现主题切换功能
  2025-04-07
  by MasaoMinn
*/
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

// 类型定义
type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Context 定义
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 自定义 Hook 确保使用安全
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const darkTheme = {
  backgroundColor: '#1C1C1C',
  color: '#EEEEFE',
  borderColor: '#0000FF',
};

export const lightTheme = {
  backgroundColor: '#EEEEEE',
  color: '#000000',
  borderColor: '#FF0000',
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // 获取初始主题（优先 localStorage > 系统主题 > 默认 light）
  const getInitialTheme = useCallback((): Theme => {
    try {
      // 优先从 localStorage 获取
      const storedTheme = localStorage.getItem("theme") as Theme | null;
      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      }
      // 检测系统主题
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return systemDark ? "dark" : "light";
    } catch (e) {
      // 回退
      console.log(e);
      return "light";
    }
  }, []);

  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  // 不再从 cookie 同步 theme

  // 切换主题方法
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("theme", newTheme);
      } catch (e) {
        console.warn(e);
      }
      return newTheme;
    });
  }, []);

  // 监听系统主题变化（仅在未手动设置时响应）
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      try {
        // 如果 localStorage 中不存在手动设置的主题，则跟随系统
        if (!localStorage.getItem("theme")) {
          setTheme(e.matches ? "dark" : "light");
        }
      } catch (e) {
        console.log(e);
        // 忽略 localStorage 错误
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  });

  // 同步主题到 DOM（可结合 CSS 自定义属性使用）
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
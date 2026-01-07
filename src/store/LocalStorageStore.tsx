import { create } from "zustand";

// LocalStorage/SessionStorage存储项的有效期接口
interface StorageItem {
  value: string;
  expiry?: number; // 过期时间戳（毫秒）
}

// LocalStorageStore接口
export interface LocalStorageState {
  // 基本localStorage操作方法
  setItem: (name: string, value: string, expiryMs?: number) => void;
  getItem: (name: string) => string | null;
  removeItem: (name: string) => void;
  clear: () => void;

  // SessionStorage操作方法
  setSessionItem: (name: string, value: string, expiryMs?: number) => void;
  getSessionItem: (name: string) => string | null;
  removeSessionItem: (name: string) => void;
  clearSession: () => void;

  // Cookie权限相关（保留接口以兼容现有代码）
  cookiePermission: boolean;
  acceptCookies: () => void;
  declineCookies: () => void;

  // Cookie查询状态（是否已显示过）
  cookieQueryShown: boolean;
  setCookieQueryShown: () => void;

  // 主题相关方法
  getThemeCookie: () => string | null;
  setThemeCookie: (theme: string) => void;
  getThemeIndexCookie: () => string | null;
  setThemeIndexCookie: (index: string) => void;

  // 语言相关方法
  getLanguageCookie: () => string | null;
  setLanguageCookie: (language: string) => void;
}

// 初始化时从localStorage读取cookie_permission设置
const getInitialCookiePermission = (): boolean => {
  try {
    // 仅在浏览器环境中访问localStorage
    if (typeof window !== 'undefined') {
      const itemStr = localStorage.getItem("cookie_permission");
      if (!itemStr) {
        return false;
      }
      const item: StorageItem = JSON.parse(itemStr);
      return item.value === "true";
    }
    return false;
  } catch (error) {
    console.error("Error getting initial cookie permission:", error);
    return false;
  }
};

// 初始化时从sessionStorage读取cookie_query_shown设置
const getInitialCookieQueryShown = (): boolean => {
  try {
    // 仅在浏览器环境中访问sessionStorage
    if (typeof window !== 'undefined') {
      const itemStr = sessionStorage.getItem("cookie_query_shown");
      if (!itemStr) {
        return false;
      }
      const item: StorageItem = JSON.parse(itemStr);
      return item.value === "true";
    }
    return false;
  } catch (error) {
    console.error("Error getting initial cookie query shown:", error);
    return false;
  }
};

// 创建LocalStorageStore
export const useLocalStorageStore = create<LocalStorageState>()(
  (set, get) => ({
    // Cookie权限初始值（从localStorage读取）
    cookiePermission: getInitialCookiePermission(),

    // Cookie查询状态初始值（从sessionStorage读取）
    cookieQueryShown: getInitialCookieQueryShown(),

    // 基本localStorage操作方法
    setItem: (name: string, value: string, expiryMs?: number) => {
      try {
        const item: StorageItem = { value };

        // 如果设置了过期时间，则添加到item中
        if (expiryMs) {
          item.expiry = Date.now() + expiryMs;
        }

        localStorage.setItem(name, JSON.stringify(item));
      } catch (error) {
        console.error(`Error setting localStorage item ${name}:`, error);
      }
    },

    getItem: (name: string) => {
      try {
        const itemStr = localStorage.getItem(name);

        if (!itemStr) {
          return null;
        }

        const item: StorageItem = JSON.parse(itemStr);

        // 检查是否过期
        if (item.expiry && Date.now() > item.expiry) {
          localStorage.removeItem(name);
          return null;
        }

        return item.value;
      } catch (error) {
        console.error(`Error getting localStorage item ${name}:`, error);
        return null;
      }
    },

    removeItem: (name: string) => {
      try {
        localStorage.removeItem(name);
      } catch (error) {
        console.error(`Error removing localStorage item ${name}:`, error);
      }
    },

    clear: () => {
      try {
        localStorage.clear();
      } catch (error) {
        console.error("Error clearing localStorage:", error);
      }
    },

    // SessionStorage操作方法
    setSessionItem: (name: string, value: string, expiryMs?: number) => {
      try {
        const item: StorageItem = { value };

        // 如果设置了过期时间，则添加到item中
        if (expiryMs) {
          item.expiry = Date.now() + expiryMs;
        }

        sessionStorage.setItem(name, JSON.stringify(item));
      } catch (error) {
        console.error(`Error setting sessionStorage item ${name}:`, error);
      }
    },

    getSessionItem: (name: string) => {
      try {
        const itemStr = sessionStorage.getItem(name);

        if (!itemStr) {
          return null;
        }

        const item: StorageItem = JSON.parse(itemStr);

        // 检查是否过期
        if (item.expiry && Date.now() > item.expiry) {
          sessionStorage.removeItem(name);
          return null;
        }

        return item.value;
      } catch (error) {
        console.error(`Error getting sessionStorage item ${name}:`, error);
        return null;
      }
    },

    removeSessionItem: (name: string) => {
      try {
        sessionStorage.removeItem(name);
      } catch (error) {
        console.error(`Error removing sessionStorage item ${name}:`, error);
      }
    },

    clearSession: () => {
      try {
        sessionStorage.clear();
      } catch (error) {
        console.error("Error clearing sessionStorage:", error);
      }
    },

    // Cookie权限相关方法（模拟实现，实际使用localStorage）
    acceptCookies: () => {
      set({ cookiePermission: true });
      get().setItem("cookie_permission", "true");
      // 接受后标记为已显示
      set({ cookieQueryShown: true });
      get().setSessionItem("cookie_query_shown", "true");
    },

    declineCookies: () => {
      set({ cookiePermission: false });
      get().setItem("cookie_permission", "false");
      // 拒绝后标记为已显示
      set({ cookieQueryShown: true });
      get().setSessionItem("cookie_query_shown", "true");
    },

    // Cookie查询状态管理
    setCookieQueryShown: () => {
      set({ cookieQueryShown: true });
      get().setSessionItem("cookie_query_shown", "true");
    },

    // 主题相关方法
    getThemeCookie: () => {
      return get().getItem("theme");
    },

    setThemeCookie: (theme: string) => {
      get().setItem("theme", theme);
    },

    getThemeIndexCookie: () => {
      return get().getItem("themeIndex");
    },

    setThemeIndexCookie: (index: string) => {
      get().setItem("themeIndex", index);
    },

    // 语言相关方法
    getLanguageCookie: () => {
      return get().getItem("language");
    },

    setLanguageCookie: (language: string) => {
      get().setItem("language", language);
    },
  })
);
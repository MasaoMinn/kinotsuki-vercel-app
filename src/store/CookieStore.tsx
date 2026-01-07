import { create } from 'zustand';

// 辅助函数：解析cookie
export const getCookie = (name: string): string | null => {
  try {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// 辅助函数：设置cookie
export const setCookie = (name: string, value: string, days: number = 365) => {
  try {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch (e) {
    console.warn(e);
  }
};

// 辅助函数：删除cookie
export const deleteCookie = (name: string) => {
  try {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  } catch (e) {
    console.warn(e);
  }
};

// CookieStore接口定义
interface CookieStore {
  // Cookie权限管理
  cookiePermission: string | null;
  hasCookiePermission: () => boolean;
  acceptCookies: () => void;
  declineCookies: () => void;
  // 主题相关的Cookie操作
  getThemeCookie: () => string | null;
  setThemeCookie: (theme: string) => void;
  getThemeIndexCookie: () => string | null;
  setThemeIndexCookie: (index: string) => void;
}

// 创建CookieStore
export const useCookieStore = create<CookieStore>((set, get) => ({
  // Cookie权限管理
  cookiePermission: getCookie('cookie_permission'),
  hasCookiePermission: () => getCookie('cookie_permission') === 'true',
  acceptCookies: () => {
    setCookie('cookie_permission', 'true');
    set({ cookiePermission: 'true' });
  },
  declineCookies: () => {
    set({ cookiePermission: 'false' });
  },
  // 主题相关的Cookie操作
  getThemeCookie: () => getCookie('theme'),
  setThemeCookie: (theme: string) => {
    if (get().hasCookiePermission()) {
      setCookie('theme', theme);
    }
  },
  getThemeIndexCookie: () => getCookie('themeIndex'),
  setThemeIndexCookie: (index: string) => {
    if (get().hasCookiePermission()) {
      setCookie('themeIndex', index);
    }
  },
}));
import { create } from 'zustand'

export type ToastType = 'like' | 'dislike' | 'error' | null;
export type ToastPayload = {
  id?: string;
  type: ToastType;
  title?: string | null;
  message?: string | null;
};

type ToastStore = {
  toasts: ToastPayload[];
  showToast: (payload: Omit<ToastPayload, 'id'>) => void;
  hideToast: (id?: string) => void;
}

// Keep at most 3 toasts visible at once. Newest toasts are appended; oldest are removed when over limit.
export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  showToast: (payload) => set(state => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);
    const next = [...state.toasts, { id, ...payload }];
    if (next.length > 3) next.shift(); // remove oldest
    return { ...state, toasts: next };
  }),
  hideToast: (id?: string) => set(state => ({
    ...state,
    toasts: id ? state.toasts.filter(t => t.id !== id) : []
  })),
}))

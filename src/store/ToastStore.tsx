import { create } from 'zustand'

export type ToastType = 'like' | 'dislike' | 'error' | null;
export type ToastPayload = {
  type: ToastType;
  title?: string | null;
  message?: string | null;
};

type ToastStore = {
  toast: ToastPayload;
  showToast: (payload: ToastPayload) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toast: { type: null, title: null, message: null },
  showToast: (payload) => set(state => ({ ...state, toast: payload })),
  hideToast: () => set(state => ({
    ...state, toast: { type: null, title: null, message: null }
  })),
}))
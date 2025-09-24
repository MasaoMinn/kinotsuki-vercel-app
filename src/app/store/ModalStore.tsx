import { create } from 'zustand'

export type ToastType = 'like' | 'dislike' | 'error' | null;
export type ToastPayload = {
  type: ToastType;
  title?: string | null;
  message?: string | null;
};

type ModalStore = {
  toast: ToastPayload;
  showModal: (payload: ToastPayload) => void;
  hideModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  toast: { type: null, title: null, message: null },
  showModal: (payload) => set(state => ({ ...state, toast: payload })),
  hideModal: () => set(state => ({
    ...state, toast: { type: null, title: null, message: null }
  })),
}))

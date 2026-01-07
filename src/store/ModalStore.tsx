import { create } from 'zustand'

export type ModalType = 'cookie' | null;
export type ModalPayload = {
  type: ModalType;
  title?: string | null;
  message?: string | null;
};

type ModalStore = {
  modal: ModalPayload;
  showModal: (payload: ModalPayload) => void;
  hideModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: { type: null, title: null, message: null },
  showModal: (payload) => set(state => ({ ...state, modal: payload })),
  hideModal: () => set(state => ({
    ...state, modal: { type: null, title: null, message: null }
  })),
}))
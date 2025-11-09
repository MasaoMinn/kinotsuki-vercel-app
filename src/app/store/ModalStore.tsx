import { create } from 'zustand'

export type ModalType = 'cookie';
export type ModalPayload = {
  id: string;
  type: ModalType;
  title: string;
  firstMessage: string;
  secondMessage?: string;
  pictureURL?: string;
};

type ModalStore = {
  modal: ModalPayload[];
  showModal: (payload: Omit<ModalPayload, 'id'>) => void;
  hideModal: (id?: string) => void;
}

// Keep at most 3 toasts visible at once. Newest toasts are appended; oldest are removed when over limit.
export const useModalStore = create<ModalStore>((set) => ({
  modal: [],
  showModal: (payload) => set(state => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);
    const next = [...state.modal, { id, ...payload }];
    if (next.length > 3) next.shift(); // remove oldest
    return { ...state, modal: next };
  }),
  hideModal: (id?: string) => set(state => ({
    ...state,
    modal: id ? state.modal.filter(t => t.id !== id) : []
  })),
}))
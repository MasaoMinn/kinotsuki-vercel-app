import { create } from 'zustand'

type ModalType = 'alert' | null

type ModalStore = {
  openModal: ModalType
  showModal: (type: ModalType) => void
  hideModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  openModal: null,
  showModal: (type) => set({ openModal: type }),
  hideModal: () => set({ openModal: null }),
}))

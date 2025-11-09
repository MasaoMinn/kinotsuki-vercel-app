import { create } from 'zustand'

type FingerprintStore = {
  fingerprint?: string | null;
  setFingerprint: (id: string | null) => void;
  clearFingerprint: () => void;
}

export const useFingerprintStore = create<FingerprintStore>((set) => ({
  fingerprint: null,
  setFingerprint: (id) => set({ fingerprint: id }),
  clearFingerprint: () => set({ fingerprint: null }),
}));

export default useFingerprintStore;

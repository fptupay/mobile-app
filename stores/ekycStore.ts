import { create } from 'zustand'

interface EkycProps {
  ekycId: string
  setEkycId: (ekycId: string) => void
}

export const useEkycStore = create<EkycProps>((set) => ({
  ekycId: '',
  setEkycId: (ekycId) => set({ ekycId })
}))

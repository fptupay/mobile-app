import { create } from 'zustand'

interface ModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
export const useModalStore = create<ModalProps>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen: isOpen })
}))

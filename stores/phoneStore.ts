import { create } from 'zustand'

interface PhoneProps {
  phone: string
  setPhone: (phone: string) => void
}

export const usePhoneStore = create<PhoneProps>((set) => ({
  phone: '',
  setPhone: (phone: string) => set({ phone: phone })
}))

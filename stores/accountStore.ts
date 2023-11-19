import { create } from 'zustand'

interface AccountProps {
  balance: string
  setBalance: (balance: string) => void
  details: any
  setDetails: (details: any) => void
  avatar: string
  setAvatar: (avatar: string) => void
}

export const useAccountStore = create<AccountProps>((set) => ({
  balance: '0',
  setBalance: (balance) => set({ balance }),
  details: {},
  setDetails: (details) => set({ details }),
  avatar: '',
  setAvatar: (avatar) => set({ avatar })
}))

import { create } from 'zustand'

interface AccountProps {
  balance: string
  setBalance: (balance: string) => void
}

export const useAccountStore = create<AccountProps>((set) => ({
  balance: '0',
  setBalance: (balance) => set({ balance })
}))

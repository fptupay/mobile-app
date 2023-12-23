import { create } from 'zustand'

interface BankProps {
  selectedBank: string
  cardForm: any
  accountForm: any
  setSelectedBank: (selectedBank: string) => void
  setCardForm: (cardForm: any) => void
  setAccountForm: (accountForm: any) => void
}

export const useBankStore = create<BankProps>((set) => ({
  selectedBank: '',
  cardForm: {},
  accountForm: {},
  setSelectedBank: (selectedBank: string) =>
    set({ selectedBank: selectedBank }),
  setCardForm: (cardForm: any) => set({ cardForm: cardForm }),
  setAccountForm: (accountForm: any) => set({ accountForm: accountForm })
}))

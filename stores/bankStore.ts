import { create } from 'zustand'

interface BankProps {
  selectedBank: string
  setSelectedBank: (selectedBank: string) => void
}

interface TransactionProps {
  transactionId: string
  setTransactionId: (transactionId: string) => void
}

export const useBankStore = create<BankProps>((set) => ({
  selectedBank: '',
  setSelectedBank: (selectedBank: string) => set({ selectedBank: selectedBank })
}))

export const useTransactionStore = create<TransactionProps>((set) => ({
  transactionId: '',
  setTransactionId: (transactionId: string) =>
    set({ transactionId: transactionId })
}))

import { create } from 'zustand'

interface BankProps {
  selectedBank: string
  setSelectedBank: (selectedBank: string) => void
}

interface TransactionProps {
  fundTransferId: string
  transactionDetails: any
  setFundTransferId: (fundTransferId: string) => void
  setTransactionDetails: (transactionDetails: any) => void
}

export const useBankStore = create<BankProps>((set) => ({
  selectedBank: '',
  setSelectedBank: (selectedBank: string) => set({ selectedBank: selectedBank })
}))

export const useTransactionStore = create<TransactionProps>((set) => ({
  fundTransferId: '',
  transactionDetails: {},
  setFundTransferId: (fundTransferId: string) =>
    set({ fundTransferId: fundTransferId }),
  setTransactionDetails: (transactionDetails: any) =>
    set({ transactionDetails: transactionDetails })
}))

import { create } from 'zustand'

interface TransactionProps {
  fundTransferId: string
  transactionDetails: any
  setFundTransferId: (fundTransferId: string) => void
  setTransactionDetails: (transactionDetails: any) => void
}

export const useTransactionStore = create<TransactionProps>((set) => ({
  fundTransferId: '',
  transactionDetails: {},
  setFundTransferId: (fundTransferId: string) =>
    set({ fundTransferId: fundTransferId }),
  setTransactionDetails: (transactionDetails: any) =>
    set({ transactionDetails: transactionDetails })
}))

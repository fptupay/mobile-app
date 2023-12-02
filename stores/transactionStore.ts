import { create } from 'zustand'

interface TransactionProps {
  fundTransferId: string
  transactionDetails: any
  accountNumber: string
  setFundTransferId: (fundTransferId: string) => void
  setTransactionDetails: (transactionDetails: any) => void
  setAccountNumber: (accountNumber: string) => void
}

export const useTransactionStore = create<TransactionProps>((set) => ({
  fundTransferId: '',
  transactionDetails: {},
  accountNumber: '',
  setFundTransferId: (fundTransferId: string) =>
    set({ fundTransferId: fundTransferId }),
  setTransactionDetails: (transactionDetails: any) =>
    set({ transactionDetails: transactionDetails }),
  setAccountNumber: (accountNumber: string) =>
    set({ accountNumber: accountNumber })
}))

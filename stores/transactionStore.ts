import { create } from 'zustand'


interface TransactionProps {
  fundTransferId: string
  transactionDetails: any
  accountNumber: string
  transactionReport: any
  listTransaction: any
  setFundTransferId: (fundTransferId: string) => void
  setTransactionDetails: (transactionDetails: any) => void
  setAccountNumber: (accountNumber: string) => void
  setTransactionReport: (transactionReport: any) => void
  setListTransaction: (listTransaction: any) => void
}

export const useTransactionStore = create<TransactionProps>((set) => ({
  fundTransferId: '',
  transactionDetails: {},
  accountNumber: '',
  transactionReport: {},
  listTransaction: {},
  setFundTransferId: (fundTransferId: string) =>
    set({ fundTransferId: fundTransferId }),
  setTransactionDetails: (transactionDetails: any) =>
    set({ transactionDetails: transactionDetails }),
  setAccountNumber: (accountNumber: string) =>
    set({ accountNumber: accountNumber }),
  setTransactionReport: (transactionReport: any) =>
    set({ transactionReport: transactionReport }),
  setListTransaction: (listTransaction: any) =>
    set({ listTransaction: listTransaction })
}))


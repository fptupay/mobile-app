import { create } from 'zustand'

interface BankProps {
  selectedBank: string
  setSelectedBank: (selectedBank: string) => void
}

interface TransactionProps {
  transactionId: string
  smartOTPTransactionId: string
  transactionDetails: any
  setTransactionId: (transactionId: string) => void
  setSmartOTPTransactionId: (smartOTPTransactionId: string) => void
  setTransactionDetails: (transactionDetails: any) => void
}

export const useBankStore = create<BankProps>((set) => ({
  selectedBank: '',
  setSelectedBank: (selectedBank: string) => set({ selectedBank: selectedBank })
}))

export const useTransactionStore = create<TransactionProps>((set) => ({
  transactionId: '',
  smartOTPTransactionId: '',
  transactionDetails: {},
  setTransactionId: (transactionId: string) =>
    set({ transactionId: transactionId }),
  setSmartOTPTransactionId: (smartOTPTransactionId: string) =>
    set({ smartOTPTransactionId: smartOTPTransactionId }),
  setTransactionDetails: (transactionDetails: any) =>
    set({ transactionDetails: transactionDetails })
}))

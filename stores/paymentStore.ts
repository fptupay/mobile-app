import { create } from 'zustand'

interface PaymentProps {
  transactionType: string
  setTransactionType: (transactionType: string) => void
  pendingBill: any
  setPendingBill: (pendingBill: any) => void
  clearPendingBill: () => void
}

export const usePaymentStore = create<PaymentProps>((set) => ({
  transactionType: '',
  setTransactionType: (transactionType: string) => set({ transactionType }),
  pendingBill: null,
  setPendingBill: (pendingBill: any) => set({ pendingBill }),
  clearPendingBill: () => set({ pendingBill: null })
}))

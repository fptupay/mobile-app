import { create } from 'zustand'

interface PaymentProps {
  pendingBill: any
  setPendingBill: (pendingBill: any) => void
  clearPendingBill: () => void
}

export const usePaymentStore = create<PaymentProps>((set) => ({
  pendingBill: null,
  setPendingBill: (pendingBill: any) => set({ pendingBill }),
  clearPendingBill: () => set({ pendingBill: null })
}))

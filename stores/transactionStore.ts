import { create } from 'zustand'

interface TransactionStatisticStore {
  revenues: number[]
  expenses: number[]
  setRevenue: (revenue: any) => void
  setExpense: (expense: any) => void
}

export const useTransactionStatisticStore = create<TransactionStatisticStore>(
  (set) => ({
    revenues: [],
    expenses: [],
    setRevenue: (revenue: any) => set({ revenues: [...revenue] }),
    setExpense: (expense: any) => set({ expenses: [...expense] })
  })
)

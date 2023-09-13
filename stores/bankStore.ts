import { create } from 'zustand'

interface BankProps {
    selectedBank: string;
    setSelectedBank: (selectedBank: string) => void;
}
export const useBankStore = create<BankProps>((set) => ({
    selectedBank: '',
    setSelectedBank: (selectedBank: string) => set({ selectedBank: selectedBank })
}))
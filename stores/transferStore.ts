import { create } from 'zustand'

interface TransferProps {
  studentCode: string
  setStudentCode: (studentCode: string) => void
}

export const useTransferStore = create<TransferProps>((set) => ({
  studentCode: '',
  setStudentCode: (studentCode: string) => set({ studentCode })
}))

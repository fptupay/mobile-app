import { create } from 'zustand'

interface TransferProps {
  studentCode: string
  setStudentCode: (studentCode: string) => void
  transactionId: string
  setTransactionId: (transactionId: string) => void
  savedStudentCodes: string[]
  setSavedStudentCodes: (savedStudentCodes: string[]) => void
  receiverAvatar: string
  setReceiverAvatar: (receiverAvatar: string) => void
}

export const useTransferStore = create<TransferProps>((set) => ({
  studentCode: '',
  setStudentCode: (studentCode: string) => set({ studentCode }),
  transactionId: '',
  setTransactionId: (transactionId: string) => set({ transactionId }),
  savedStudentCodes: [],
  setSavedStudentCodes: (savedStudentCodes: string[]) =>
    set({ savedStudentCodes }),
  receiverAvatar: '',
  setReceiverAvatar: (receiverAvatar: string) => set({ receiverAvatar })
}))

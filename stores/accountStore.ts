import { create } from 'zustand'

interface AccountProps {
  balance: string
  setBalance: (balance: string) => void
  details: any
  setDetails: (details: any) => void
  avatar: string
  setAvatar: (avatar: string) => void
  credentials: any
  setCredentials: (credentials: any) => void
  clearCredentials: () => void
}

interface ForgotPasswordProps {
  credentials: any
  setCredentials: (credentials: any) => void
  clearCredentials: () => void
}

export const useAccountStore = create<AccountProps>((set) => ({
  balance: '0',
  setBalance: (balance) => set({ balance }),
  details: {},
  setDetails: (details) => set({ details }),
  avatar: '',
  setAvatar: (avatar) => set({ avatar }),
  credentials: {},
  setCredentials: (credentials) => set({ credentials }),
  clearCredentials: () => set({ credentials: {} })
}))

export const useForgotPasswordStore = create<ForgotPasswordProps>((set) => ({
  credentials: {
    forgot_password_id: '',
    email: '',
    otp: ''
  },
  setCredentials: (credentials) => set({ credentials }),
  clearCredentials: () => set({ credentials: {} })
}))

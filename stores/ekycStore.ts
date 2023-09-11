import { create } from 'zustand'

interface EkycProps {
    frontImage: string | null;
    backImage: string | null;
    selfieImage: string | null;
    setFrontImage: (frontImage: string) => void;
    setBackImage: (backImage: string) => void;
    setSelfieImage: (selfieImage: string) => void;
}

export const useEkycStore = create<EkycProps>((set) => ({
	frontImage: null,
	backImage: null,
	selfieImage: null,
	setFrontImage: (frontImage: string) => set({ frontImage }),
	setBackImage: (backImage: string) => set({ backImage }),
	setSelfieImage: (selfieImage: string) => set({ selfieImage })
}))
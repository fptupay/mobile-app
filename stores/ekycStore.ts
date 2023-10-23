import { create } from 'zustand'

interface FrontCard {
  user_ekyc_id: string
  card_id: string
  full_name: string
  dob: string
  doe: string
  nationality: string
  place_of_origin: string
  permanent_address: string
  address_entities: any
}
interface EkycProps {
  ekycId: string
  frontCardDetails: FrontCard
  setEkycId: (ekycId: string) => void
  setFrontCardDetails: (frontCardDetails: FrontCard) => void
}

export const useEkycStore = create<EkycProps>((set) => ({
  ekycId: '',
  frontCardDetails: {
    user_ekyc_id: '',
    card_id: '',
    full_name: '',
    dob: '',
    doe: '',
    nationality: '',
    place_of_origin: '',
    permanent_address: '',
    address_entities: {}
  },
  setEkycId: (ekycId) => set({ ekycId }),
  setFrontCardDetails: (frontCardDetails) => set({ frontCardDetails })
}))

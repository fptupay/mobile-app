import { apiGetCall, apiPostCall } from '..'

export const getRoomTypes = async () => {
  const response = await apiGetCall('/merchant/ocd/room-type')
  return response.data
}

export const getDomListByRoomTypes = async (roomType: string) => {
  const response = await apiGetCall(`/merchant/ocd/dom?code=${roomType}`)
  return response.data
}

export const getSemesters = async () => {
  const response = await apiGetCall('/merchant/ocd/semesters')
  return response.data
}

export const bookDomRoom = async (data: any) => {
  const response = await apiPostCall('/merchant/ocd/booking-room', data)
  return response.data
}

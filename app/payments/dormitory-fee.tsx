import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { formatMoney } from '@/utils/helper'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

interface Room {
  id: number
  name: string
  price: number
}

const roomTypes: Room[] = [
  { id: 1, name: 'Phòng 3 người', price: 1000000 },
  { id: 2, name: 'Phòng 4 người', price: 2000000 },
  { id: 3, name: 'Phòng 6 người', price: 3000000 }
]

export default function DormitoryFeeScreen() {
  const [selectedRoomType, setSelectedRoomType] = useState<Room>()

  const handleSelectRoomType = (room: Room) => {
    // uncheck if the room is already checked
    if (selectedRoomType?.id === room.id) {
      setSelectedRoomType(undefined)
      return
    }
    setSelectedRoomType(room)
  }

  return (
    <SharedLayout title="Ký túc xá" href="/payments">
      <View className="mt-4">
        <MediumText>Lựa chọn loại phòng</MediumText>

        {/* Room type */}
        <View className="flex flex-row flex-wrap gap-x-4 mt-4">
          {roomTypes.map((room) => (
            <TouchableOpacity
              className={`p-4 mb-4 border rounded-lg ${
                selectedRoomType?.id === room.id
                  ? 'border-primary'
                  : 'border-gray-300'
              }`}
              key={room.id}
              activeOpacity={0.8}
              onPress={() => handleSelectRoomType(room)}
            >
              <View>
                <MediumText>{room.name}</MediumText>
                <NormalText className="text-tertiary">
                  {formatMoney(room.price)} đ
                </NormalText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="mt-auto mb-4">
        <TextButton
          text="Tiếp tục"
          type="primary"
          disable={!selectedRoomType}
          href="/payments/school-payment-confirmation"
        />
      </View>
    </SharedLayout>
  )
}

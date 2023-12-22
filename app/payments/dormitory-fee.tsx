import { getRoomTypes } from '@/api/booking/dormitory'
import LoadingSpin from '@/components/LoadingSpin'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { formatMoney } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

interface Room {
  id: number
  name: string
  code: string
  amount: number
}

export default function DormitoryFeeScreen() {
  const [selectedRoomType, setSelectedRoomType] = useState<Room>()

  const { data, isLoading } = useQuery({
    queryKey: ['room'],
    queryFn: getRoomTypes
  })

  const handleSelectRoomType = (room: Room) => {
    // uncheck if the room is already checked
    if (selectedRoomType?.id === room.id) {
      setSelectedRoomType(undefined)
      return
    }
    setSelectedRoomType(room)
  }

  return (
    <SharedLayout title="Ký túc xá" backHref='/account/payments'>
      <View className="mt-4">
        <MediumText className="text-secondary">Lựa chọn loại phòng</MediumText>
        {isLoading ? (
          <LoadingSpin />
        ) : (
          <View className="gap-x-4 mt-4">
            {data?.data.map((room: Room) => (
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
                  <MediumText className="text-secondary">
                    {room.name}
                  </MediumText>
                  <NormalText className="text-tertiary">
                    {formatMoney(room.amount)} đ
                  </NormalText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      

      <View className="mt-auto mb-4">
        <TextButton
          text="Tiếp tục"
          type="primary"
          disable={!selectedRoomType}
          onPress={() =>
            router.push({
              pathname: '/payments/dormitory-choice',
              params: { code: selectedRoomType?.code }
            } as any)
          }
        />
      </View>
    </SharedLayout>
  )
}

import { NormalText, SafeAreaView, SemiText, View } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { useEkycStore } from '@/stores/ekycStore'
import { router } from 'expo-router'
import React from 'react'
import { FlatList } from 'react-native'

export default function EkycResultScreen() {
  const {
    card_id,
    full_name,
    dob,
    doe,
    nationality,
    place_of_origin,
    permanent_address
  } = useEkycStore((state) => state.frontCardDetails)

  const frontCard = [
    { label: 'Số ID', value: card_id },
    { label: 'Có giá trị đến', value: doe },
    { label: 'Họ và tên', value: full_name },
    { label: 'Ngày sinh', value: dob },
    { label: 'Quốc tịch', value: nationality },
    { label: 'Quê quán', value: place_of_origin },
    { label: 'Nơi thường trú', value: permanent_address }
  ]

  return (
    <SafeAreaView className="flex-1 px-4 pt-4">
      <SemiText className="text-primary text-xl text-center mb-4 border-b border-b-primary pb-1">
        Kết quả xác thực
      </SemiText>

      <FlatList
        data={frontCard}
        renderItem={({ item }) => (
          <View className="flex flex-row flex-wrap justify-between my-1">
            <NormalText className="text-tertiary flex-1">
              {item.label}
            </NormalText>
            <NormalText className="flex-1 text-right">{item.value}</NormalText>
          </View>
        )}
      />

      <View className="mt-auto mb-4">
        <TextButton
          text="Tiếp tục"
          type="primary"
          onPress={() =>
            router.push({
              pathname: '/authentication/init/ekyc/[card]',
              params: { card: 'back' }
            } as any)
          }
        />
        <TextButton
          text="Quay lại"
          type="secondary"
          onPress={() => router.back()}
        />
      </View>
    </SafeAreaView>
  )
}

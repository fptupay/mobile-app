import { getSavedAccounts } from '@/api/transfer'
import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import { useQuery } from '@tanstack/react-query'

import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'

export default function TransferListScreen() {
  const router = useRouter()

  const { data: friends } = useQuery({
    queryKey: ['friends'],
    queryFn: getSavedAccounts
  })

  return (
    <SharedLayout
      backHref="/account/home"
      questionHref="/instruction/transfer-instruction"
      title="Chuyển tiền tới"
    >
      <TouchableOpacity
        onPress={() => router.push('/transfer/transfer-new')}
        className="border border-gray-300 rounded-lg px-4 py-3 flex flex-row items-center mt-4"
        activeOpacity={0.8}
      >
        <CustomIcon name="UserPlus" size={24} color="#000" />
        <MediumText className="ml-2 text-secondary">
          Người thụ hưởng mới
        </MediumText>
      </TouchableOpacity>

      <View className="mt-4">
        <SemiText className="text-secondary">Đã lưu</SemiText>
        <FlatList
          data={friends?.data}
          renderItem={({ item }) => (
            <TouchableOpacity className="flex flex-row items-center justify-between border-b border-gray-300 py-3">
              <View className="flex flex-row items-center">
                <View className="w-10 h-10 bg-gray-300 rounded-full" />
                <View className="ml-2">
                  <MediumText className="text-secondary">
                    {item.name}
                  </MediumText>
                  <NormalText className="text-tertiary">
                    {item.ref_user_id}
                  </NormalText>
                </View>
              </View>
              <CustomIcon name="MoreHorizontal" size={24} color="#000" />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SharedLayout>
  )
}

import { FlatList, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SharedLayout from '@/components/SharedLayout'
import { useQuery } from '@tanstack/react-query'
import { getDNGBillByFeeType } from '@/api/bill'
import LoadingSpin from '@/components/LoadingSpin'
import { router } from 'expo-router'
import CustomIcon from '@/components/Icon'
import { MediumText, NormalText } from '@/components/Themed'

export default function OtherFeeListScreen() {
  const otherFeeData = useQuery({
    queryKey: ['otherFee'],
    queryFn: () => getDNGBillByFeeType('khac')
  })

  return (
    <SharedLayout title="Phí đơn từ" backHref="/account/payments">
      {otherFeeData.data ? (
        <FlatList
          data={otherFeeData?.data?.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-4 mt-6 border flex-row justify-between items-center border-gray-300 rounded-lg"
              onPress={() =>
                router.push({
                  pathname: '/payments/payment-bill',
                  params: { type: 'khac' }
                } as any)
              }
              activeOpacity={0.8}
            >
              <View>
                <MediumText className="text-secondary ml-2">
                  {item.type_desc}
                </MediumText>
                <NormalText className="text-tertiary ml-2">
                  Mã đơn: {item.id}
                </NormalText>
              </View>
              <CustomIcon name="ChevronRight" size={24} color="#374151" />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <View className="flex flex-1 items-center justify-center mt-20 mx-auto">
              <CustomIcon name="WalletCards" size={32} color="#666" />
              <NormalText className="text-center text-tertiary mt-4 w-72">
                Hiện tại bạn không có khoản phí đơn từ nào cần đóng.
              </NormalText>
            </View>
          )}
        />
      ) : (
        <LoadingSpin />
      )}
    </SharedLayout>
  )
}

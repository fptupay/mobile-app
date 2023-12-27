import { View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import SharedLayout from '@/components/SharedLayout'
import { getDNGBillByFeeType } from '@/api/bill'
import { useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import { MediumText, NormalText } from '@/components/Themed'
import CustomIcon from '@/components/Icon'
import LoadingSpin from '@/components/LoadingSpin'

export default function TuitionScreen() {
  const tuitionData = useQuery({
    queryKey: ['otherFee'],
    queryFn: () => getDNGBillByFeeType('hp')
  })

  return (
    <SharedLayout title="Học phí" backHref="/account/payments">
      {tuitionData.data ? (
        <FlatList
          data={tuitionData?.data?.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-4 mt-6 border flex-row justify-between items-center border-gray-300 rounded-lg"
              onPress={() =>
                router.push({
                  pathname: '/payments/payment-bill',
                  params: { type: 'hp' }
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
              <CustomIcon name="School" size={32} color="#666" />
              <NormalText className="text-center text-tertiary mt-4 w-72">
                Hiện tại bạn không có khoản học phí nào cần đóng.
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

import { getTransactionDetails } from '@/api/transaction'
import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { NormalText, SemiText, View } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import Colors from '@/constants/Colors'
import { formatDateTime, formatMoney } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator } from 'react-native'

export default function TransactionDetailScreen() {
  const params: { id: string } = useLocalSearchParams()
  console.log(params.id)
  const { data, isLoading } = useQuery({
    queryKey: ['transaction-detail', params.id],
    queryFn: () => getTransactionDetails(params.id)
  })

  const details = [
    {
      title: 'Người nhận',
      value: data?.data.fund_transfer_detail.receiver_name
    },
    {
      title: 'Mã sinh viên',
      value: data?.data.fund_transfer_detail.destination
    },
    {
      title: 'Nội dung giao dịch',
      value: data?.data.fund_transfer_detail.description
    },
    {
      title: 'Thời gian',
      value: formatDateTime(data?.data.created_at)
    },
    {
      title: 'Mã giao dịch',
      value: data?.data.transaction_id
    },
    {
      title: 'Trạng thái',
      value:
        data?.data.fund_transfer_detail.status === 'SUCCESS' && 'Thành công'
    },
    {
      title: 'Số dư khả dụng',
      value: formatMoney(data?.data.close_balance)
    }
  ]

  return (
    <SharedLayout title="Chi tiết giao dịch" href="/home">
      {isLoading ? (
        <View className="flex justify-center items-center mt-8 h-full">
          <ActivityIndicator size="large" color={Colors.tertiary} />
          <NormalText className="mt-2 text-tertiary">
            Đang tải dữ liệu
          </NormalText>
        </View>
      ) : (
        <>
          <View className="flex flex-row justify-between mt-4">
            <SemiText>Chuyển tiền nhanh</SemiText>
            <CustomIcon name="Share" size={20} color="#000" />
          </View>

          <SemiText className="text-4xl text-center mt-4">
            {' '}
            {formatMoney(data?.data.amount)} đ
          </SemiText>
          <View className="h-[1px] mt-4 w-full mx-auto bg-gray-200" />

          <View className="mt-4">
            <View className="mt-2 flex space-y-4">
              {details.map((item) => (
                <View className="flex-row justify-between" key={item.title}>
                  <NormalText className="text-tertiary">
                    {item.title}
                  </NormalText>
                  <NormalText>{item.value}</NormalText>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-auto mb-4">
            <TextButton
              text="Trợ giúp"
              type="primary"
              onPress={() => {
                router.push('/account/help-center/create-request')
              }}
            />
          </View>
        </>
      )}
    </SharedLayout>
  )
}

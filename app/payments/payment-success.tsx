import { NormalText, SemiText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { WINDOW_HEIGHT, formatDateTime, formatMoney } from '@/utils/helper'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getTransactionDetails } from '@/api/transaction'

export default function PaymentSuccessScreen() {
  const { type, transId } = useLocalSearchParams()
  const { data, isFetched } = useQuery({
    queryKey: ['transaction-detail', transId],
    queryFn: () => getTransactionDetails(transId as string)
  })

  const transferDetail = [
    {
      title: 'Thời gian giao dịch',
      value: isFetched && formatDateTime(data?.data.created_at)
    },
    {
      title: 'Mã giao dịch',
      value: isFetched && data?.data.transaction_id
    },
    {
      title: 'Số dư khả dụng',
      value: isFetched && formatMoney(data?.data.close_balance)
    }
  ]

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <View
        className="absolute left-0 right-0 bottom-0 bg-white flex-1 px-4 rounded-t-[30px] flex justify-start items-center"
        style={{ top: WINDOW_HEIGHT * 0.2 }}
      >
        <Image
          source={require('@/assets/images/tick-circle.png')}
          transition={200}
          className="w-[150px] h-[150px] mx-auto mt-[-40px]"
        />
        <SemiText className="text-primary text-2xl text-center mt-5">
          Thanh toán thành công
        </SemiText>
        <NormalText className="text-tertiary mt-4 text-center">
          Bạn đã nộp tiền {type === 'ktx' ? 'ký túc xá' : 'học phí'} thành công.
          Chúc bạn một kỳ học mới hiệu quả!
        </NormalText>
        <View className="w-full h-px bg-[#E1E1E1] mt-5"></View>
        <View className="mt-5 w-full">
          {transferDetail.map((item, index) => (
            <View key={index} className="flex flex-row justify-between mb-6">
              <NormalText className="text-tertiary">{item.title}</NormalText>
              <NormalText className="text-secondary">{item.value}</NormalText>
            </View>
          ))}
        </View>
        <View className="w-full mb-4 mt-auto" style={{ rowGap: 12 }}>
          <TextButton
            text="Về trang chủ"
            type={TextButtonType.PRIMARY}
            href="/account/home"
          />
        </View>
      </View>
    </View>
  )
}

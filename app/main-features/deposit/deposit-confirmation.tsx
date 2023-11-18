import { getTransactionDetails } from '@/api/transaction'
import LoadingSpin from '@/components/LoadingSpin'
import { NormalText, SemiText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { WINDOW_HEIGHT } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Image } from 'expo-image'

export default function DepositConfirmationScreen() {
  const params: { transId: string } = useLocalSearchParams()
  console.log('deposit trans id ', params.transId)

  const { data, isLoading } = useQuery({
    queryKey: ['transaction-detail', params.transId],
    queryFn: () => getTransactionDetails(params.transId)
  })

  console.log('deposit data ', data)

  const transferDetail = [
    {
      title: 'Số dư khả dụng',
      value: ''
      // value: isFetched && `${formatMoney(data?.data.close_balance)} đ`
    },
    {
      title: 'Thời gian giao dịch',
      value: ''
      // value: isFetched && formatDateTime(data?.data.created_at)
    },
    {
      title: 'Mã giao dịch',
      value: ''
      // value: data?.data.transaction_id
    }
  ]

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      {isLoading ? (
        <LoadingSpin />
      ) : (
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
            Nạp tiền thành công!
          </SemiText>
          <NormalText className="text-tertiary mt-4 text-center">
            Bạn đã nạp thành công 100.000đ vào ví FPTUPay
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
      )}
    </View>
  )
}

import { getTransactionDetails } from '@/api/transaction'
import LoadingSpin from '@/components/LoadingSpin'
import { NormalText, SemiText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import {
  WINDOW_HEIGHT,
  formatDateTime,
  formatMoney,
  getBankName
} from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Image } from 'expo-image'
import GradientBackground from '@/components/GradientBackground'

export default function WithdrawConfirmationScreen() {
  const params: { transId: string } = useLocalSearchParams()

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ['transaction-detail', params.transId],
    queryFn: () => getTransactionDetails(params.transId)
  })

  const transferDetail = [
    {
      title: 'Số dư khả dụng',
      value: isFetched && `${formatMoney(data?.data.close_balance)} đ`
    },
    {
      title: 'Thời gian giao dịch',
      value: isFetched && formatDateTime(data?.data.created_at)
    },
    {
      title: 'Mã giao dịch',
      value: data?.data.transaction_id
    }
  ]

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      {isLoading ? (
        <LoadingSpin />
      ) : (
        <View className="flex-1">
          <View style={{ height: WINDOW_HEIGHT * 0.25 }}>
            <GradientBackground />
          </View>
          <View
            className="absolute left-0 right-0 bottom-0 bg-white flex-1 px-4 rounded-t-[30px] flex justify-start items-center"
            style={{ top: WINDOW_HEIGHT * 0.2 }}
          >
            <Image
              source={require('@/assets/images/tick-circle.png')}
              transition={200}
              className="w-[120px] h-[120px] mx-auto mt-[-40px]"
            />
            <SemiText className="text-primary text-2xl text-center mt-5">
              Rút tiền thành công!
            </SemiText>
            <NormalText className="text-tertiary mt-4 text-center">
              Bạn đã chuyển thành công {formatMoney(data?.data.amount).slice(1)}
              đ về tài khoản ngân hàng {getBankName(data?.data.sub_trans_code)}
            </NormalText>
            <View className="w-full h-px bg-[#E1E1E1] mt-5"></View>
            <View className="mt-5 w-full">
              {transferDetail.map((item, index) => (
                <View
                  key={index}
                  className="flex flex-row justify-between mb-6"
                >
                  <NormalText className="text-tertiary">
                    {item.title}
                  </NormalText>
                  <NormalText className="text-secondary">
                    {item.value}
                  </NormalText>
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
      )}
    </View>
  )
}

import { NormalText, SemiText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { WINDOW_HEIGHT } from '@/utils/helper'
import { StatusBar } from 'expo-status-bar'
import { Image, View } from 'react-native'

export default function DepositConfirmationScreen() {
  const transferDetail = [
    {
      title: 'Số dư ví',
      content: '200.000đ'
    },
    {
      title: 'Thời gian giao dịch',
      content: '19:44 - 01/01/2022'
    },
    {
      title: 'Mã giao dịch',
      content: '12345678904'
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
          source={require('../assets/images/tick-circle.png')}
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
              <NormalText className="text-secondary">{item.content}</NormalText>
            </View>
          ))}
        </View>
        <View className="w-full mb-4 mt-auto" style={{ rowGap: 12 }}>
          <TextButton
            text="Về trang chủ"
            type={TextButtonType.PRIMARY}
            href="/(account)/home"
          />
        </View>
      </View>
    </View>
  )
}

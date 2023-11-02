import GradientBackground from '@/components/GradientBackground'
import CustomIcon from '@/components/Icon'
import { NormalText, SemiText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { WINDOW_HEIGHT } from '@/utils/helper'
import { StatusBar } from 'expo-status-bar'
import { Image, View } from 'react-native'

export default function TransferSuccessfulScreen() {
  const transferDetail = [
    {
      title: 'Loại thanh toán',
      content: 'Chuyển nhanh'
    },
    {
      title: 'Người nhận',
      content: 'HA GIA KINH'
    },
    {
      title: 'MSSV',
      content: 'HE150111'
    },
    {
      title: 'Nội dung giao dịch',
      content: 'Cam on nha'
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
      <View style={{ height: WINDOW_HEIGHT * 0.25 }}>
        <GradientBackground />
        <View className="absolute right-6 top-16">
          <CustomIcon name="Share" color="#000" size={24} />
        </View>
      </View>
      <View
        className="absolute left-0 right-0 bottom-0 bg-white flex-1 px-4 rounded-t-[30px] flex justify-start items-center"
        style={{ top: WINDOW_HEIGHT * 0.2 }}
      >
        <Image
          source={require('@/assets/images/tick-circle.png')}
          className="w-[80px] h-[80px] mx-auto mt-[-40px]"
        />
        <SemiText className="text-primary text-2xl text-center mt-5">
          Chuyển tiền thành công!
        </SemiText>
        <SemiText className="text-4xl text-secondary mt-7">-200.000 đ</SemiText>
        <View className="w-full h-px bg-[#E1E1E1] mt-5"></View>
        <View className="mt-5 w-full">
          {transferDetail.map((item, index) => (
            <View key={index} className="flex flex-row justify-between mb-4">
              <NormalText className="text-tertiary">{item.title}</NormalText>
              <NormalText className="text-secondary">{item.content}</NormalText>
            </View>
          ))}
        </View>
        <View className="w-full mb-4 mt-auto" style={{ rowGap: 12 }}>
          <TextButton
            text="Về trang chủ"
            type={TextButtonType.PRIMARY}
            href="/account/home"
          />
          <TextButton
            text="Lưu bạn bè"
            type={TextButtonType.OUTLINE}
            href="/transfer/transfer-list"
          />
        </View>
      </View>
    </View>
  )
}

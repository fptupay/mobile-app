import { View, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { SemiText, NormalText, MediumText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'

export default function PaymentInstructionScreen() {
  return (
    <SafeAreaView className="flex-1 px-6 pt-4 bg-white">
      <StatusBar style="auto" />
      <View className="flex-1 w-full space-y-4">
        <BackButton href={'/account/payments'} />
        <ScrollView
          className="flex-1 my-4"
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center">
            <Image
              source={require('@/assets/images/payment.png')}
              className="w-[300px] h-[200px]"
            />
          </View>
          <SemiText className="text-3xl tracking-tighter text-secondary mt-2">
            Hướng dẫn thanh toán phí học đường
          </SemiText>
          <MediumText className="text-secondary mt-4">
            1. Thanh toán học phí theo kỳ:{' '}
            <NormalText className="text-tertiary mt-2">
              Số tiền học phí phải nộp sẽ được thông báo đến bạn vào chậm nhất 2
              tuần trước khi học kỳ mới bắt đầu. Sau khi đã hoàn thành bổn phận
              học phí, bạn sẽ không còn nhìn thấy danh mục này.
            </NormalText>
          </MediumText>

          <MediumText className="text-secondary mt-2">
            2. Thanh toán ký túc xá:{' '}
            <NormalText className="text-tertiary mt-2">
              Bạn có thể lựa chọn đặt phòng mới hoặc giữ chỗ phòng ký túc xá cho
              2 kỳ tiếp theo. Ngay sau khi tạo hoá đơn ký túc xá thành công, hệ
              thống FAP sẽ ghi nhận và cập nhật lại thông tin phòng ký túc xá
              của bạn.
            </NormalText>
          </MediumText>

          <MediumText className="text-secondary mt-2">
            3. Thanh toán phí đơn từ:{' '}
            <NormalText className="text-tertiary mt-2">
              Ngay sau khi tạo 1 khoản nộp tiền phí đơn từ từ FAP, ví FPTUPay sẽ
              hiển thị danh sách các đơn mà bạn cần thanh toán.
            </NormalText>
          </MediumText>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

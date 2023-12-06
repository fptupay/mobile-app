import { View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NormalText, SemiText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'

export default function AddBankInstruction() {
  return (
    <SafeAreaView className="flex-1 px-6 pt-4">
      <BackButton />
      <View className="items-center">
        <Image
          source={require('@/assets/images/payment.png')}
          className="w-full h-[225px] mx-auto"
        />
      </View>
      <SemiText className="text-3xl text-secondary mt-2">
        Hướng dẫn liên kết ngân hàng
      </SemiText>

      <NormalText className="text-tertiary mt-4">
        Để có thể thực hiện các giao dịch trên ứng dụng FPTUPay, bạn sẽ cần liên
        kết với một tài khoản ngân hàng có sẵn.
      </NormalText>

      <NormalText className="text-tertiary mt-2">
        Sau khi đã lựa chọn ngân hàng, bạn có hai lựa chọn bao gồm nhập số thẻ
        và nhập số tài khoản của ngân hàng đó. Tiếp theo, chỉ cần nhập đúng mã
        OTP của ngân hàng gửi về là bạn đã liên kết ngân hàng thành công rồi đó!
      </NormalText>
    </SafeAreaView>
  )
}

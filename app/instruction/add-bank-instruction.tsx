import { View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { MediumText, NormalText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'

export default function addBankInstruction() {
  return (
    <SafeAreaView className="flex-1 items-center relative">
      <StatusBar style="auto" />
      <View className="flex-1 w-full px-4 space-y-4">
        <BackButton />
        <View className="items-center">
          <Image
            source={require('@/assets/images/payment.png')}
            className="w-[220px] h-[180px]"
          />
        </View>
        <MediumText className="text-2xl tracking-tighter text-secondary">
          Hướng dẫn liên kết ngân hàng
        </MediumText>

        <NormalText>
          Để có thể thực hiện các giao dịch trên ứng dụng FPTUPay, bạn sẽ cần
          liên kết với một tài khoản ngân hàng có sẵn.
        </NormalText>

        <NormalText>
          Sau khi đã lựa chọn ngân hàng, bạn có hai lựa chọn bao gồm nhập số thẻ
          và nhập số tài khoản của ngân hàng đó. Tiếp theo, chỉ cần nhập đúng mã
          OTP của ngân hàng gửi về là bạn đã liên kết ngân hàng thành công rồi
          đó!
        </NormalText>
      </View>
    </SafeAreaView>
  )
}

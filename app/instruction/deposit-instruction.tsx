import { View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SemiText, NormalText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'

export default function DepositInstructionScreen() {
  return (
    <SafeAreaView className="flex-1 px-6 pt-4 bg-white">
      <BackButton />
      <View className="items-center">
        <Image
          source={require('@/assets/images/deposit-image.png')}
          className="w-[220px] h-[180px]"
        />
      </View>
      <SemiText className="text-3xl text-secondary mt-2">
        Hướng dẫn nạp tiền vào ví FPTUPay
      </SemiText>
      <NormalText className="text-tertiary mt-4">
        Để nạp tiền vào ví điện tử FPTUPay, hãy đảm bảo rằng bạn đã liên kết
        thành công ít nhất một tài khoản ngân hàng.
      </NormalText>
      <NormalText className="text-tertiary mt-2">
        Hạn mức cho mỗi giao dịch nạp tiền là 50.000.000 đ.
      </NormalText>
    </SafeAreaView>
  )
}

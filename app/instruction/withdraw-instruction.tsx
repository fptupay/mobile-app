import { View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { SemiText, NormalText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'

export default function withdrawInstruction() {
  return (
    <SafeAreaView className="flex-1 px-4 pt-4">
        <BackButton />
        <View className="items-center">
          <Image
            source={require('@/assets/images/withdraw.png')}
            className="w-[220px] h-[180px]"
          />
        </View>
        <SemiText className="text-3xl text-secondary my-4">
          Hướng dẫn rút tiền về ngân hàng liên kết
        </SemiText>
        <NormalText className="text-tertiary mt-2">
          Để rút tiền khỏi ví điện tử FPTUPay, hãy đảm bảo rằng bạn đã liên kết
          thành công ít nhất một tài khoản ngân hàng.
        </NormalText>
        <NormalText className="text-tertiary mt-2">
          Sau khi nhập số tiền muốn rút, bạn sẽ cần xác minh thông qua mã Smart
          OTP. Vì vậy, hãy đảm bảo rằng bạn đã đăng ký dịch vụ Smart OTP để quá
          trình rút tiền diễn ra thuận lợi nhé.
        </NormalText>
        <NormalText className="text-tertiary mt-2">
          Hạn mức cho mỗi giao dịch rút tiền là 50.000.000 đ.
        </NormalText>
    </SafeAreaView>
  )
}

import { View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { MediumText, NormalText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'

export default function withdrawInstruction() {
  return (
    <SafeAreaView className="flex-1 items-center relative">
      <StatusBar style="auto" />
      <View className="flex-1 w-full px-4 space-y-4">
        <BackButton />
        <View className="items-center">
          <Image
            source={require('@/assets/images/withdraw.png')}
            className="w-[220px] h-[180px]"
          />
        </View>
        <MediumText className="text-2xl tracking-tighter text-secondary">
          Hướng dẫn rút tiền về ngân hàng liên kết
        </MediumText>
        <NormalText>
          Để rút tiền khỏi ví điện tử FPTUPay, hãy đảm bảo rằng bạn đã liên kết
          thành công ít nhất một tài khoản ngân hàng.
        </NormalText>
        <NormalText>
          Sau khi nhập số tiền muốn rút, bạn sẽ cần xác minh thông qua mã Smart
          OTP. Vì vậy, hãy đảm bảo rằng bạn đã đăng ký dịch vụ Smart OTP để quá
          trình rút tiền diễn ra thuận lợi nhé.
        </NormalText>
        <NormalText>
          Hạn mức cho mỗi giao dịch rút tiền là 50.000.000 đ.
        </NormalText>
      </View>
    </SafeAreaView>
  )
}

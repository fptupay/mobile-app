import { View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { MediumText, NormalText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'

export default function depositIntruction() {
  return (
    <SafeAreaView className="flex-1 items-center relative">
      <StatusBar style="auto" />
      <View className="flex-1 w-full px-4 space-y-4">
        <BackButton />
        <View className="items-center">
          <Image
            source={require('@/assets/images/deposit-image.png')}
            className="w-[220px] h-[180px]"
          />
        </View>
        <MediumText className="text-2xl tracking-tighter text-secondary">
          Hướng dẫn nạp tiền vào ví FPTUPay
        </MediumText>
        <NormalText>
          Để nạp tiền vào ví điện tử FPTUPay, hãy đảm bảo rằng bạn đã liên kết
          thành công ít nhất một tài khoản ngân hàng.
        </NormalText>
        <NormalText>
          Hạn mức cho mỗi giao dịch nạp tiền là 50.000.000 đ.
        </NormalText>
      </View>
    </SafeAreaView>
  )
}

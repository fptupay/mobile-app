import { View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { SemiText, NormalText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'

export default function TransferInstructionScreen() {
  return (
    <SafeAreaView className="flex-1 px-6 pt-4">
      <StatusBar style="auto" />
      <View className="flex-1 w-full px-4 space-y-4">
        <BackButton />
        <View className="items-center">
          <Image
            source={require('@/assets/images/transfer.png')}
            className="w-[220px] h-[180px]"
          />
        </View>
        <SemiText className="text-3xl text-secondary mt-2">
          Hướng dẫn chuyển tiền giữa các tài khoản
        </SemiText>
        <NormalText className="text-tertiary mt-4">
          Biết tin gì chưa? Bạn hoàn toàn có thể chuyển tiền cho một người bạn
          của mình thông qua ứng dụng FPTUPay đó.
        </NormalText>
        <NormalText className="text-tertiary mt-2">
          Bạn có thể lựa chọn người muốn chuyển tiền thông qua danh sách đã lưu,
          hoặc tìm kiếm người đó thông qua mã số sinh viên. Ngoài ra, hãy đảm
          bảo rằng bạn đã đăng ký dịch vụ Smart OTP để quá trình chuyển tiền
          diễn ra thuận lợi nhé.
        </NormalText>
      </View>
    </SafeAreaView>
  )
}

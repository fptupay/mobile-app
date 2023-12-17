import { View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NormalText, SemiText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'

export default function CreateRequestInstructionScreen() {
  return (
    <SafeAreaView className="flex-1 px-6 pt-4 bg-white">
      <BackButton />
      <View className="items-center">
        <Image
          source={require('@/assets/images/send.png')}
          className="w-[225px] h-[225px] mx-auto"
        />
      </View>
      <SemiText className="text-3xl text-secondary mt-2">
        Hướng dẫn gửi yêu cầu hỗ trợ
      </SemiText>
      <NormalText className="text-tertiary mt-4">
        Hỗ trợ là mục các bạn có thể gửi những yêu cầu trợ giúp nếu gặp phải các
        vấn đề trong việc sử dụng ví điện tử FPTUPay.
      </NormalText>
      <NormalText className="text-tertiary mt-2">
        Sau khi nhấn nút “Gửi yêu cầu”, yêu cầu của bạn sẽ được gửi tới đội ngũ
        admin của chúng mình. Các bạn sẽ nhận được phản hồi trong tối đa 48h kể
        từ lúc gửi yêu cầu.
      </NormalText>
      <NormalText className="text-tertiary mt-2">
        Hãy lưu ý rằng mô tả nội dung yêu cầu càng chi tiết, chúng mình sẽ càng
        có thể hỗ trợ các bạn dễ dàng hơn.
      </NormalText>
    </SafeAreaView>
  )
}

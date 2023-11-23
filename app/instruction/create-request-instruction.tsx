import {View, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { MediumText, NormalText} from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'

export default function createRequestInstruction() {
  return (
    <SafeAreaView className="flex-1 items-center relative">
      <StatusBar style="auto" />
          <View className="flex-1 w-full px-4 space-y-4">
            <BackButton/>
              <View className='items-center'>
                <Image
                  source={require('@/assets/images/send.png')}
                  className="w-[220px] h-[180px]"
                />
              </View>
              <MediumText className="text-2xl tracking-tighter text-secondary">
                Hướng dẫn gửi yêu cầu hỗ trợ
              </MediumText>
              <NormalText>
                  Hỗ trợ là mục các bạn có thể gửi những yêu cầu trợ giúp
                  nếu gặp phải các vấn đề trong việc sử dụng ví điện tử FPTUPay.
                </NormalText>
                <NormalText>
                  Sau khi nhấn nút “Gửi yêu cầu”, yêu cầu của bạn sẽ được gửi tới đội 
                  ngũ admin của chúng mình. Các bạn sẽ nhận được phản hồi trong tối đa 48h kể 
                  từ lúc gửi yêu cầu.
                </NormalText>
                <NormalText>
                  Hãy lưu ý rằng mô tả nội dung yêu cầu càng chi tiết, chúng mình sẽ càng có thể hỗ trợ các bạn dễ dàng hơn.
                </NormalText>
            </View>
    </SafeAreaView>
  )
}

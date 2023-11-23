import { View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { MediumText, NormalText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'

export default function paymentInstruction() {
  return (
    <SafeAreaView className="flex-1 items-center relative">
      <StatusBar style="auto" />
      <View className="flex-1 w-full px-4 space-y-4">
        <BackButton/>
        <View className="items-center">
          <Image
            source={require('@/assets/images/payment.png')}
            className="w-[220px] h-[180px]"
          />
        </View>
        <MediumText className="text-2xl tracking-tighter text-secondary">
          Hướng dẫn thanh toán phí học đường
        </MediumText>
        <MediumText className="text-[14px] tracking-tighter text-secondary">
          1. Thanh toán học phí theo kỳ: {' '}
          <NormalText>
            Số tiền học phí phải nộp sẽ được thông báo đến bạn vào chậm nhất 2
            tuần trước khi học kỳ mới bắt đầu. Sau khi đã hoàn thành bổn phận
            học phí, bạn sẽ không còn nhìn thấy danh mục này.
          </NormalText>
        </MediumText>
        <MediumText className="text-[14px] tracking-tighter text-secondary">
          2. Thanh toán phí môn: {' '}
          <NormalText>
            Số tiền học phí phải nộp sẽ được thông báo đến bạn vào chậm nhất 2
            tuần trước khi học kỳ mới bắt đầu. Sau khi đã hoàn thành bổn phận
            học phí, bạn sẽ không còn nhìn thấy danh mục này.
          </NormalText>
        </MediumText>
        <MediumText className="text-[14px] tracking-tighter text-secondary">
          3. Thanh toán phí ký túc xá: {' '}
          <NormalText>
            Số tiền học phí phải nộp sẽ được thông báo đến bạn vào chậm nhất 2
            tuần trước khi học kỳ mới bắt đầu. Sau khi đã hoàn thành bổn phận
            học phí, bạn sẽ không còn nhìn thấy danh mục này.
          </NormalText>
        </MediumText>
      </View>
    </SafeAreaView>
  )
}

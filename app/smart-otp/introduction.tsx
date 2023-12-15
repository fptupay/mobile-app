import React from 'react'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextButton from '@/components/buttons/TextButton'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import BackButton from '@/components/buttons/BackButton'

const advantages = [
  {
    label: 'Mã khoá riêng biệt',
    description:
      'Mỗi thiết bị khi đăng ký Smart OTP sẽ được cấp phát một mã khoá riêng.'
  },
  {
    label: 'Mã hoá nhiều tầng',
    description:
      'Giải pháp sử dụng thuật toán mã hoá đa lớp để sinh ra mã xác thực OTP.'
  },
  {
    label: 'Xác thực nhanh',
    description:
      'Chỉ cần nhập mã Smart OTP, hệ thống tự động kích hoạt để xử lý mã hoá và xác thực giao dịch.'
  }
]

export default function SmartOTPIntroductionScreen() {
  return (
    <SafeAreaView className="flex-1 px-4 pt-4">
      <BackButton href="/smart-otp" />
      <Image
        source={require('@/assets/images/reset-password.png')}
        className="w-[225px] h-[225px] mx-auto"
      />
      <SemiText className="text-3xl text-secondary">
        Giới thiệu FPTUPay - Smart OTP
      </SemiText>

      <NormalText className="text-tertiary mt-2">
        Smart OTP là phương thức bảo mật cao, giúp tạo mã OTP để xác thực giao
        dịch trực tuyến, với những tính năng tối ưu như:
      </NormalText>

      {advantages.map((advantage, index) => (
        <View key={index} className="mt-2">
          <NormalText className="text-tertiary">
            <MediumText className="text-secondary">
              {advantage.label}:{' '}
            </MediumText>
            {advantage.description}
          </NormalText>
        </View>
      ))}

      <View className="mt-auto mb-4">
        <TextButton
          type="primary"
          text="Tiếp tục"
          onPress={() => router.push('/smart-otp/register-pin')}
        />
      </View>
    </SafeAreaView>
  )
}

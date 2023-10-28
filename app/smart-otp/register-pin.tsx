import React from 'react'
import { MediumText, NormalText, SafeAreaView } from '@/components/Themed'
import { OtpInput } from '@/components/OtpInput'
import TextButton from '@/components/buttons/TextButton'

export default function RegisterPINScreen() {
  return (
    <SafeAreaView>
      <MediumText>Thiết lập mã PIN</MediumText>
      <NormalText>Vui lòng cài đặt PIN cho Smart OTP</NormalText>

      <NormalText>Nhập mã PIN</NormalText>
      <OtpInput numberOfDigits={6} />

      <NormalText>Nhập lại mã PIN</NormalText>
      <OtpInput numberOfDigits={6} />

      <TextButton type="primary" text="Tiếp tục" />
    </SafeAreaView>
  )
}

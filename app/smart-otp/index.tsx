import React from 'react'
import { MediumText, SafeAreaView } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { router } from 'expo-router'

export default function SmartOTPIntroductionScreen() {
  return (
    <SafeAreaView className="px-4 pt-8">
      <MediumText>SmartOTPIntroductionScreen</MediumText>
      <TextButton
        type="primary"
        text="Tiếp tục"
        onPress={() => router.push('/smart-otp/register-pin')}
      />
    </SafeAreaView>
  )
}

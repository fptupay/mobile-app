/* eslint-disable indent */
import { topupConfirm, topupVerify } from '@/api/bank'
import { OtpInput } from '@/components/OtpInput'
import SharedLayout from '@/components/SharedLayout'
import { NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import useCountdown from '@/hooks/useCountdown'
import { MoneyConfirmSchema, MoneyVerifySchema } from '@/schemas/bank-schema'
import { OtpInputRef } from '@/types/OtpInput.type'
import { successResponseStatus } from '@/utils/helper'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Toast from 'react-native-toast-message'

export default function OtpScreen() {
  const router = useRouter()
  const params: {
    type: string
    link_account_id: string
    trans_id: string
    amount: number
  } = useLocalSearchParams<any>()
  const otpInputRef = useRef<OtpInputRef>(null)
  const [otpCode, setOtpCode] = useState<string>('')

  const { secondsLeft, start } = useCountdown()

  const handleClear = () => {
    otpInputRef.current?.clear()
    setOtpCode('')
  }

  useEffect(() => {
    start(60)
  }, [])

  const topupMutation = useMutation({
    mutationFn: (data: MoneyConfirmSchema) => topupConfirm(data),
    onSuccess: (data) => {
      if (!successResponseStatus(data)) {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      } else {
        router.push({
          pathname: '/main-features/deposit/deposit-confirmation',
          params: { transId: data.data.trans_id }
        })
      }
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: error.response?.data?.message
        })
      }
    }
  })

  const depositMutation = useMutation({
    mutationFn: (data: MoneyVerifySchema) => topupVerify(data),
    onSuccess: (data) => {
      if (!successResponseStatus(data)) {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      } else {
        Toast.show({
          type: 'success',
          text1: 'Đã gửi lại mã OTP'
        })
        start(60)
      }
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: error.response?.data?.message
        })
      }
    }
  })

  const handleResendBankOTP = () => {
    if (secondsLeft === 0) {
      depositMutation.mutate({
        link_account_id: params.link_account_id,
        amount: params.amount,
        content: 'Nạp tiền vào ví FPTU Pay'
      })
    }
  }

  return (
    <SharedLayout title="Nhập mã OTP">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 pt-8 space-y-8">
            <View>
              <NormalText className="text-tertiary mt-1">
                Vui lòng nhập mã OTP 6 số vừa được gửi tới số điện thoại của bạn
              </NormalText>
            </View>

            {/* OTP 6 digits */}
            <View>
              <OtpInput
                ref={otpInputRef}
                numberOfDigits={6}
                focusColor="#F97316"
                onTextChange={(text: any) => setOtpCode(text)}
              />
              <Pressable className="mt-2" onPress={handleClear}>
                <NormalText className="text-primary text-center">
                  Xóa
                </NormalText>
              </Pressable>
            </View>

            <View>
              <View className="flex justify-center mb-4">
                <TouchableOpacity
                  onPress={handleResendBankOTP}
                  disabled={secondsLeft > 0}
                >
                  {depositMutation.isLoading ? (
                    <ActivityIndicator size="small" color="#F97316" />
                  ) : (
                    <NormalText
                      className={`text-center ${
                        secondsLeft > 0 ? 'text-tertiary' : 'text-primary'
                      }`}
                    >
                      {' '}
                      Gửi lại mã
                    </NormalText>
                  )}
                </TouchableOpacity>
                <NormalText
                  className={`text-center text-tertiary ${
                    secondsLeft > 0 ? 'block' : 'hidden'
                  }`}
                >
                  Còn lại {secondsLeft} giây
                </NormalText>
              </View>
              <TextButton
                text="Xác nhận"
                type={TextButtonType.PRIMARY}
                disable={otpCode.length != 6 || topupMutation.isLoading}
                loading={topupMutation.isLoading}
                onPress={() => {
                  params.type == 'deposit' &&
                    topupMutation.mutate({
                      link_account_id: params.link_account_id,
                      trans_id: params.trans_id,
                      otp: otpCode
                    })
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SharedLayout>
  )
}

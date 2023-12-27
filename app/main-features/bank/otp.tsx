/* eslint-disable indent */
import { getRegisteredPhoneNumber } from '@/api/authentication'
import {
  bankLinkAccountVerify,
  bankLinkCardVerify,
  bankLinkConfirm
} from '@/api/bank'
import { OtpInput } from '@/components/OtpInput'
import SharedLayout from '@/components/SharedLayout'
import { NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import useCountdown from '@/hooks/useCountdown'
import {
  BankLinkAccountVerifySchema,
  BankLinkCardVerifySchema,
  BankLinkConfirmSchema
} from '@/schemas/bank-schema'
import { useBankStore } from '@/stores/bankStore'
import { OtpInputRef } from '@/types/OtpInput.type'
import { formatPhoneNumber, successResponseStatus } from '@/utils/helper'
import { useMutation, useQuery } from '@tanstack/react-query'
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
  const params: { trans_id: string; bank_code: string; type: string } =
    useLocalSearchParams()
  const { cardForm, accountForm } = useBankStore()

  const otpInputRef = useRef<OtpInputRef>(null)
  const [otpCode, setOtpCode] = useState<string>('')

  const { secondsLeft, start } = useCountdown()

  useEffect(() => {
    start(60)
  }, [])

  const handleClear = () => {
    otpInputRef.current?.clear()
    setOtpCode('')
  }

  const { data: phone } = useQuery({
    queryKey: ['phoneNumber'],
    queryFn: getRegisteredPhoneNumber
  })

  const bankLinkMutation = useMutation({
    mutationFn: (data: BankLinkConfirmSchema) => bankLinkConfirm(data),
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
          text1: 'Thành công',
          text2: 'Liên kết ngân hàng thành công'
        })
        router.push('/main-features/bank/add-bank-success')
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

  const bankLinkAccountMutation = useMutation({
    mutationFn: (data: BankLinkAccountVerifySchema) =>
      bankLinkAccountVerify(data),
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

  const bankLinkCardMutation = useMutation({
    mutationFn: (data: BankLinkCardVerifySchema) => bankLinkCardVerify(data),
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

  const handleResendOTP = () => {
    if (params.type === 'CARD') {
      bankLinkAccountMutation.mutate(accountForm)
    } else {
      bankLinkCardMutation.mutate(cardForm)
    }
  }

  return (
    <SharedLayout title="Nhập mã OTP">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-4"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 pt-8 space-y-8">
            <View>
              <NormalText className="text-tertiary mt-1">
                Vui lòng nhập mã OTP 6 số vừa được gửi tới số điện thoại{' '}
                {formatPhoneNumber(phone?.data.phone_number || '')}
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
                  onPress={handleResendOTP}
                  disabled={secondsLeft > 0}
                >
                  {bankLinkAccountMutation.isLoading || bankLinkCardMutation ? (
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
                disable={otpCode.length != 6 || bankLinkMutation.isLoading}
                loading={bankLinkMutation.isLoading}
                onPress={() =>
                  bankLinkMutation.mutate({
                    bank_code: params.bank_code,
                    trans_id: params.trans_id,
                    otp: otpCode
                  })
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SharedLayout>
  )
}

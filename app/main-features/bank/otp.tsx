import { getRegisteredPhoneNumber } from '@/api/authentication'
import { bankLinkConfirm } from '@/api/bank'
import { OtpInput } from '@/components/OtpInput'
import SharedLayout from '@/components/SharedLayout'
import { NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { BankLinkConfirmSchema } from '@/schemas/bank-schema'
import { OtpInputRef } from '@/types/OtpInput.type'
import { formatPhoneNumber, successResponseStatus } from '@/utils/helper'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Toast from 'react-native-toast-message'

export default function OtpScreen() {
  const router = useRouter()
  const params: { trans_id: string; bank_code: string } = useLocalSearchParams()

  const otpInputRef = useRef<OtpInputRef>(null)
  const [otpCode, setOtpCode] = useState<string>('')

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

  return (
    <SharedLayout href="/account/home" title="Nhập mã OTP">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-4"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 pt-8 space-y-8">
            <View>
              <NormalText className="text-tertiary mt-1">
                Vui lòng nhập mã 6 số vừa được gửi tới số điện thoại{' '}
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
            </View>

            <View className="w-full mt-8 space-y-2">
              <Pressable className="mb-3" onPress={handleClear}>
                <NormalText className="text-primary text-center">
                  Xóa
                </NormalText>
              </Pressable>
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

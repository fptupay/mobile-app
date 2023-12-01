import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import TextButton from '@/components/buttons/TextButton'
import { useForgotPasswordStore } from '@/stores/accountStore'
import { useMutation } from '@tanstack/react-query'
import { confirmInfo } from '@/api/forgot-password'
import { successResponseStatus } from '@/utils/helper'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'
import { isAxiosError } from 'axios'
import TextField from '@/components/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { InfoSchema, infoResetPasswordSchema } from '@/schemas/verify-schema'
import { NormalText, SemiText } from '@/components/Themed'

export default function OTPConfirmationScreen() {
  const { credentials } = useForgotPasswordStore()
  const {
    control,
    formState: { isValid },
    getValues
  } = useForm<InfoSchema>({
    defaultValues: {
      email: '',
      card_no: '',
      date_of_birth: '',
      card_holder_name: ''
    },
    resolver: zodResolver(infoResetPasswordSchema),
    mode: 'onBlur'
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: confirmInfo,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        router.push('/authentication/forget-password/front-card-confirmation')
      } else {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      }
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: error.message
        })
      }
    }
  })

  const handleVerifyInfo = () => {
    mutate({
      ...credentials,
      email: getValues().email,
      card_no: getValues().card_no,
      date_of_birth: getValues().date_of_birth,
      card_holder_name: getValues().card_holder_name
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-4"
      >
        <StatusBar style="auto" />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            <View>
              <SemiText className="text-3xl text-left tracking-tighter text-secondary">
                Nhập mã OTP
              </SemiText>
              <NormalText className="text-tertiary mt-1">
                Vui lòng nhập mã 6 số vừa được gửi tới số điện thoại đã đăng ký
              </NormalText>
            </View>

            <View className="w-full">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="Email"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={{ fontFamily: 'Inter' }}
                    returnKeyType="next"
                    className="w-full mt-8"
                  />
                )}
              />
            </View>

            <Controller
              control={control}
              name="card_no"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="Số CCCD"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={{ fontFamily: 'Inter' }}
                  returnKeyType="next"
                  className="w-full mt-4"
                />
              )}
            />

            <View className="w-full">
              <Controller
                control={control}
                name="date_of_birth"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="Ngày sinh"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={{ fontFamily: 'Inter' }}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    className="w-full mt-4"
                  />
                )}
              />
            </View>

            <View className="w-full">
              <Controller
                control={control}
                name="card_holder_name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="Họ và tên"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={{ fontFamily: 'Inter' }}
                    returnKeyType="done"
                    className="w-full mt-4"
                  />
                )}
              />
            </View>
            <View className="w-full mt-8">
              <TextButton
                text="Xác nhận"
                type="primary"
                disable={isLoading || !isValid}
                loading={isLoading}
                onPress={handleVerifyInfo}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

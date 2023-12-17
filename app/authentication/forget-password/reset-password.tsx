import { StatusBar } from 'expo-status-bar'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { Image } from 'expo-image'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import { Controller, useForm } from 'react-hook-form'
import { PasswordSchema, passwordSchema } from '@/schemas/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { router } from 'expo-router'
import BackButton from '@/components/buttons/BackButton'
import { useForgotPasswordStore } from '@/stores/accountStore'
import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '@/api/forgot-password'
import { successResponseStatus } from '@/utils/helper'
import Toast from 'react-native-toast-message'

export default function ResetPasswordScreen() {
  const { credentials, clearCredentials } = useForgotPasswordStore()

  const [clicked, setClicked] = useState(false)
  const {
    control,
    formState: { errors, isValid },
    getValues
  } = useForm<PasswordSchema>({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(passwordSchema),
    mode: 'onBlur'
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        clearCredentials()
        Toast.show({
          type: 'success',
          text1: 'Đặt lại mật khẩu thành công'
        })
        router.replace('/')
      }
    }
  })

  const handleResetPassword = () => {
    mutate({
      ...credentials,
      new_password: getValues('password'),
      confirm_password: getValues('confirmPassword')
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="ml-4">
        <BackButton />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-4"
      >
        <StatusBar style="auto" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center items-start">
            <Image
              source={require('@/assets/images/reset-password.png')}
              className="w-[225px] h-[225px] mx-auto"
            />
            <View>
              <MediumText className="text-secondary text-3xl tracking-tighter text-left">
                Đặt lại mật khẩu
              </MediumText>
              <NormalText className="text-tertiary mt-1">
                Mật khẩu cần có ít nhất 6 ký tự, bao gồm cả chữ thường, chữ hoa
                và chữ số.
              </NormalText>
            </View>
            <View className="w-full mt-8 space-y-4">
              <View>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      label="Mật khẩu mới"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      style={{ fontFamily: 'Inter' }}
                      returnKeyType="next"
                      secureTextEntry={true}
                    />
                  )}
                />
                {errors.password && (
                  <NormalText className="text-red-500 mt-1">
                    {errors.password.message}
                  </NormalText>
                )}
              </View>
              <View>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      label="Xác nhận mật khẩu"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onFocus={() => setClicked(true)}
                      style={{ fontFamily: 'Inter' }}
                      returnKeyType="done"
                      secureTextEntry={true}
                    />
                  )}
                />
                {!isValid &&
                  (errors.confirmPassword ? (
                    <NormalText className="text-red-500 mt-1">
                      {errors.confirmPassword.message}
                    </NormalText>
                  ) : (
                    clicked && (
                      <NormalText className="text-red-500 mt-1">
                        Mật khẩu không khớp
                      </NormalText>
                    )
                  ))}
              </View>
            </View>
            <View className="w-full mt-8">
              <TextButton
                text="Xác nhận"
                disable={!isValid || isLoading}
                type={TextButtonType.PRIMARY}
                onPress={handleResetPassword}
                loading={isLoading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import { loginUser } from '@/api/authentication'
import TextField from '@/components/TextField'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import UserStatus from '@/constants/statuses'
import { LoginFormSchema, loginFormSchema } from '@/schemas/auth-schema'
import { saveToken, successResponseStatus } from '@/utils/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

export default function LoginScreen() {
  const router = useRouter()
  const passwordRef = useRef<TextInput | null>(null)

  const {
    control,
    getValues,
    formState: { errors, isValid }
  } = useForm<LoginFormSchema>({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: zodResolver(loginFormSchema),
    mode: 'onBlur'
  })

  const navigateBasedOnStatus = (status: string, username: string) => {
    switch (status) {
      case UserStatus.INIT:
        router.push({
          pathname: '/authentication/init/change-password',
          params: { username }
        })
        break
      case UserStatus.ACTIVE:
        router.push('/account/home')
        break
      case UserStatus.INACTIVE:
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: 'Tài khoản của bạn hiện chưa được kích hoạt.'
        })
        break
      case UserStatus.PENDING_CONFIRM_PHONE:
        router.push('/authentication/common/phone-confirmation')
        break
      case UserStatus.PENDING_EKYC:
        router.push('/authentication/init/ekyc/ekyc-rule')
        break
      default:
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: 'Vui lòng liên hệ đội ngũ quản trị viên.'
        })
        break
    }
  }

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormSchema) => loginUser(data),
    onSuccess: async (data) => {
      try {
        if (successResponseStatus(data)) {
          console.log(data)
          await saveToken({
            key: 'access_token',
            value: data.data.access_token
          })
          await saveToken({
            key: 'refresh_token',
            value: data.data.refresh_token
          })
          navigateBasedOnStatus(data.data.user_status, getValues('username'))
        } else {
          Toast.show({
            type: 'error',
            text1: 'Đã có lỗi xảy ra',
            text2: data.message
          })
        }
      } catch (error) {
        console.error(error)
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
    <SafeAreaView className="flex-1 items-center relative">
      <StatusBar style="auto" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 w-full px-4"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 items-center justify-center space-y-8">
            <View className="flex items-center">
              <Image
                source={require('@/assets/images/login-account.png')}
                className="w-[215px] h-[160px]"
              />
              <MediumText className="text-3xl tracking-tighter text-center text-secondary">
                Đăng nhập tài khoản{' '}
                <MediumText className="text-primary">FPTUPay</MediumText> của
                bạn{' '}
              </MediumText>
            </View>

            <View className="w-full space-y-4">
              <View>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      label="Mã sinh viên"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      style={{ fontFamily: 'Inter' }}
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                  )}
                />
                {errors.username && (
                  <NormalText className="text-red-500 mt-1">
                    {errors.username.message}
                  </NormalText>
                )}
              </View>
              <View>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      label="Mật khẩu"
                      value={value}
                      secureTextEntry={true}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      style={{ fontFamily: 'Inter' }}
                      ref={passwordRef}
                    />
                  )}
                />
                {errors.password && (
                  <NormalText className="text-red-500 mt-1">
                    {errors.password.message}
                  </NormalText>
                )}
              </View>
            </View>

            <View className="w-full mt-8 space-y-2">
              <TextButton
                onPress={() =>
                  loginMutation.mutate({
                    username: getValues('username'),
                    password: getValues('password')
                  })
                }
                text="Đăng nhập"
                type={TextButtonType.PRIMARY}
                disable={loginMutation.isLoading || !isValid}
                loading={loginMutation.isLoading}
              />
              <Link
                href="/authentication/forget-password/forget-password"
                className="text-center"
              >
                <NormalText className="text-primary">Quên mật khẩu?</NormalText>
              </Link>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

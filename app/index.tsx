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
import Toast from '@/components/Toast'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { LoginFormSchema, loginFormSchema } from '@/schemas/login-schema'
import { saveToken } from '@/utils/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import * as LocalAuthentication from 'expo-local-authentication'
import { Link, Redirect, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen() {
  const router = useRouter()
  const passwordRef = useRef<TextInput | null>(null)
  const [toast, setToast] = useState({
    visible: false,
    type: 'warning',
    label: ''
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = LocalAuthentication.authenticateAsync()
    auth
      .then((res) => {
        if (res.success) {
          setIsAuthenticated(true)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  const {
    control,
    getValues,
    formState: { errors }
  } = useForm<LoginFormSchema>({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: zodResolver(loginFormSchema),
    mode: 'onBlur'
  })

  const showToast = (type: string, label: string) => {
    setToast({ visible: true, type, label })

    setTimeout(() => {
      setToast({ visible: false, type, label })
    }, 3000)
  }

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormSchema) => loginUser(data),
    onSuccess: (data) => {
      saveToken({ key: 'access_token', value: data.data.access_token })
        .then(() => router.push('/(account)'))
        .catch((err) => console.log(err))
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        showToast('alert', error.response?.data?.message)
      }
    }
  })

  return !isAuthenticated ? (
    <SafeAreaView className="flex-1 items-center relative bg-white">
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 items-center mt-20 space-y-8">
            <View className="flex items-center">
              <Image
                source={require('@/assets/images/login-mascot.png')}
                className="w-[172px] h-[145px]"
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
                disable={loginMutation.isLoading}
                loading={loginMutation.isLoading}
              />
              <Link
                href="/(authentication)/forget-password"
                className="text-center"
              >
                <NormalText className="text-primary">Quên mật khẩu?</NormalText>
              </Link>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {toast.visible && (
        <Toast type={toast.type} label={toast.label} visible={toast.visible} />
      )}
    </SafeAreaView>
  ) : (
    <Redirect href="/(account)" />
  )
}

import { StatusBar } from 'expo-status-bar'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import { MediumText, NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { Link, useRouter } from 'expo-router'
import {
  QueryClient,
  QueryClientProvider,
  useMutation
} from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthenProps } from '@/types/Authen.type'
import { loginUser } from '@/api/authentication'
import { useState } from 'react'
import TextField from '@/components/TextField'
import { saveToken } from '@/utils/helper'

export default function LoginScreen() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <LoginComponent />
    </QueryClientProvider>
  )
}

function LoginComponent() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = (value: string) => {
    setUsername(value)
  }

  const handlePassword = (value: string) => {
    setPassword(value)
  }

  const loginMutation = useMutation((data: AuthenProps) => loginUser(data), {
    onSuccess: (data) => {
      console.log(data)
      saveToken({ key: 'access_token', value: data.data.access_token })
        .then(() => router.push('/(account)'))
        .catch((err) => console.log(err))
    },
    onError: (error: any) => {
      console.log(error)
    }
  })

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <StatusBar style="auto" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 items-center justify-center space-y-8">
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
              <TextField
                label="Mã sinh viên"
                value={username}
                onChangeText={handleUsername}
                style={{ fontFamily: 'Inter' }}
              />
              <TextField
                label="Mật khẩu"
                value={password}
                onChangeText={handlePassword}
                secureTextEntry={true}
                style={{ fontFamily: 'Inter' }}
              />
            </View>
            <View className="w-full mt-8 space-y-2">
              <TextButton
                onPress={() =>
                  loginMutation.mutate({
                    username,
                    password
                  })
                }
                text="Đăng nhập"
                type={TextButtonType.PRIMARY}
                disable={loginMutation.isLoading}
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
    </SafeAreaView>
  )
}

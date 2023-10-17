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
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import { Controller, useForm } from 'react-hook-form'
import { PasswordInitSchema, passwordInitSchema } from '@/schemas/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import BackButton from '@/components/buttons/BackButton'
import { useMutation } from '@tanstack/react-query'
import { changePasswordInit } from '@/api/authentication'
import { isAxiosError } from 'axios'
import Toast from 'react-native-toast-message'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { validResponseStatus } from '@/utils/helper'

export default function ChangePasswordScreen() {
  const router = useRouter()
  const params: { username: string } = useLocalSearchParams()
  const {
    control,
    getValues,
    formState: { errors, isValid }
  } = useForm<PasswordInitSchema>({
    defaultValues: {
      username: params.username,
      old_password: '',
      new_password: ''
    },
    resolver: zodResolver(passwordInitSchema),
    mode: 'onBlur'
  })

  const passwordMutation = useMutation({
    mutationFn: (data: PasswordInitSchema) => changePasswordInit(data),
    onSuccess: (data) => {
      console.log('success', getValues())
      if (!validResponseStatus(data)) {
        console.log('data', data)
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: data.message
        })
      } else {
        Toast.show({
          type: 'success',
          text1: 'Thành công',
          text2: 'Đặt mật khẩu mới thành công'
        })
        router.push('/authentication/common/phone-confirmation')
      }
    },
    onError: (error: Error) => {
      console.log('fail', getValues())
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
    <SafeAreaView className="flex-1">
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
                Đặt mật khẩu mới
              </MediumText>
              <NormalText className="text-tertiary mt-1">
                Mật khẩu mới cần có ít nhất 6 ký tự, bao gồm cả chữ thường, chữ
                hoa, chữ số và ký tự đặc biệt (@, #, $, %, ^, &, +, =, !)
              </NormalText>
            </View>
            <View className="w-full mt-8 space-y-4">
              <View>
                <Controller
                  control={control}
                  name="old_password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      label="Mật khẩu hiện tại"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      style={{ fontFamily: 'Inter' }}
                      returnKeyType="next"
                      secureTextEntry={true}
                    />
                  )}
                />
                {errors.old_password && (
                  <NormalText className="text-red-500 mt-1">
                    {errors.old_password.message}
                  </NormalText>
                )}
              </View>
              <View>
                <Controller
                  control={control}
                  name="new_password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      label="Mật khẩu mới"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      style={{ fontFamily: 'Inter' }}
                      returnKeyType="done"
                      secureTextEntry={true}
                    />
                  )}
                />
                {errors.new_password && (
                  <NormalText className="text-red-500 mt-1">
                    {errors.new_password.message}
                  </NormalText>
                )}
              </View>
            </View>
            <View className="w-full mt-8">
              <TextButton
                text="Xác nhận"
                disable={!isValid || passwordMutation.isLoading}
                loading={passwordMutation.isLoading}
                type={TextButtonType.PRIMARY}
                onPress={() =>
                  passwordMutation.mutate({
                    username: getValues().username,
                    old_password: getValues().old_password,
                    new_password: getValues().new_password
                  })
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
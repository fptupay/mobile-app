import { StatusBar } from 'expo-status-bar'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { Image } from 'expo-image'
import { changePasswordInit } from '@/api/authentication'
import TextField from '@/components/TextField'
import { MediumText, NormalText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { PasswordInitSchema, passwordInitSchema } from '@/schemas/auth-schema'
import { successResponseStatus } from '@/utils/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import CustomIcon from '@/components/Icon'
import { useTogglePassword } from '@/hooks/useTogglePassword'

export default function ChangePasswordScreen() {
  const router = useRouter()
  const params: { username: string } = useLocalSearchParams()
  const {
    control,
    getValues,
    watch,
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

  const { isPasswordVisible, icon, togglePassword } = useTogglePassword()

  const passwordConditions = [
    {
      isSatisfied: watch('new_password').length >= 6,
      label: 'Có ít nhất 6 ký tự'
    },
    {
      isSatisfied: /[A-Za-z]/.test(watch('new_password')),
      label: 'Có ít nhất 1 chữ cái'
    },
    {
      isSatisfied: /[0-9]/.test(watch('new_password')),
      label: 'Có ít nhất 1 chữ số'
    },
    {
      isSatisfied: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
        watch('new_password')
      ),
      label: 'Có ít nhất 1 ký tự đặc biệt'
    }
  ]

  const passwordMutation = useMutation({
    mutationFn: (data: PasswordInitSchema) => changePasswordInit(data),
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
          text2: 'Đặt mật khẩu mới thành công'
        })
        router.push('/authentication/common/phone-confirmation')
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
                Đặt mật khẩu mới
              </MediumText>
              <NormalText className="text-tertiary mt-1">
                Mật khẩu mới cần thỏa mãn những điều kiện sau:
              </NormalText>
              {passwordConditions.map((policy, index) => (
                <NormalText
                  key={index}
                  className={`text-tertiary mt-1 ${
                    policy.isSatisfied ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {policy.label}
                </NormalText>
              ))}
            </View>

            <View className="w-full mt-8 space-y-4">
              <View>
                <Controller
                  control={control}
                  name="old_password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextField
                        label="Mật khẩu hiện tại"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        secureTextEntry={isPasswordVisible}
                        style={{ fontFamily: 'Inter' }}
                        returnKeyType="next"
                      />
                      <TouchableOpacity
                        className="absolute right-2.5 top-1/3"
                        onPress={togglePassword}
                      >
                        <CustomIcon name={icon} size={24} color="#9ca3af" />
                      </TouchableOpacity>
                    </>
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
                    <>
                      <TextField
                        label="Mật khẩu mới"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        secureTextEntry={isPasswordVisible}
                        style={{ fontFamily: 'Inter' }}
                        returnKeyType="done"
                      />
                      <TouchableOpacity
                        className="absolute right-2.5 top-1/3"
                        onPress={togglePassword}
                      >
                        <CustomIcon name={icon} size={24} color="#9ca3af" />
                      </TouchableOpacity>
                    </>
                  )}
                />
              </View>
            </View>
            <View className="w-full mt-8">
              <TextButton
                text="Xác nhận"
                disable={passwordMutation.isLoading || !isValid}
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

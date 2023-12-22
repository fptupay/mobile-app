import TextField from '@/components/TextField'
import { NormalText, SemiText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import {
  VerifySchema,
  verifyResetPasswordSchema
} from '@/schemas/verify-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { StatusBar } from 'expo-status-bar'
import { Controller, useForm } from 'react-hook-form'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMutation } from '@tanstack/react-query'
import { verifyExistingAccount } from '@/api/forgot-password'
import { router } from 'expo-router'
import { useForgotPasswordStore } from '@/stores/accountStore'
import { successResponseStatus } from '@/utils/helper'
import Toast from 'react-native-toast-message'

export default function ForgetPasswordScreen() {
  const { setCredentials } = useForgotPasswordStore()

  const {
    control,
    formState: { errors, isValid },
    getValues
  } = useForm<VerifySchema>({
    defaultValues: {
      username: '',
      phone_number: ''
    },
    resolver: zodResolver(verifyResetPasswordSchema),
    mode: 'onBlur'
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: verifyExistingAccount,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        setCredentials({
          forgot_password_id: data?.data.forgot_password_id,
          username: getValues().username,
          mobile: getValues().phone_number
        })
        router.push('/authentication/forget-password/otp-confirmation')
      } else {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      }
    }
  })

  const handleVerification = () => {
    const { username, phone_number } = getValues()
    mutate({
      username: username,
      mobile: phone_number
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="ml-4">
        <BackButton href="/" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-4"
      >
        <StatusBar style="auto" />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 mt-4">
            <View>
              <SemiText className="text-3xl text-left tracking-tighter text-secondary">
                Xác nhận tài khoản
              </SemiText>
              <NormalText className="text-tertiary mt-1">
                Vui lòng nhập mã sinh viên và số điện thoại đã đăng ký để chúng
                tôi xác định tài khoản của bạn nhé!
              </NormalText>
            </View>

            <View className="w-full">
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
                    className="w-full mt-8"
                  />
                )}
              />
              {errors.username && (
                <NormalText className="text-red-500 mt-1">
                  {errors.username.message}
                </NormalText>
              )}
            </View>

            <View className="w-full">
              <Controller
                control={control}
                name="phone_number"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="Số điện thoại"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={{ fontFamily: 'Inter' }}
                    keyboardType="phone-pad"
                    returnKeyType="done"
                    className="w-full mt-4"
                  />
                )}
              />
              {errors.phone_number && (
                <NormalText className="text-red-500 mt-1">
                  {errors.phone_number.message}
                </NormalText>
              )}
            </View>
            <View className="w-full mt-8">
              <TextButton
                text="Xác nhận"
                type={TextButtonType.PRIMARY}
                onPress={handleVerification}
                loading={isLoading}
                disable={isLoading || !isValid}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

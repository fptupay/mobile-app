import TextField from '@/components/TextField'
import { MediumText, NormalText } from '@/components/Themed'
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
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMutation } from '@tanstack/react-query'
import { verifyExistingAccount } from '@/api/forgot-password'

export default function ForgetPasswordScreen() {
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

  const { mutate } = useMutation({
    mutationFn: verifyExistingAccount
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
          <View className="flex-1 justify-center items-center">
            <Image
              source={require('@/assets/images/reset-password.png')}
              className="w-[225px] h-[225px] mx-auto"
            />
            <View>
              <MediumText className="text-3xl text-left tracking-tighter text-secondary">
                Xác nhận tài khoản
              </MediumText>
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
                    returnKeyType="done"
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
                    className="w-full mt-8"
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
                disable={!isValid}
                type={TextButtonType.PRIMARY}
                onPress={handleVerification}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

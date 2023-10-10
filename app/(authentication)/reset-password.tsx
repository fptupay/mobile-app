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
import BackButton from '@/components/buttons/BackButton'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import { Controller, useForm } from 'react-hook-form'
import { PasswordSchema, passwordSchema } from '@/schemas/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function ResetPasswordScreen() {
  const {
    control,
    formState: { errors, isValid }
  } = useForm<PasswordSchema>({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(passwordSchema),
    mode: 'onBlur'
  })

  return (
    <SafeAreaView className="flex-1">
      <View className="ml-4">
        <BackButton href="/(authentication)/forget-password" />
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
                Mật khẩu cần có ít nhất 8 ký tự, bao gồm cả chữ thường, chữ hoa
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
                    <NormalText className="text-red-500 mt-1">
                      Mật khẩu không khớp
                    </NormalText>
                  ))}
              </View>
            </View>
            <View className="w-full mt-8">
              <TextButton
                text="Xác nhận"
                disable={!isValid}
                type={TextButtonType.PRIMARY}
                href="/"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

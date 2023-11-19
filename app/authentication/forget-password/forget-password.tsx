import TextField from '@/components/TextField'
import { MediumText, NormalText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { PhoneSchema, phoneSchema } from '@/schemas/phone-schema'
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

export default function ForgetPasswordScreen() {
  const {
    control,
    formState: { errors, isValid }
  } = useForm<PhoneSchema>({
    defaultValues: {
      phoneNumber: ''
    },
    resolver: zodResolver(phoneSchema),
    mode: 'onBlur'
  })

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
                Bạn quên mật khẩu?
              </MediumText>
              <NormalText className="text-tertiary mt-1">
                Vui lòng nhập số điện thoại di động để tìm kiếm tài khoản của
                bạn
              </NormalText>
            </View>
            <View className="w-full">
              <Controller
                control={control}
                name="phoneNumber"
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
              {errors.phoneNumber && (
                <NormalText className="text-red-500 mt-1">
                  {errors.phoneNumber.message}
                </NormalText>
              )}
            </View>
            <View className="w-full mt-8">
              <TextButton
                text="Xác nhận"
                disable={!isValid}
                type={TextButtonType.PRIMARY}
                href="/authentication/otp"
                previousRoute="/authentication/forget-password"
                nextRoute="/authentication/reset-password"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

import TextField from '@/components/TextField'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { PhoneSchema, phoneSchema } from '@/schemas/phone-schema'
import { zodResolver } from '@hookform/resolvers/zod'

import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PhoneConfirmationScreen() {
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
    <SafeAreaView className="flex-1 px-4">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 pt-0"
      >
        <StatusBar style="auto" />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center space-y-8">
            <Image
              source={require('@/assets/images/phone-confirmation.png')}
              className="w-[225px] h-[255px] mx-auto"
            />
            <View>
              <MediumText className="text-3xl tracking-tight text-secondary">
                Xác nhận số điện thoại
              </MediumText>
              <NormalText className="text-tertiary mt-1">
                Nhập số điện thoại của bạn
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
                    className="w-full"
                  />
                )}
              />
              {errors.phoneNumber && (
                <NormalText className="text-red-500 mt-1">
                  {errors.phoneNumber.message}
                </NormalText>
              )}
            </View>
            <View className="w-full mt-8 space-y-2">
              <TextButton
                text="Xác nhận"
                disable={!isValid}
                type={TextButtonType.PRIMARY}
                href="/authentication/common/otp"
                previousRoute="/authentication/common/phone-confirmation"
                nextRoute="/authentication/init/ekyc/ekyc-rule"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

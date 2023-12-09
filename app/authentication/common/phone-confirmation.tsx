import {
  confirmPhoneNumber,
  getRegisteredPhoneNumber
} from '@/api/authentication'
import TextField from '@/components/TextField'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { PhoneSchema, phoneSchema } from '@/schemas/verify-schema'
import { usePhoneStore } from '@/stores/phoneStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'

import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
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

export default function PhoneConfirmationScreen() {
  const { setPhone } = usePhoneStore()

  const { data: phone, isFetched } = useQuery({
    queryKey: ['phoneNumber'],
    queryFn: getRegisteredPhoneNumber
  })

  const phoneNumberMutation = useMutation({
    mutationFn: (data: PhoneSchema) => confirmPhoneNumber(data),
    onSuccess: () => {
      router.push('/authentication/common/otp')
    },
    onError: (error) => {
      console.log('error', error)
    }
  })

  const {
    control,
    getValues,
    setValue,
    formState: { errors, isValid }
  } = useForm<PhoneSchema>({
    defaultValues: {
      phone_number: ''
    },
    resolver: zodResolver(phoneSchema),
    mode: 'onBlur'
  })

  useEffect(() => {
    if (isFetched) {
      setValue('phone_number', phone?.data.phone_number)
    }
  }, [isFetched, phone])

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
                Vui lòng xác nhận số điện thoại của bạn để gửi mã OTP
              </NormalText>
            </View>
            <View className="w-full">
              <Controller
                control={control}
                name="phone_number"
                render={({ field: { onBlur, value, onChange } }) => (
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
              {errors.phone_number && (
                <NormalText className="text-red-500 mt-1">
                  {errors.phone_number.message}
                </NormalText>
              )}
            </View>
            <View className="w-full mt-8 space-y-2">
              <TextButton
                text="Xác nhận"
                disable={!isValid || phoneNumberMutation.isLoading}
                type={TextButtonType.PRIMARY}
                loading={phoneNumberMutation.isLoading}
                onPress={() => {
                  phoneNumberMutation.mutate({
                    phone_number: getValues().phone_number
                  })
                  setPhone(getValues().phone_number)
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

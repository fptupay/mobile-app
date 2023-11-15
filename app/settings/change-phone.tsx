import { StatusBar } from 'expo-status-bar'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import { MediumText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import BackButton from '@/components/buttons/BackButton'
import { useMutation } from '@tanstack/react-query'
import { changePhoneNumber } from '@/api/profile'
import { successResponseStatus } from '@/utils/helper'
import Toast from 'react-native-toast-message'
import { useState } from 'react'
import { router } from 'expo-router'
import { usePhoneStore } from '@/stores/phoneStore'

export default function ChangePhoneNumberScreen() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const setPhone = usePhoneStore((state) => state.setPhone)

  const changePhoneNumberMutation = useMutation({
    mutationFn: changePhoneNumber,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        setPhone(phoneNumber)
        router.push({
          pathname: '/authentication/common/otp',
          params: { type: 'change-phone' }
        })
      } else {
        Toast.show({
          text1: 'Có lỗi xảy ra',
          text2: data.message,
          type: 'error'
        })
      }
      console.log(data)
    }
  })

  const handleChangePhoneNumber = () => {
    changePhoneNumberMutation.mutate({
      phone_number: phoneNumber,
      password: password
    })
  }

  return (
    <SafeAreaView className="flex-1 pt-4">
      <View className="ml-4">
        <BackButton />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-4 pt-4"
      >
        <StatusBar style="auto" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-start">
            <MediumText className="text-secondary text-3xl tracking-tighter text-left">
              Đặt lại số điện thoại
            </MediumText>

            <View className="mt-4">
              <TextField
                label="Số điện thoại mới"
                value={phoneNumber}
                onChangeText={(phone) => setPhoneNumber(phone)}
                style={{ fontFamily: 'Inter' }}
                returnKeyType="next"
              />
            </View>

            <View className="mt-4">
              <TextField
                label="Mật khẩu"
                style={{ fontFamily: 'Inter' }}
                value={password}
                onChangeText={(password) => setPassword(password)}
                returnKeyType="next"
                secureTextEntry={true}
              />
            </View>

            <View className="w-full mt-8">
              <TextButton
                text="Xác nhận"
                type={TextButtonType.PRIMARY}
                onPress={handleChangePhoneNumber}
                disable={changePhoneNumberMutation.isLoading}
                loading={changePhoneNumberMutation.isLoading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

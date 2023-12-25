import { StatusBar } from 'expo-status-bar'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import TextField from '@/components/TextField'
import { useMutation } from '@tanstack/react-query'
import { changePhoneNumber } from '@/api/profile'
import { successResponseStatus } from '@/utils/helper'
import Toast from 'react-native-toast-message'
import { useRef, useState } from 'react'
import { router } from 'expo-router'
import { usePhoneStore } from '@/stores/phoneStore'
import SharedLayout from '@/components/SharedLayout'
import CustomIcon from '@/components/Icon'
import { useTogglePassword } from '@/hooks/useTogglePassword'

export default function ChangePhoneNumberScreen() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const passwordRef = useRef<TextInput | null>(null)
  const { isPasswordVisible, icon, togglePassword } = useTogglePassword()

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

  const isInvalid =
    changePhoneNumberMutation.isLoading || !phoneNumber || !password

  return (
    <SharedLayout title="Đặt lại số điện thoại">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 pt-4"
      >
        <StatusBar style="auto" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View className="mt-4">
              <TextField
                label="Số điện thoại mới"
                value={phoneNumber}
                onChangeText={(phone) => setPhoneNumber(phone)}
                style={{ fontFamily: 'Inter' }}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            </View>

            <View className="mt-4">
              <TextField
                label="Mật khẩu"
                style={{ fontFamily: 'Inter' }}
                value={password}
                secureTextEntry={isPasswordVisible}
                onChangeText={(password) => setPassword(password)}
                ref={passwordRef}
                returnKeyType="done"
              />
              <TouchableOpacity
                className="absolute right-2.5 top-1/3"
                onPress={togglePassword}
              >
                <CustomIcon name={icon} size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <View className="w-full mt-8">
              <TextButton
                text="Xác nhận"
                type={TextButtonType.PRIMARY}
                onPress={handleChangePhoneNumber}
                disable={isInvalid}
                loading={changePhoneNumberMutation.isLoading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SharedLayout>
  )
}

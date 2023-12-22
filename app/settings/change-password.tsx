import { StatusBar } from 'expo-status-bar'
import {
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
import {
  PasswordChangeSchema,
  passwordChangeSchema
} from '@/schemas/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import BackButton from '@/components/buttons/BackButton'
import { useMutation } from '@tanstack/react-query'
import { changePassword } from '@/api/profile'
import { useAccountStore } from '@/stores/accountStore'
import { Modal } from '@/components/Modal'
import { deleteToken, successResponseStatus } from '@/utils/helper'
import { logoutUser } from '@/api/authentication'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

export default function ChangePasswordScreen() {
  const [error, setError] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const {
    control,
    getValues,
    formState: { isValid }
  } = useForm<PasswordChangeSchema>({
    defaultValues: {
      username: '',
      old_password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: zodResolver(passwordChangeSchema),
    mode: 'onBlur'
  })
  const { username } = useAccountStore((store) => store.details)
  const setDetails = useAccountStore((state) => state.setDetails)

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setDetails({})
      deleteToken('access_token')
        .then(() => router.push('/'))
        .catch((err) => console.log(err))
    },
    onError: (error: any) => {
      console.log(error)
    }
  })

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        setIsVisible(true)
      } else {
        Toast.show({
          text1: 'Có lỗi xảy ra',
          text2: data.message,
          type: 'error'
        })
      }
    }
  })

  const handleChangePassword = () => {
    const newPassword = getValues('new_password')
    const confirmPassword = getValues('confirm_password')
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu không khớp')
      return
    }
    setError('')
    changePasswordMutation.mutate({
      username: username,
      old_password: getValues('old_password'),
      new_password: getValues('new_password')
    })
  }

  return (
    <>
      <SafeAreaView className="flex-1 pt-4 bg-white">
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
                Đặt lại mật khẩu
              </MediumText>

              <View className="w-full mt-8 space-y-4">
                {/* old password */}
                <View>
                  <Controller
                    control={control}
                    name="old_password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        label="Mật khẩu cũ"
                        value={value}
                        type="password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        style={{ fontFamily: 'Inter' }}
                        returnKeyType="next"
                      />
                    )}
                  />
                </View>
                <NormalText className="text-tertiary">
                  Mật khẩu cần có ít nhất 6 ký tự, bao gồm cả chữ thường, chữ
                  hoa và chữ số.
                </NormalText>
                {/* new password */}
                <View>
                  <Controller
                    control={control}
                    name="new_password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        label="Mật khẩu mới"
                        value={value}
                        type="password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        style={{ fontFamily: 'Inter' }}
                        returnKeyType="next"
                      />
                    )}
                  />
                </View>
                {/* confirm new password */}
                <View>
                  <Controller
                    control={control}
                    name="confirm_password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        label="Xác nhận mật khẩu mới"
                        value={value}
                        type="password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        style={{ fontFamily: 'Inter' }}
                        returnKeyType="done"
                      />
                    )}
                  />
                  {error && (
                    <NormalText className="text-red-500 mt-1">
                      {error}
                    </NormalText>
                  )}
                </View>
              </View>
              <View className="w-full mt-8">
                <TextButton
                  text="Xác nhận"
                  type={TextButtonType.PRIMARY}
                  onPress={handleChangePassword}
                  disable={changePasswordMutation.isLoading || !isValid}
                  loading={changePasswordMutation.isLoading}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <Modal isVisible={isVisible}>
        <Modal.Container>
          <Modal.Header title="Thông báo" />
          <Modal.Body>
            <NormalText className="text-tertiary">
              Bạn đã thay đổi mật khẩu thành công
            </NormalText>

            <View className="mt-6">
              <TextButton
                text="Hoàn thành"
                type="primary"
                onPress={logoutMutation.mutate}
                disable={logoutMutation.isLoading}
                loading={logoutMutation.isLoading}
              />
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    </>
  )
}

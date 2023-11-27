import { getUserNameByStudentCode } from '@/api/transfer'
import { Modal } from '@/components/Modal'
import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { MediumText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { useAccountStore } from '@/stores/accountStore'
import { useTransferStore } from '@/stores/transferStore'
import { successResponseStatus } from '@/utils/helper'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { router } from 'expo-router'

import React, { useState } from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import Toast from 'react-native-toast-message'

export default function TransferMoneyScreen() {
  const { studentCode, setStudentCode } = useTransferStore()
  const { full_name } = useAccountStore((state) => state.details)

  const [receiver, setReceiver] = useState<string>()
  const [error] = useState<string>()
  const [isVisible, setIsVisible] = useState(false)

  const getStudentNameMutation = useMutation(
    (code: string) => getUserNameByStudentCode(code),
    {
      onSuccess: (data) => {
        if (!successResponseStatus(data)) {
          Toast.show({
            type: 'error',
            text1: 'Đã có lỗi xảy ra',
            text2: data.message
          })
          setReceiver('')
          return
        }
        setReceiver(data.data.name)
      },
      onError: (error: AxiosError) => {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: error.message
        })
      }
    }
  )

  const handleGetStudentName = (code: string) => {
    getStudentNameMutation.mutate(code)
  }

  const handleVerifyStudent = () => {
    if (receiver === full_name) {
      setIsVisible(true)
    } else {
      router.push({
        pathname: '/transfer/transfer-amount',
        params: { studentCode: studentCode, receiver: receiver }
      } as any)
    }
  }

  return (
    <>
      <SharedLayout backHref="/transfer/transfer-list" title="Chuyển tiền tới">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="space-y-6">
            <SemiText className="mt-4">Thông tin người nhận mới</SemiText>
            <TextField
              value={studentCode}
              label="Mã sinh viên"
              errorText={error}
              onChangeText={(text) => setStudentCode(text)}
              onSubmitEditing={() => handleGetStudentName(studentCode)}
            />
            <TextField
              value={receiver}
              label="Chủ tài khoản"
              editable={false}
            />
            {getStudentNameMutation.isLoading && (
              <MediumText className="text-tertiary">
                Đang tìm kiếm...
              </MediumText>
            )}
          </View>
        </TouchableWithoutFeedback>
        <View className="mt-auto mb-4">
          <TextButton
            onPress={handleVerifyStudent}
            text="Tiếp tục"
            type="primary"
            disable={!receiver}
          />
        </View>
      </SharedLayout>
      <Modal isVisible={isVisible}>
        <Modal.Body>
          <Modal.Container>
            <Modal.Header title="Cảnh báo" />
            <MediumText className="text-tertiary mb-4">
              Tài khoản người nhận không thể trùng với tài khoản của bạn
            </MediumText>
            <TextButton
              text="Đóng"
              onPress={() => setIsVisible(false)}
              type="primary"
            />
          </Modal.Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

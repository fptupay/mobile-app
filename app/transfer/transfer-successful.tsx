import GradientBackground from '@/components/GradientBackground'
import { NormalText, SemiText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { useTransactionStore } from '@/stores/transactionStore'
import {
  WINDOW_HEIGHT,
  formatDateTime,
  formatMoney,
  successResponseStatus
} from '@/utils/helper'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Image } from 'expo-image'
import { useState } from 'react'
import { Modal } from '@/components/Modal'
import Toast from 'react-native-toast-message'
import { saveAccount } from '@/api/transfer'
import { useMutation } from '@tanstack/react-query'
import TextField from '@/components/TextField'
import { useTransferStore } from '@/stores/transferStore'
import { router } from 'expo-router'

export default function TransferSuccessfulScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [savedAccountName, setSavedAccountName] = useState('')
  const transactionDetails = useTransactionStore(
    (state) => state.transactionDetails
  )
  const { studentCode, savedStudentCodes } = useTransferStore()

  const {
    amount,
    balance,
    receiver_name,
    content,
    destination,
    transaction_time,
    transaction_id
  } = transactionDetails || {}

  const transferDetail = [
    {
      title: 'Loại thanh toán',
      content: 'Chuyển nhanh'
    },
    {
      title: 'Người nhận',
      content: receiver_name
    },
    {
      title: 'Số dư khả dụng',
      content: balance && formatMoney(balance) + ' đ'
    },
    {
      title: 'Nội dung giao dịch',
      content: content
    },
    {
      title: 'Thời gian giao dịch',
      content: transaction_time && formatDateTime(transaction_time)
    },
    {
      title: 'Mã giao dịch',
      content: transaction_id
    }
  ]

  const handleSaveAccount = () => {
    saveAccountMutation.mutate({
      name: savedAccountName,
      data: studentCode
    })
  }

  const saveAccountMutation = useMutation({
    mutationKey: ['saveAccount'],
    mutationFn: saveAccount,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        Toast.show({
          type: 'success',
          text1: 'Lưu bạn bè thành công'
        })
        setIsModalVisible(false)
        router.replace('/account/home')
      }
    }
  })

  return (
    <>
      <View className="flex-1">
        <StatusBar style="auto" />
        <View style={{ height: WINDOW_HEIGHT * 0.25 }}>
          <GradientBackground />
        </View>

        <View
          className="absolute left-0 right-0 bottom-0 bg-white flex-1 px-4 rounded-t-[30px] flex justify-start items-center"
          style={{ top: WINDOW_HEIGHT * 0.2 }}
        >
          <Image
            source={require('@/assets/images/tick-circle.png')}
            className="w-[80px] h-[80px] mx-auto mt-[-40px]"
          />
          <SemiText className="text-primary text-2xl text-center mt-4">
            Chuyển tiền thành công!
          </SemiText>
          <SemiText className="text-4xl text-secondary mt-4">
            {amount && formatMoney(amount)} đ
          </SemiText>

          <View className="w-full h-px bg-[#E1E1E1] mt-4"></View>

          <View className="mt-4 w-full">
            {transferDetail.map((item, index) => (
              <View key={index} className="flex flex-row justify-between mb-4">
                <NormalText className="text-tertiary flex-1">
                  {item.title}
                </NormalText>
                <NormalText className="text-secondary flex-1 text-right">
                  {item.content}
                </NormalText>
              </View>
            ))}
          </View>

          <View className="w-full mb-4 mt-auto" style={{ rowGap: 12 }}>
            <TextButton
              text="Về trang chủ"
              type={TextButtonType.PRIMARY}
              href="/account/home"
            />
            {savedStudentCodes.indexOf(destination) === -1 && (
              <TextButton
                text="Lưu bạn bè"
                type={TextButtonType.SECONDARY}
                onPress={() => setIsModalVisible(true)}
              />
            )}
          </View>
        </View>
      </View>

      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title="Lưu bạn bè" />
          <Modal.Body>
            <NormalText className="text-tertiary mb-4">
              Hãy lưu cho họ một cái tên dễ nhớ cho những lần chuyển tiền sau
              nhé.
            </NormalText>

            <TextField
              label="Tên tài khoản"
              value={savedAccountName}
              onChangeText={(text) => setSavedAccountName(text)}
            />

            <View className="mt-6 w-full">
              <TextButton
                text="Lưu"
                type="primary"
                onPress={handleSaveAccount}
                loading={saveAccountMutation.isLoading}
                disable={saveAccountMutation.isLoading}
              />
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    </>
  )
}

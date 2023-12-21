import { getLinkedBanks, withdrawVerify } from '@/api/bank'
import LoadingSpin from '@/components/LoadingSpin'
import SelectField from '@/components/SelectField'
import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { NormalText, SemiText } from '@/components/Themed'
import IconButton from '@/components/buttons/IconButton'
import TextButton from '@/components/buttons/TextButton'
import { BankAccountSchema, MoneyVerifySchema } from '@/schemas/bank-schema'
import { useAccountStore } from '@/stores/accountStore'
import { useBankStore } from '@/stores/bankStore'
import {
  formatInputMoney,
  formatMoney,
  getBankName,
  getDeviceId,
  successResponseStatus
} from '@/utils/helper'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react'
import {
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Platform
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useTransferStore } from '@/stores/transferStore'
import { checkStatusSmartOTP } from '@/api/otp'
import { Modal } from '@/components/Modal'

export default function WithdrawalScreen() {
  const router = useRouter()

  const [amount, setAmount] = useState('')
  const [hasRegisteredOTP, setHasRegisteredOTP] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const selectedBank = useBankStore((state) => state.selectedBank)
  const setSelectedBank = useBankStore((state) => state.setSelectedBank)
  const balance = useAccountStore((state) => state.balance)
  const setTransactionId = useTransferStore((state) => state.setTransactionId)
  const { username } = useAccountStore((state) => state.details)

  const handleAmountInput = (value: string) => {
    const formattedAmount = formatInputMoney(value)
    setAmount(formattedAmount)
  }

  const banksLinkedQuery = useQuery({
    queryKey: ['getLinkedBanks'],
    queryFn: () => getLinkedBanks(),
    onSuccess: (data) => {
      if (!successResponseStatus(data)) {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      }
    },
    onError: (error: AxiosError) => {
      Toast.show({
        type: 'error',
        text1: 'Đã có lỗi xảy ra',
        text2: error.message
      })
    }
  })

  const { mutateAsync, isLoading, isSuccess } = useMutation({
    mutationFn: checkStatusSmartOTP,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        if (data.data?.status === true) {
          setHasRegisteredOTP(true)
        } else {
          setHasRegisteredOTP(false)
        }
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const withdrawMutation = useMutation({
    mutationFn: (data: MoneyVerifySchema) => withdrawVerify(data),
    onSuccess: (data) => {
      if (!successResponseStatus(data)) {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      } else {
        setTransactionId(data?.data.trans_id)
        router.push('/transfer/pin')
      }
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: error.response?.data?.message
        })
      }
    }
  })

  const handleVerifyWithdrawal = async () => {
    const existingPIN = await SecureStore.getItemAsync(username)
    const smartOTPTransactionId = await SecureStore.getItemAsync(
      `${username}_transId` || ''
    )
    const deviceId = await getDeviceId()

    await mutateAsync({
      device_id: deviceId,
      version: Platform.Version.toString(),
      trans_id: smartOTPTransactionId
    })

    if (!existingPIN || hasRegisteredOTP === false) {
      setIsVisible(true)
    } else {
      withdrawMutation.mutate({
        link_account_id: selectedBank,
        amount: parseInt(amount.replace(/\./g, '')),
        content: 'Rút tiền từ ví FPTU Pay'
      })
    }
  }

  return (
    <>
      <SharedLayout
        backHref="/account/home"
        questionHref="/instruction/withdraw-instruction"
        title="Rút tiền"
        hasInstruction
      >
        <View className="py-4 bg-transparent flex flex-col justify-between">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 150 }}
          >
            <View className="bg-transparent">
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="bg-transparent">
                  <SemiText className="text-secondary mb-2">
                    Rút tiền từ ví FPTU Pay
                  </SemiText>

                  <View
                    className="bg-white rounded-lg my-5 mx-1 px-4 py-2"
                    style={styles.shadow}
                  >
                    <NormalText className="text-tertiary">
                      Tài khoản nguồn
                    </NormalText>
                    <SemiText className="text-2xl text-secondary">
                      {formatMoney(balance)}đ
                    </SemiText>
                  </View>

                  <TextField
                    keyboardType="numeric"
                    label="Số tiền cần rút"
                    editable={true}
                    selectTextOnFocus={true}
                    value={amount}
                    onChangeText={handleAmountInput}
                  />
                </View>
              </TouchableWithoutFeedback>

              <View className="pt-6">
                <SemiText className="text-secondary mb-2">
                  Về ngân hàng
                </SemiText>
                {banksLinkedQuery.isLoading ? (
                  <LoadingSpin />
                ) : (
                  banksLinkedQuery.data.data.map((item: BankAccountSchema) => (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.8}
                      onPress={() => setSelectedBank(item.id)}
                    >
                      <SelectField
                        image={{ uri: item.logo }}
                        id={item.id}
                        label={getBankName(item.bank_code) || 'Ngân hàng'}
                        description={item.bank_acc_hide}
                        className="mb-5"
                      />
                    </TouchableOpacity>
                  ))
                )}
                <IconButton
                  label="Thêm ngân hàng"
                  description="Miễn phí nạp, rút tiền"
                  onPress={() => router.push('/main-features/bank/add-bank')}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View className="bg-white p-4 shadow-sm shadow-tertiary absolute right-0 left-0 bottom-0">
          <TextButton
            text="Rút tiền"
            type="primary"
            onPress={handleVerifyWithdrawal}
            loading={isLoading}
            disable={selectedBank == '' || amount == '' || isLoading || isSuccess}
          />
        </View>
      </SharedLayout>

      <Modal isVisible={isVisible}>
        <Modal.Container>
          <Modal.Header title="Thông báo" />
          <Modal.Body>
            <NormalText className="text-tertiary">
              Vui lòng đăng ký phương thức xác thực Smart OTP trước khi thực
              diện giao dịch nhé!
            </NormalText>

            <View className="mt-6 flex flex-row gap-x-3">
              <View className="flex-1">
                <TextButton
                  text="Đăng ký"
                  type="primary"
                  onPress={() => router.push('/smart-otp/introduction')}
                />
              </View>
              <View className="flex-1">
                <TextButton
                  text="Đóng"
                  type="secondary"
                  onPress={() => setIsVisible(false)}
                />
              </View>
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  }
})

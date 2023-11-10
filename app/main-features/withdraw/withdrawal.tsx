import { getLinkedBanks, withdrawVerify } from '@/api/bank'
import SelectField from '@/components/SelectField'
import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { NormalText, SemiText } from '@/components/Themed'
import IconButton from '@/components/buttons/IconButton'
import TextButton from '@/components/buttons/TextButton'
import { BankAccountSchema, MoneyVerifySchema } from '@/schemas/bank-schema'
import { useAccountStore } from '@/stores/accountStore'
import { useBankStore } from '@/stores/bankStore'
import { formatMoney, getBankName, successResponseStatus } from '@/utils/helper'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Image,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Toast from 'react-native-toast-message'

export default function WithdrawalScreen() {
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const selectedBank = useBankStore((state) => state.selectedBank)
  const setSelectedBank = useBankStore((state) => state.setSelectedBank)
  const balance = useAccountStore((state) => state.balance)

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
        router.push({
          pathname: '/main-features/otp',
          params: {
            type: 'withdraw',
            link_account_id: selectedBank,
            trans_id: data.data.trans_id
          }
        })
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

  return (
    <SharedLayout href="/account/home" title="Rút tiền">
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

                <View className="bg-white rounded-lg my-4 px-4 py-2 shadow-md shadow-neutral-400">
                  <NormalText className="text-tertiary">
                    Tài khoản nguồn
                  </NormalText>
                  <SemiText className="text-2xl">
                    {formatMoney(balance)}đ
                  </SemiText>
                </View>

                <TextField
                  keyboardType="numeric"
                  label="Số tiền cần rút"
                  editable={true}
                  selectTextOnFocus={true}
                  value={amount}
                  onChangeText={(value) => setAmount(value)}
                />
              </View>
            </TouchableWithoutFeedback>

            <View className="pt-6">
              <SemiText className="text-secondary mb-2">Từ ngân hàng</SemiText>
              {banksLinkedQuery.isLoading ? (
                <NormalText className="text-secondary">Loading...</NormalText>
              ) : (
                banksLinkedQuery.data.data.map((item: BankAccountSchema) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.8}
                    onPress={() => setSelectedBank(item.id)}
                  >
                    <SelectField
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
                href="/main-features/bank/add-bank"
                previousRoute="/main-features/withdraw/withdrawal"
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View className="bg-white p-4 shadow-sm shadow-tertiary absolute right-0 left-0 bottom-0">
        <View className="bg-transparent flex flex-row gap-x-2 items-center mb-4">
          <Image
            source={require('@/assets/images/tick.png')}
            className="w-6 h-6"
          />
          <NormalText className="text-tertiary flex-1 text-xs">
            Mọi thông tin đều được mã hóa để bảo mật thông tin sinh viên.{' '}
            <NormalText className="text-primary">Tìm hiểu thêm</NormalText>
          </NormalText>
        </View>
        <TextButton
          text="Rút tiền"
          type="primary"
          onPress={() =>
            withdrawMutation.mutate({
              link_account_id: selectedBank,
              amount: parseInt(amount),
              content: 'Rút tiền từ ví FPTU Pay'
            })
          }
          loading={withdrawMutation.isLoading}
          disable={
            selectedBank == '' || amount == '' || withdrawMutation.isLoading
          }
        />
      </View>
    </SharedLayout>
  )
}
import { bankLinkAccountVerify, bankLinkCardVerify } from '@/api/bank'
import SharedLayout from '@/components/SharedLayout'
import { View } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import {
  BankLinkAccountVerifySchema,
  BankLinkCardVerifySchema,
  bankLinkAccountVerifySchema,
  bankLinkCardVerifySchema
} from '@/schemas/bank-schema'
import { successResponseStatus } from '@/utils/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import Toast from 'react-native-toast-message'
import AccountForm from './account-form'
import CardForm from './card-form'

export default function AddBankItemScreen() {
  const { code, type, name } = useLocalSearchParams()
  const router = useRouter()

  const accountForm = useForm<BankLinkAccountVerifySchema>({
    defaultValues: {
      bank_code: code as string,
      card_no: '',
      link_type: type as string
    },
    resolver: zodResolver(bankLinkAccountVerifySchema),
    mode: 'onBlur'
  })

  const cardForm = useForm<BankLinkCardVerifySchema>({
    defaultValues: {
      bank_code: code as string,
      card_no: '',
      link_type: type as string,
      issue_date: ''
    },
    resolver: zodResolver(bankLinkCardVerifySchema),
    mode: 'onBlur'
  })

  const bankLinkAccountMutation = useMutation({
    mutationFn: (data: BankLinkAccountVerifySchema) =>
      bankLinkAccountVerify(data),
    onSuccess: (data) => {
      if (!successResponseStatus(data)) {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      } else {
        router.push({
          pathname: '/main-features/bank/otp',
          params: {
            trans_id: data.data.trans_id,
            bank_code: code as string
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

  const bankLinkCardMutation = useMutation({
    mutationFn: (data: BankLinkCardVerifySchema) => bankLinkCardVerify(data),
    onSuccess: (data) => {
      if (!successResponseStatus(data)) {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      } else {
        router.push({
          pathname: '/main-features/bank/otp',
          params: {
            trans_id: data.data.trans_id,
            bank_code: code as string
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
    <SharedLayout
      backHref="/main-features/bank/add-bank"
      title={name as string}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="py-5 bg-transparent h-full flex flex-col justify-between">
          <View className="bg-transparent">
            {type == 'ACCOUNT' ? (
              <AccountForm accountForm={accountForm} />
            ) : (
              <CardForm cardForm={cardForm} />
            )}
          </View>

          <View className="bg-transparent">
            <TextButton
              onPress={() =>
                type == 'CARD'
                  ? bankLinkCardMutation.mutate(cardForm.getValues())
                  : bankLinkAccountMutation.mutate(accountForm.getValues())
              }
              text="Liên kết ngay"
              type={TextButtonType.PRIMARY}
              loading={
                bankLinkAccountMutation.isLoading ||
                bankLinkCardMutation.isLoading
              }
              disable={
                type == 'CARD'
                  ? !cardForm.formState.isValid ||
                    bankLinkCardMutation.isLoading
                  : !accountForm.formState.isValid ||
                    bankLinkAccountMutation.isLoading
              }
              previousRoute="/main-features/deposit/load-money"
              nextRoute="/main-features/bank/add-bank-success"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SharedLayout>
  )
}

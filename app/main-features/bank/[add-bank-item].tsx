import { bankLinkAccountVerify } from '@/api/bank'
import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { NormalText, SemiText, View } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import {
  BankLinkAccountVerifySchema,
  bankLinkAccountVerifySchema
} from '@/schemas/bank-schema'
import { successResponseStatus } from '@/utils/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'

import { Image, Keyboard, TouchableWithoutFeedback } from 'react-native'
import Toast from 'react-native-toast-message'

export default function AddBankItemScreen() {
  const { bank_code } = useLocalSearchParams()
  const router = useRouter()

  const {
    control,
    getValues,
    formState: { errors, isValid }
  } = useForm<BankLinkAccountVerifySchema>({
    defaultValues: {
      bank_code: bank_code as string,
      card_no: '',
      link_type: 'ACCOUNT'
    },
    resolver: zodResolver(bankLinkAccountVerifySchema),
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
            bank_code: bank_code as string
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
    <SharedLayout href="/main-features/(bank)/add-bank" title="Agribank">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="py-5 bg-transparent h-full flex flex-col justify-between">
          <View className="bg-transparent">
            <View className="bg-transparent">
              <SemiText className="text-secondary">Thông tin liên kết</SemiText>
              <Controller
                control={control}
                name="card_no"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="Số thẻ/tài khoản"
                    className="mt-5 mb-1"
                    keyboardType="numeric"
                    value={value}
                    editable={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.card_no && (
                <NormalText className="text-red-500">
                  {errors.card_no.message}
                </NormalText>
              )}
            </View>
          </View>

          <View className="bg-transparent">
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
              onPress={() => bankLinkAccountMutation.mutate(getValues())}
              text="Liên kết ngay"
              type={TextButtonType.PRIMARY}
              loading={bankLinkAccountMutation.isLoading}
              disable={!isValid || bankLinkAccountMutation.isLoading}
              previousRoute="/main-features/deposit/load-money"
              nextRoute="/main-features/bank/add-bank-success"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SharedLayout>
  )
}

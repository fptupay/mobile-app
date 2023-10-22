import { bankLinkVerify } from '@/api/bank'
import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { NormalText, SemiText, View } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import {
  BankLinkVerifySchema,
  bankLinkVerifySchema
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
  } = useForm<BankLinkVerifySchema>({
    defaultValues: {
      bank_code: bank_code as string,
      card_no: '',
      holder_name: '',
      identity: '',
      phone_number: '0972141556',
      identity_type: 'CCCD',
      link_type: 'ACCOUNT'
    },
    resolver: zodResolver(bankLinkVerifySchema),
    mode: 'onBlur'
  })

  const bankLinkMutation = useMutation({
    mutationFn: (data: BankLinkVerifySchema) => bankLinkVerify(data),
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
          params: { trans_id: data.data, bank_code: bank_code as string }
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
              <Controller
                control={control}
                name="holder_name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="Họ tên chủ thẻ"
                    className="mt-5 mb-1"
                    value={value}
                    editable={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.holder_name && (
                <NormalText className="text-red-500">
                  {errors.holder_name.message}
                </NormalText>
              )}
              <Controller
                control={control}
                name="identity"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="Số CCCD/CMND"
                    className="mt-5 mb-1"
                    keyboardType="numeric"
                    value={value}
                    editable={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.identity && (
                <NormalText className="text-red-500">
                  {errors.identity.message}
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
              onPress={() => bankLinkMutation.mutate(getValues())}
              text="Liên kết ngay"
              type={TextButtonType.PRIMARY}
              loading={bankLinkMutation.isLoading}
              disable={!isValid || bankLinkMutation.isLoading}
              previousRoute="/main-features/deposit/load-money"
              nextRoute="/main-features/bank/add-bank-success"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SharedLayout>
  )
}

import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { NormalText, SemiText, View } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { BankAccountSchema, bankAccountSchema } from '@/schemas/bank-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { Image, Keyboard, TouchableWithoutFeedback } from 'react-native'

export default function AddBankItemScreen() {
  const {
    control,
    formState: { errors, isValid }
  } = useForm<BankAccountSchema>({
    defaultValues: {
      accountNumber: ''
    },
    resolver: zodResolver(bankAccountSchema),
    mode: 'onBlur'
  })

  return (
    <SharedLayout href="/add-bank" title="Agribank">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="py-5 bg-transparent h-full flex flex-col justify-between">
          <View className="bg-transparent">
            <View className="bg-transparent">
              <SemiText className="text-secondary">Thông tin liên kết</SemiText>
              <Controller
                control={control}
                name="accountNumber"
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
              {errors.accountNumber && (
                <NormalText className="text-red-500">
                  {errors.accountNumber.message}
                </NormalText>
              )}
              <TextField
                label="Chủ thẻ"
                value="CAO QUYNH ANH"
                editable={false}
                className="mt-5"
                selectTextOnFocus={false}
              />
            </View>
          </View>

          <View className="bg-transparent">
            <View className="bg-transparent flex flex-row gap-x-2 items-center mb-4">
              <Image
                source={require('../../assets/images/tick.png')}
                className="w-6 h-6"
              />
              <NormalText className="text-tertiary flex-1 text-xs">
                Mọi thông tin đều được mã hóa để bảo mật thông tin sinh viên.{' '}
                <NormalText className="text-primary">Tìm hiểu thêm</NormalText>
              </NormalText>
            </View>
            <TextButton
              href="/(main-features)/add-money-otp"
              text="Liên kết ngay"
              type={TextButtonType.PRIMARY}
              disable={!isValid}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SharedLayout>
  )
}

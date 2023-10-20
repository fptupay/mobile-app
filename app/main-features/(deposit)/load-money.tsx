import SelectField from '@/components/SelectField'
import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { NormalText, SemiText } from '@/components/Themed'
import IconButton from '@/components/buttons/IconButton'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'

import { useBankStore } from '@/stores/bankStore'
import { useState } from 'react'
import {
  Image,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'

const listBank = [
  {
    id: 1,
    label: 'techcombank',
    description: 'Miễn phí thanh toán'
  },
  {
    id: 2,
    label: 'vietcombank',
    description: 'Miễn phí thanh toán'
  },
  {
    id: 3,
    label: 'Viettinbank',
    description: 'Miễn phí thanh toán'
  }
]

export default function LoadMoneyScreen() {
  const [amount, setAmount] = useState('')
  const selectedBank = useBankStore((state) => state.selectedBank)
  const setSelectedBank = useBankStore((state) => state.setSelectedBank)

  const handleAmountInput = (value: string) => {
    setAmount(value)
  }

  return (
    <SharedLayout href="/account/home" title="Nạp tiền">
      <View className="py-4 bg-transparent flex flex-col justify-between">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          <View className="bg-transparent">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="bg-transparent">
                <SemiText className="text-secondary">
                  Nạp tiền vào ví FPTU Pay
                </SemiText>
                <TextField
                  label="Số tiền trong ví"
                  className="my-5"
                  value="20.567.000đ"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <TextField
                  keyboardType="numeric"
                  label="Số tiền cần nạp"
                  editable={true}
                  selectTextOnFocus={true}
                  value={amount}
                  onChangeText={handleAmountInput}
                />
              </View>
            </TouchableWithoutFeedback>

            <View className="py-8 bg-transparent">
              <SemiText className="text-secondary mb-5">Từ ngân hàng</SemiText>
              {listBank.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedBank(item.label)}
                >
                  <SelectField
                    label={item.label}
                    description={item.description}
                    className="mb-5"
                  />
                </TouchableOpacity>
              ))}
              <IconButton
                label="Thêm ngân hàng"
                description="Miễn phí nạp, rút tiền"
                href="/main-features/bank/add-bank"
                previousRoute="/main-features/(deposit)/load-money"
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
          text="Nạp tiền"
          type={TextButtonType.PRIMARY}
          href="/main-features/(deposit)/deposit-confirmation"
          disable={selectedBank == '' || amount == ''}
        />
      </View>
    </SharedLayout>
  )
}

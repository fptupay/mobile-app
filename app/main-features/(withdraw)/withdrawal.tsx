import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import IconButton from '@/components/buttons/IconButton'
import TextButton from '@/components/buttons/TextButton'

import React, { useState } from 'react'
import {
  Image,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'

interface BankProps {
  id: string
  name: string
}

interface BankItemProps {
  item: BankProps
  onPress: () => void
}

export default function WithdrawalScreen() {
  const banks: BankProps[] = [
    {
      id: '1',
      name: 'MBBank'
    },
    {
      id: '2',
      name: 'Techcombank'
    },
    {
      id: '3',
      name: 'ACB'
    },
    {
      id: '4',
      name: 'ACB'
    }
  ]

  const [amount, setAmount] = useState('')
  const [selectedBankId, setSelectedBankId] = useState<string>('')

  const BankItem = ({ item, onPress }: BankItemProps) => {
    const borderColor =
      selectedBankId === item.id ? 'border-primary' : 'border-gray-300'
    return (
      <TouchableOpacity
        activeOpacity={1}
        className={`border rounded-lg p-4 flex flex-row items-center justify-between mb-5 ${borderColor}`}
        onPress={onPress}
      >
        <View className="flex-row items-center gap-3">
          <Image source={require('@/assets/images/techcombank.png')} />
          <View>
            <MediumText className="text-secondary capitalize">
              {item.name}
            </MediumText>
            <NormalText className="text-tertiary">
              Miễn phí thanh toán
            </NormalText>
          </View>
        </View>
        {selectedBankId === item.id ? (
          <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
            <View className="w-3 h-3 rounded-full bg-white" />
          </View>
        ) : null}
      </TouchableOpacity>
    )
  }

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
              {banks.map((item) => (
                <BankItem
                  key={item.id}
                  item={item}
                  onPress={() => setSelectedBankId(item.id)}
                />
              ))}
              <IconButton
                label="Thêm ngân hàng"
                description="Miễn phí nạp, rút tiền"
                href="/main-features/bank/add-bank"
                previousRoute="/main-features/(withdraw)/withdrawal"
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
          href="/main-features/(withdraw)/withdraw-confirmation"
          disable={selectedBankId == '' || amount == ''}
        />
      </View>
    </SharedLayout>
  )
}

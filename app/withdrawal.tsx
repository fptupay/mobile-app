import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'

import React, { useState } from 'react'
import {
  FlatList,
  Image,
  Keyboard,
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

export default function Home() {
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
    }
  ]
  const [value, setValue] = useState('')
  const [error] = useState('')

  const BankItem = ({ item, onPress }: BankItemProps) => {
    const borderColor =
      selectedBankId === item.id ? 'border-primary' : 'border-gray-300'
    return (
      <TouchableOpacity
        activeOpacity={1}
        className={`border rounded-lg px-4 py-2 flex flex-row items-center justify-between mb-4 ${borderColor}`}
        onPress={onPress}
      >
        <View className="flex-row items-center gap-x-2">
          <CustomIcon name="Landmark" size={24} color="#0F172A" />
          <View>
            <MediumText>{item.name}</MediumText>
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

  const [selectedBankId, setselectedBankId] = useState<string>()

  const renderedBankItem = ({ item }: { item: BankProps }) => (
    <BankItem item={item} onPress={() => setselectedBankId(item.id)} />
  )

  return (
    <SharedLayout href="/(account)" title="Rút tiền">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <SemiText className="my-4">Rút tiền từ FPTUPay</SemiText>
          <TextField
            value={value}
            label="Số tiền cần rút"
            errorText={error}
            onChangeText={(text) => setValue(text)}
          />
        </View>
      </TouchableWithoutFeedback>
      <View className="flex-1 mt-8">
        <SemiText className="mb-4">Đến ngân hàng</SemiText>
        <FlatList
          className="flex-grow-0 h-60"
          data={banks}
          keyExtractor={(item) => item.id}
          renderItem={renderedBankItem}
          showsVerticalScrollIndicator={false}
        />
        <View className="border border-gray-300 rounded-lg px-4 py-2 flex flex-row justify-between items-center mb-4">
          <View className="flex flex-row items-center">
            <CustomIcon name="PlusCircle" size={24} color="#0F172A" />
            <View className="ml-2">
              <MediumText className="text-black">Thêm ngân hàng</MediumText>
              <NormalText className="text-tertiary">
                Miễn phí nạp, rút tiền
              </NormalText>
            </View>
          </View>
          <CustomIcon name="ChevronRight" size={24} color="#000" />
        </View>
        <View>
          <View className="flex flex-row gap-x-2 items-center mb-4">
            <Image
              source={require('@/assets/images/tick.png')}
              className="w-6 h-6"
            />
            <NormalText className="text-tertiary flex-1 text-xs">
              Mọi thông tin đều được mã hóa để bảo mật thông tin sinh viên.{' '}
              <NormalText className="text-primary">Tìm hiểu thêm</NormalText>
            </NormalText>
          </View>
          <TextButton href="/" text="Rút tiền" type="primary" />
        </View>
      </View>
    </SharedLayout>
  )
}

import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { NormalText, SemiText, View } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { useState } from 'react'

import { Image, Keyboard, TouchableWithoutFeedback } from 'react-native'

export default function AddBankItemScreen() {
  const [accountId, setAccountId] = useState('')
  const [accountName, setAccountName] = useState('')

  return (
    <SharedLayout href="/load-money" title="Agribank">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="pt-5 py-10 bg-transparent h-full flex flex-col justify-between">
          <View className="bg-transparent">
            <View className="bg-transparent">
              <SemiText className="text-secondary">Thông tin liên kết</SemiText>
              <TextField
                label="Số thẻ/tài khoản"
                className="my-5"
                keyboardType="numeric"
                value={accountId}
                editable={true}
                onChangeText={(text) => setAccountId(text)}
              />
              <TextField
                label="Chủ thẻ"
                value={accountName}
                editable={true}
                onChangeText={(text) => setAccountName(text)}
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
              href="/add-money-otp"
              text="Liên kết ngay"
              type={TextButtonType.PRIMARY}
              disable={accountId.length === 0 || accountName.length === 0}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SharedLayout>
  )
}

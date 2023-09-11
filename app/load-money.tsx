import SelectField from '@/components/SelectField'
import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import IconButton from '@/components/buttons/IconButton'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'

import { RouteProp, useRoute } from '@react-navigation/native'
import { BlurView } from 'expo-blur'
import { useState } from 'react'
import { Image, Modal, TouchableOpacity, View } from 'react-native'
import { AddBankRouteParams } from './add-bank'

export default function LoadMoney() {
  const route =
    useRoute<RouteProp<Record<string, AddBankRouteParams>, string>>()
  const [amount, setAmount] = useState('')
  const setDepositSuccessful = route.params?.setDepositSuccessful || false
  const [depositSuccessfulVisible] = useState(true)
  const [, setIsModalVisible] = useState(false)

  const handleAmountInput = (value: string) => {
    setAmount(value)
  }

  return (
    <SharedLayout href="/(account)" title="Nạp tiền">
      <View className="pt-5 py-10 bg-transparent  flex flex-col justify-between">
        <View className="bg-transparent">
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
              label="Số tiền cần nạp"
              editable={true}
              selectTextOnFocus={true}
              value={amount}
              onChangeText={handleAmountInput}
            />
          </View>
          <View className="py-8 bg-transparent">
            <SemiText className="text-secondary mb-5">Từ ngân hàng</SemiText>
            <SelectField
              label="techcombank"
              description="Miễn phí thanh toán"
              className="mb-5"
            />
            <IconButton
              label="Thêm ngân hàng"
              description="Miễn phí nạp, rút tiền"
              href="/add-bank"
            />
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
          <TouchableOpacity>
            <TextButton
              text="Thanh toán"
              type={TextButtonType.PRIMARY}
              href="(main-features)/add-bank-item"
            />
          </TouchableOpacity>
        </View>
      </View>
      {setDepositSuccessful && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={depositSuccessfulVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <BlurView intensity={10} style={{ flex: 1 }}>
            <View className="flex-1 justify-end mb-16 px-4">
              <View className="bg-white w-full h-[400px] rounded-lg border-[#dfac87] border-2">
                <Image
                  source={require('@/assets/images/deposit.gif')}
                  className="w-[220px] h-[160px] mx-auto"
                />
                <MediumText className="text-2xl tracking-tight text-center">
                  Nạp tiền thành công!
                </MediumText>

                <View className="w-full top-12 px-4">
                  <TextButton
                    text="Tạo giao dịch mới"
                    type={TextButtonType.PRIMARY}
                    href="/load-money"
                  />
                </View>
                <View className="w-full top-12 mt-2 px-4 pb-4">
                  <TextButton
                    text="Về màn hình chính"
                    type={TextButtonType.SECONDARY}
                    href="/(account)"
                  />
                </View>
              </View>
            </View>
          </BlurView>
        </Modal>
      )}
    </SharedLayout>
  )
}

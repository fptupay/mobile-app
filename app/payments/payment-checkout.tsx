import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { IconProps } from '@/types/Icon.type'
import { formatMoney } from '@/utils/helper'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Modal, Switch, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

interface PaymentItemProps {
  title?: string
  icon: IconProps['name']
  amount: number
}

export default function PaymentCheckoutScreen() {
  const router = useRouter()

  const [isEnabled, setIsEnabled] = useState(true)
  const [depositSuccessfulVisible, setDepositSuccessfulVisible] =
    useState(false)
  const [currentBalance] = useState(20567000)
  const totalPayment = 3000000
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  const handleCheckSufficientAmount = () => {
    if (currentBalance < totalPayment) {
      setDepositSuccessfulVisible(true)
    }
    router.push('/main-features/otp')
  }

  const paymentItems: PaymentItemProps[] = [
    {
      title: 'Học phí kỳ tiếp',
      icon: 'GraduationCap',
      amount: 2000000
    },
    {
      title: 'Đăng ký học',
      icon: 'Book',
      amount: 1000000
    },
    {
      title: 'Ký túc xá',
      icon: 'Home',
      amount: 50000
    },
    {
      title: 'Các khoản phí khác',
      icon: 'MoreHorizontal',
      amount: 1000000
    },
    {
      title: 'Các khoản phí khác',
      icon: 'MoreHorizontal',
      amount: 1000000
    },
    {
      title: 'Các khoản phí khác',
      icon: 'MoreHorizontal',
      amount: 1000000
    }
  ]

  const RenderedPaymentItems = ({ item }: { item: PaymentItemProps }) => {
    return (
      <View className="px-4 py-2 my-2 rounded-lg flex flex-row items-center justify-between border border-gray-300">
        <View className="flex-row flex justify-start items-center">
          <CustomIcon name={item.icon} size={24} color="#000" />
          <View className="ml-2 w-2/3">
            <SemiText className="text-secondary">{item.title}</SemiText>
            <NormalText
              className="text-tertiary mt-1"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.title}
            </NormalText>
          </View>
        </View>
        <View className="ml-auto">
          <SemiText className="text-secondary capitalize">
            {formatMoney(item.amount)}đ
          </SemiText>
        </View>
      </View>
    )
  }

  return (
    <SharedLayout href="/account" title="Thanh toán">
      <View className="py-5 h-full flex flex-col justify-between">
        <View className="flex flex-row justify-between items-baseline border-b border-gray-300 pb-4">
          <NormalText className="text-secondary">
            Tổng tiền phải đóng
          </NormalText>
          <SemiText className="text-primary text-xl">
            {formatMoney(totalPayment)}đ
          </SemiText>
        </View>

        <FlatList
          data={paymentItems}
          renderItem={({ item }) => <RenderedPaymentItems item={item} />}
          showsVerticalScrollIndicator={false}
          className="my-4"
        />

        <View className="border-t border-gray-300 pt-4">
          <View className="flex flex-row justify-between items-center">
            <NormalText>Số dư hiện tại</NormalText>
            <View>
              <MediumText className="text-secondary ">
                {formatMoney(currentBalance)}đ
              </MediumText>
            </View>
          </View>
          <View className="flex flex-row justify-between items-center mb-4">
            <NormalText>Sử dụng số dư trong ví</NormalText>
            <Switch
              trackColor={{ false: '#666', true: '#F97316' }}
              thumbColor="#FFF"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <TextButton
            onPress={handleCheckSufficientAmount}
            text="Thanh toán"
            type={TextButtonType.PRIMARY}
          />
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={depositSuccessfulVisible}
        onRequestClose={() => setDepositSuccessfulVisible(false)}
      >
        <BlurView intensity={10} style={{ flex: 1 }}>
          <View className="flex-1 justify-center mb-16 p-4">
            <View className="bg-white w-full h-[200px] rounded-lg border-gray-200 border-2">
              <NormalText className="tracking-tight text-center p-5">
                Rất tiếc, giao dịch không thể thực hiện vì bạn không có đủ tiền
                trong ví. Hãy nạp thêm tiền vào tài khoản nhé.
              </NormalText>
              <View className="flex-row px-4">
                <View className="flex-1">
                  <TextButton
                    text="Huỷ"
                    type={TextButtonType.SECONDARY}
                    href="/account/payments"
                  />
                </View>
                <View className="flex-1 ml-4">
                  <TextButton
                    text="Nạp tiền"
                    type={TextButtonType.PRIMARY}
                    href="/load-money"
                  />
                </View>
              </View>
            </View>
          </View>
        </BlurView>
      </Modal>
    </SharedLayout>
  )
}

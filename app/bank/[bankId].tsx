import { View, Modal, ScrollView, Pressable } from 'react-native'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import { EyeOff, Eye } from 'lucide-react-native'
import Colors from '@/constants/Colors'
import { BlurView } from 'expo-blur'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import DescriptionRowItem, {
  ListItemProp
} from '@/components/DescriptionRowItem'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unlinkBank } from '@/api/bank'
import { successResponseStatus } from '@/utils/helper'
import Toast from 'react-native-toast-message'
import { isAxiosError } from 'axios'

const mockPersonalData: ListItemProp[] = [
  {
    label: 'Chủ thẻ',
    description: 'NGUYEN QUANG HUNG'
  },
  {
    label: 'Ngày liên kết',
    description: '01/01/2023'
  }
]

const mockCardData = [
  {
    label: 'Nạp tiền tối thiểu',
    description: '10.000đ'
  },
  {
    label: 'Nạp tiền tối đa',
    description: '5.000.000đ'
  },
  {
    label: 'Rút tiền tối thiểu',
    description: '10.000đ'
  },
  {
    label: 'Rút tiền tối đa',
    description: '5.000.000đ'
  }
]

export default function BankDetailScreen() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const params: { bankId: any } = useLocalSearchParams()
  const [isModalVisible, setModalVisible] = useState(false)
  const [isBalanceVisible, setBalanceVisible] = useState(false)

  const handleTextButtonClick = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const handleCancelLink = () => {
    setModalVisible(false)
  }

  const bankLinkMutation = useMutation({
    mutationFn: (data: string) => unlinkBank(data),
    onSuccess: async (data) => {
      if (!successResponseStatus(data)) {
        closeModal()
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      } else {
        Toast.show({
          type: 'success',
          text1: 'Thành công',
          text2: 'Hủy liên kết ngân hàng thành công!'
        })
        await queryClient.invalidateQueries(['getLinkedBanks'])
        router.back()
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
    <SharedLayout backHref="/bank/bank-list" title="Thông tin liên kết">
      <View className="py-4 bg-transparent flex-1 flex-col justify-between">
        <View className="bg-transparent">
          <View className=" w-full h-[225px] bg-primary relative p-3 rounded-lg">
            <View className="absolute flex flex-row justify-between items-center p-3">
              <Image
                source={require('@/assets/images/techcombank.png')}
                className=" h-10 w-10 mx-auto"
              />
              <MediumText className="tracking-tight text-center text-white ml-3 text-xl">
                Agribank
              </MediumText>
            </View>
            <View className="absolute flex flex-row items-center right-0 p-3 bottom-0">
              {isBalanceVisible ? (
                <MediumText className="tracking-tight text-white ml-3 text-lg">
                  1903 6280 1234
                </MediumText>
              ) : (
                <MediumText className="tracking-tight text-white ml-3 text-lg">
                  **** **** 1234
                </MediumText>
              )}
              <Pressable onPress={() => setBalanceVisible(!isBalanceVisible)}>
                {isBalanceVisible ? (
                  <Eye size={20} color={Colors.white} className="ml-2" />
                ) : (
                  <EyeOff size={20} color={Colors.white} className="ml-2" />
                )}
              </Pressable>
            </View>
          </View>
        </View>
        <ScrollView className="pt-6">
          <SemiText className="text-secondary pb-2">Thông tin cơ bản</SemiText>
          {mockPersonalData.map((item) => (
            <DescriptionRowItem
              key={item.label}
              label={item.label}
              description={item.description}
            />
          ))}
          <SemiText className="text-secondary pb-2 pt-6">
            Hạn mức giao dịch
          </SemiText>
          {mockCardData.map((item) => (
            <DescriptionRowItem
              key={item.label}
              label={item.label}
              description={item.description}
            />
          ))}
        </ScrollView>
      </View>
      <View className="bg-white p-4 shadow-sm shadow-tertiary absolute right-0 left-0 bottom-0">
        <TextButton
          text="Huỷ liên kết"
          type="primary"
          onPress={handleTextButtonClick}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <BlurView
          intensity={15}
          style={{ flex: 1, backgroundColor: 'rgba(80, 80, 80, 0.80)' }}
        >
          <View className="flex-1 justify-center px-4">
            <View className="bg-white rounded-lg shadow-2xl p-4">
              <MediumText className="text-xl tracking-tight text-primary mb-2">
                Huỷ liên kết
              </MediumText>
              <NormalText className="text-tertiary mb-8">
                Bạn có chắc chắn muốn huỷ liên kết với ngân hàng này?
              </NormalText>
              <View className="flex flex-row gap-x-2 justify-between text-center">
                <View className="flex-1">
                  <TextButton
                    text="Không"
                    type={TextButtonType.SECONDARY}
                    onPress={handleCancelLink}
                  />
                </View>
                <View className="flex-1">
                  <TextButton
                    text="Có"
                    type={TextButtonType.PRIMARY}
                    loading={bankLinkMutation.isLoading}
                    disable={bankLinkMutation.isLoading}
                    onPress={() => bankLinkMutation.mutate(params.bankId)}
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

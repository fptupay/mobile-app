import { View, Modal, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText } from '@/components/Themed'
import { BlurView } from 'expo-blur'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import DescriptionRowItem, {
  ListItemProp
} from '@/components/DescriptionRowItem'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getLinkedBanks, unlinkBank } from '@/api/bank'
import { formatDateTime, successResponseStatus } from '@/utils/helper'
import Toast from 'react-native-toast-message'
import { isAxiosError } from 'axios'
import { useAccountStore } from '@/stores/accountStore'
import LoadingSpin from '@/components/LoadingSpin'

const mockCardData = [
  {
    label: 'Nạp tiền tối thiểu',
    description: '10.000 đ'
  },
  {
    label: 'Nạp tiền tối đa',
    description: '100.000.000 đ'
  },
  {
    label: 'Rút tiền tối thiểu',
    description: '50.000 đ'
  },
  {
    label: 'Rút tiền tối đa',
    description: '200.000.000 đ'
  }
]

type BankItemProp = {
  id: string
  code: string
  name: string
  short_name: string
  bank_code: string
  status: string
  display_order: number
  is_direct: boolean
  logo: any
  link_note: string | null
  create_link: string | null
}

export default function BankDetailScreen() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { details } = useAccountStore()

  const params: { bankId: any } = useLocalSearchParams()
  const [isModalVisible, setModalVisible] = useState(false)

  const handleTextButtonClick = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const handleCancelLink = () => {
    setModalVisible(false)
  }

  const { data: banks, isFetched } = useQuery({
    queryKey: ['getLinkedBanks', params.bankId],
    queryFn: getLinkedBanks
  })

  const getBankById = (id: any) => {
    return banks?.data?.find((item: BankItemProp) => item.id === params.bankId)
  }

  const mockPersonalData: ListItemProp[] = [
    {
      label: 'Chủ thẻ',
      description: details.full_name
    },
    {
      label: 'Ngày liên kết',
      description:
        isFetched && formatDateTime(getBankById(params.bankId)?.created_at)
    }
  ]

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
      {!isFetched ? (
        <LoadingSpin />
      ) : (
        <>
          <View className=" w-full h-[210px] bg-primary/80  relative mt-4 rounded-lg">
            <View className="absolute flex flex-row justify-between items-center p-3">
              <Image
                source={{ uri: getBankById(params.bankId)?.logo }}
                className=" h-10 w-10 mx-auto"
              />
              <MediumText className="tracking-tight text-white ml-3 text-lg">
                {getBankById(params.bankId)?.bank_name}
              </MediumText>
            </View>
            <View className="absolute flex flex-row items-center right-0 p-3 bottom-0">
              <MediumText className="tracking-tight text-white ml-3 text-lg">
                {getBankById(params.bankId)?.bank_acc_hide}
              </MediumText>
            </View>
          </View>
          <ScrollView className="pt-4" showsVerticalScrollIndicator={false}>
            <MediumText className="text-secondary pb-2">
              Thông tin cơ bản
            </MediumText>
            {mockPersonalData.map((item) => (
              <DescriptionRowItem
                key={item.label}
                label={item.label}
                description={item.description}
              />
            ))}
            <MediumText className="text-secondary pb-2 pt-4">
              Hạn mức giao dịch
            </MediumText>
            {mockCardData.map((item) => (
              <DescriptionRowItem
                key={item.label}
                label={item.label}
                description={item.description}
              />
            ))}

            <View className="mb-8">
              <TextButton
                text="Huỷ liên kết"
                type="outlined"
                onPress={handleTextButtonClick}
              />
            </View>
          </ScrollView>
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
        </>
      )}
    </SharedLayout>
  )
}

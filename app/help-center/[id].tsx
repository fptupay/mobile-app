import { Modal } from '@/components/Modal'
import SharedLayout from '@/components/SharedLayout'
import { NormalText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { getImagePath, getTitle } from '@/utils/helper'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Image } from 'expo-image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { closeSupportRequest, getSupportRequestDetail } from '@/api/help-center'
import Toast from 'react-native-toast-message'
import LoadingSpin from '@/components/LoadingSpin'

export default function RequestDetailScreen() {
  const request = useLocalSearchParams()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const queryClient = useQueryClient()
  const { data: details, isLoading } = useQuery({
    queryKey: ['supportDetails', request.id],
    queryFn: () => getSupportRequestDetail(request.id as string)
  })
  console.log(
    '🚀 ~ file: [id].tsx:24 ~ RequestDetailScreen ~ details:',
    details?.data
  )

  const supportDetails = [
    {
      key: 'Tiêu đề',
      value: details?.data?.title
    },
    {
      key: 'Loại yêu cầu',
      value: details?.data?.type === 'TRANSACTION' ? 'Lỗi giao dịch' : 'Khác'
    },
    {
      key: 'Mã giao dịch',
      value:
        details?.data?.type === 'TRANSACTION'
          ? details?.data?.transaction_id
          : undefined
    },
    {
      key: 'Thời gian tạo',
      value: details?.data?.created_at
    },
    {
      key: 'Mã yêu cầu',
      value: details?.data?.id
    },
    {
      key: 'Nội dung yêu cầu',
      value: details?.data?.description
    },
    {
      key: 'Ảnh đính kèm',
      value: details?.data?.images[0]
    },
    {
      key: 'Phản hồi',
      value: details?.data?.note
    }
  ]

  const filteredSupportDetails = supportDetails.filter(
    (item) => item.value !== undefined
  )

  const closeRequestMutation = useMutation({
    mutationKey: ['closeRequest', request.id],
    mutationFn: () => closeSupportRequest(request.id as string),
    onSuccess: async () => {
      setIsModalVisible(false)
      Toast.show({
        type: 'success',
        text1: 'Đóng yêu cầu thành công'
      })
      await queryClient.invalidateQueries(['requests'])
      router.replace('/account/help-center')
    }
  })

  console.log(details)

  const handleCloseSupportRequest = () => {
    closeRequestMutation.mutate()
  }

  const handleOpenModal = () => {
    setIsModalVisible(true)
  }

  return (
    <>
      <SharedLayout title="" backHref="/account/help-center">
        <View className="mt-12 relative">
          <View className="absolute -top-20 left-0 right-0 justify-center items-center">
            <View className="w-16 h-16 rounded-full bg-slate-50 shadow-md p-1">
              <Image
                source={getImagePath(details?.data?.status)}
                className="w-full h-full"
              />
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="mb-4">
            <SemiText className="text-center text-lg text-secondary">
              {getTitle(details?.data.status)}
            </SemiText>
            <View className="h-[1px] mt-4 w-full mx-auto bg-gray-200" />
            <SemiText className="mt-4 text-secondary">
              Chi tiết yêu cầu
            </SemiText>
            {isLoading ? (
              <View className="flex-1 items-center justify-center">
                <LoadingSpin />
              </View>
            ) : (
              <View className="my-4">
                <View className="flex space-y-4">
                  {filteredSupportDetails.map((item: any) => (
                    <View className="flex-row justify-between" key={item.key}>
                      <NormalText className="text-tertiary">
                        {item.key}
                      </NormalText>
                      {item.key === 'Ảnh đính kèm' ? (
                        <View className="flex flex-row justify-end">
                          <Image
                            source={{
                              uri: item.value
                            }}
                            transition={200}
                            className="w-[72px] h-[72px]"
                          />
                        </View>
                      ) : (
                        <NormalText className="flex-1 text-right text-secondary">
                          {item.value}
                        </NormalText>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
        {details?.data.status === 'PROCESSING' && (
          <View className="mt-auto mb-4">
            <TextButton
              text="Đóng yêu cầu"
              type="primary"
              onPress={handleOpenModal}
            />
          </View>
        )}
      </SharedLayout>

      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title="Đóng yêu cầu" />
          <Modal.Body>
            <NormalText className="text-tertiary">
              Yêu cầu của bạn đang được xử lý. Bạn có chắc chắn muốn đóng không?
            </NormalText>

            <View className="mt-6 flex flex-row gap-x-3">
              <View className="flex-1">
                <TextButton
                  text="Không"
                  type="secondary"
                  onPress={() => setIsModalVisible(false)}
                />
              </View>
              <View className="flex-1">
                <TextButton
                  text="Có"
                  type="primary"
                  onPress={handleCloseSupportRequest}
                  loading={closeRequestMutation.isLoading}
                  disable={closeRequestMutation.isLoading}
                />
              </View>
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    </>
  )
}

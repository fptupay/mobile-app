import { Modal } from '@/components/Modal'
import SharedLayout from '@/components/SharedLayout'
import { NormalText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { getImagePath, getTitle } from '@/utils/helper'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Image } from 'expo-image'
import { useQuery } from '@tanstack/react-query'
import { getSupportRequestDetail } from '@/api/help-center'

export default function RequestDetailScreen() {
  const request = useLocalSearchParams()
  console.log(request)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { data: details } = useQuery({
    queryKey: ['supportDetails', request.id],
    queryFn: () => getSupportRequestDetail(request.id as string)
  })

  const supportDetails = [
    {
      key: 'Loại yêu cầu',
      value: details?.data?.type === 'TRANSACTION' ? 'Lỗi giao dịch' : 'Khác'
    },
    {
      key: 'Mã giao dịch',
      value: details?.data?.transaction_id
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
      key: 'Phản hồi',
      value: ''
    }
  ]

  const handleOpenModal = () => {
    setIsModalVisible(true)
  }

  console.log(request.status)

  return (
    <>
      <SharedLayout title="" href="/help-center">
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
            <SemiText className="text-center text-lg">
              {getTitle(details?.data.status)}
            </SemiText>
            <View className="h-[1px] mt-4 w-full mx-auto bg-gray-200" />
            <SemiText>Chi tiết yêu cầu</SemiText>
            <View className="my-4">
              <View className="mt-2 flex space-y-4">
                {supportDetails.map((item: any) => (
                  <View className="flex-row justify-between" key={item.key}>
                    <NormalText className="text-tertiary">
                      {item.key}
                    </NormalText>
                    <NormalText className="flex-1 text-right">
                      {item.value}
                    </NormalText>
                  </View>
                ))}
              </View>
            </View>
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
                <TextButton text="Có" type="primary" />
              </View>
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    </>
  )
}

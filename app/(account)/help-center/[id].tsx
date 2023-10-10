import { Modal } from '@/components/Modal'
import SharedLayout from '@/components/SharedLayout'
import { NormalText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { getBackGroundColor, getImagePath, getTitle } from '@/utils/helper'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, View } from 'react-native'

export default function RequestDetailScreen() {
  const request = useLocalSearchParams()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleOpenModal = () => {
    setIsModalVisible(true)
  }

  return (
    <>
      <SharedLayout title="" href="/help-center">
        <View className="mt-12 relative">
          <View className="absolute -top-20 left-0 right-0 justify-center items-center">
            <View
              className={`w-16 h-16 rounded-full ${getBackGroundColor(
                request.status
              )} p-1`}
            >
              <Image
                source={getImagePath(request.status)}
                className="w-full h-full"
              />
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="mb-4">
            <SemiText className="text-center text-lg">
              {getTitle(request.status)}
            </SemiText>
            <View className="h-[1px] mt-4 w-full mx-auto bg-gray-200" />
            <View className="my-4">
              <SemiText>Chi tiết yêu cầu</SemiText>
              <View className="mt-2 flex space-y-4">
                <View className="flex-row justify-between">
                  <NormalText className="text-tertiary">
                    Loại yêu cầu
                  </NormalText>
                  <NormalText>Lỗi giao dịch</NormalText>
                </View>
                <View className="flex-row justify-between">
                  <NormalText className="text-tertiary">
                    Mã sinh viên
                  </NormalText>
                  <NormalText>HE160005</NormalText>
                </View>
                <View className="flex-row justify-between">
                  <NormalText className="text-tertiary">
                    Thời gian gửi
                  </NormalText>
                  <NormalText>09:10 - 04/10/2023</NormalText>
                </View>
                <View className="flex-row justify-between">
                  <NormalText className="text-tertiary">Mã yêu cầu</NormalText>
                  <NormalText>1234567</NormalText>
                </View>
                <View>
                  <NormalText className="text-tertiary">
                    Nội dung yêu cầu
                  </NormalText>
                  <NormalText>
                    Em là Hà Gia Kính, MSSV: HE150111. Vào 20:04 ngày
                    01/01/2023, em có chuyển nhầm cho Phạm Quang Hưng (MSSV:
                    HE151111) 10.000đ...
                  </NormalText>
                </View>
                <View>
                  <NormalText className="text-tertiary">Phản hồi</NormalText>
                  <NormalText>Em đến Dịch vụ Sinh viên 102L nhé!</NormalText>
                </View>
              </View>
            </View>
          </ScrollView>

          {request.status === 'pending' && (
            <View className="mt-auto">
              <TextButton
                text="Đóng yêu cầu"
                type="primary"
                onPress={handleOpenModal}
              />
            </View>
          )}
        </View>
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

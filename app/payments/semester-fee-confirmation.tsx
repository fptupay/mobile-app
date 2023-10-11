import { Modal } from '@/components/Modal'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { convertNumberToVietnameseWords } from '@/utils/helper'
import React, { useState } from 'react'
import { Image, View } from 'react-native'

export default function SemesterFeeConfirmationScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
      <SharedLayout title="Xác nhận thông tin" href="/payments">
        <View className="mt-4 flex items-center">
          <NormalText className="text-tertiary">Số tiền nộp</NormalText>
          <SemiText className="text-4xl mt-2">28.500.000đ</SemiText>
        </View>

        <View className="bg-zinc-50 rounded-lg mt-4 p-2 space-y-4 shadow-md shadow-zinc-500">
          {/* Origin */}
          <View>
            <NormalText className="text-tertiary">Từ tài khoản</NormalText>
            <View className="flex flex-row gap-x-2 mt-2 items-center">
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/FPTUCT.png'
                }}
                className="w-12 h-12 rounded-full"
              />
              <View>
                <MediumText className="text-base">Nguyễn Văn A</MediumText>
                <NormalText className="text-tertiary">HE160001</NormalText>
              </View>
            </View>
          </View>

          {/* Destination */}
          <View>
            <NormalText className="text-tertiary">Đến tài khoản</NormalText>
            <View className="flex flex-row gap-x-2 mt-2 items-center">
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/FPTUCT.png'
                }}
                className="w-12 h-12 rounded-full"
              />
              <View>
                <MediumText className="text-base">
                  Đại học FPT Hà Nội
                </MediumText>
                <NormalText className="text-tertiary">12345667</NormalText>
              </View>
            </View>
          </View>
        </View>

        <View className="my-4">
          <View className="mt-2 flex space-y-4">
            <View className="flex-row justify-between">
              <NormalText className="text-tertiary">Loại thanh toán</NormalText>
              <NormalText>Học phí theo kỳ</NormalText>
            </View>
            <View className="flex-row justify-between">
              <NormalText className="text-tertiary">Kỳ học</NormalText>
              <NormalText>Summer 2023</NormalText>
            </View>
            <View className="flex-row justify-between w-full">
              <NormalText className="text-tertiary flex-1">
                Số tiền bằng chữ
              </NormalText>
              <NormalText className="text-right flex-1 flex flex-wrap">
                {convertNumberToVietnameseWords('28500000')}
              </NormalText>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View className="mt-auto mb-4">
          <TextButton
            text="Xác nhận"
            type="primary"
            onPress={() => setIsModalVisible(true)}
          />
        </View>
      </SharedLayout>

      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title="Tài khoản không đủ" />
          <Modal.Body>
            <NormalText className="text-tertiary">
              Hãy nạp thêm tiền vào ví để tiếp tục quá trình thanh toán nhé!
            </NormalText>

            <View className="mt-6 flex flex-row gap-x-3">
              <View className="flex-1">
                <TextButton
                  text="Hủy"
                  type="secondary"
                  onPress={() => setIsModalVisible(false)}
                />
              </View>
              <View className="flex-1">
                <TextButton text="Nạp tiền" type="primary" href="/load-money" />
              </View>
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    </>
  )
}

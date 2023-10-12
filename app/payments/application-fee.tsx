import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import Colors from '@/constants/Colors'
import { formatMoney } from '@/utils/helper'
import React, { useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'

interface Application {
  id: number
  name: string
  fee: number
}

const applications = [
  { id: 1, name: 'Đề nghị phúc tra', fee: 100000 },
  { id: 2, name: 'Đề nghị chuyển ngành', fee: 100000 },
  { id: 3, name: 'Đề nghị cấp bảng điểm quá trình', fee: 100000 },
  { id: 4, name: 'Đăng ký thi thẩm định các môn học online', fee: 100000 },
  { id: 5, name: 'Đơn xin nhập học trở lại', fee: 100000 }
]

export default function ApplicationsScreen() {
  const [filterApplicationTypes, setFilterApplicationTypes] =
    useState<Application[]>(applications)
  const [selectedApplication, setSelectedApplication] = useState<Application>()

  const handleSelectApplication = (application: Application) => {
    if (selectedApplication?.id === application.id) {
      setSelectedApplication(undefined)
    } else {
      setSelectedApplication(application)
    }
  }

  const handleSearchApplication = (text: string) => {
    setFilterApplicationTypes(
      applications.filter((application) =>
        application.name.toLowerCase().includes(text.toLowerCase())
      )
    )
  }

  return (
    <SharedLayout title="Các khoản phí khác" href="/payments">
      <View className="mt-6 mb-4">
        <TextField
          label="Tìm kiếm loại đơn"
          onChangeText={handleSearchApplication}
        />
      </View>

      {filterApplicationTypes.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <NormalText>Không có loại đơn nào</NormalText>
        </View>
      ) : (
        <FlatList
          data={filterApplicationTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="border-b border-b-gray-200 py-2 flex flex-row justify-between items-center"
              activeOpacity={0.8}
              onPress={() => handleSelectApplication(item)}
            >
              <View>
                <MediumText>{item.name}</MediumText>
                <NormalText>{formatMoney(item.fee)}đ</NormalText>
              </View>
              {selectedApplication?.id === item.id && (
                <CustomIcon name="Check" size={24} color={Colors.primary} />
              )}
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View className="my-4">
        <TextButton
          text="Tiếp tục"
          type="primary"
          disable={!selectedApplication}
          href="/payments/school-payment-confirmation"
        />
      </View>
    </SharedLayout>
  )
}

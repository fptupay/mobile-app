import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'

import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  FlatList,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'

const transferTypes = ['Tất cả', 'Gần đây', 'Đã lưu']
const mockTransferList = [
  {
    id: 1,
    name: 'Phạm Quang Hưng',
    accountNumber: 'HE160001'
  },
  {
    id: 2,
    name: 'Phạm Quang Hưng',
    accountNumber: 'HE160002'
  },
  {
    id: 3,
    name: 'Phạm Quang Hưng',
    accountNumber: 'HE160003'
  }
]

export default function TransferListScreen() {
  const router = useRouter()
  const [transferType, setTransferType] = useState<string>(transferTypes[0])

  const recentList = () => (
    <View className="mt-4">
      <SemiText className="text-secondary">Gần đây</SemiText>
      <FlatList
        data={mockTransferList}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex flex-row items-center justify-between border-b border-gray-300 py-3">
            <View className="flex flex-row items-center">
              <View className="w-10 h-10 bg-gray-300 rounded-full" />
              <View className="ml-2">
                <MediumText className="text-secondary">{item.name}</MediumText>
                <NormalText className="text-tertiary">
                  {item.accountNumber}
                </NormalText>
              </View>
            </View>
            <CustomIcon name="MoreHorizontal" size={24} color="#000" />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )

  const savedList = () => (
    <View className="mt-4">
      <SemiText className="text-secondary">Đã lưu</SemiText>
      <FlatList
        data={mockTransferList}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex flex-row items-center justify-between border-b border-gray-300 py-3">
            <View className="flex flex-row items-center">
              <View className="w-10 h-10 bg-gray-300 rounded-full" />
              <View className="ml-2">
                <MediumText className="text-secondary">{item.name}</MediumText>
                <NormalText className="text-tertiary">
                  {item.accountNumber}
                </NormalText>
              </View>
            </View>
            <CustomIcon name="MoreHorizontal" size={24} color="#000" />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )

  const renderList = () => {
    switch (transferType) {
      case 'Tất cả':
        return (
          <FlatList
            data={mockTransferList}
            renderItem={null}
            ListHeaderComponent={recentList}
            ListFooterComponent={savedList}
            showsVerticalScrollIndicator={false}
          />
        )
      case 'Gần đây':
        return recentList()
      case 'Đã lưu':
        return savedList()
      default:
        return null
    }
  }

  const handleTransferTypeChange = (type: string) => {
    setTransferType(type)
  }

  return (
    <SharedLayout
      backHref="/account/home"
      questionHref="/instruction/transfer-instruction"
      title="Chuyển tiền tới"
    >
      <TouchableOpacity
        onPress={() => router.push('/transfer/transfer-new')}
        className="border border-gray-300 rounded-lg px-4 py-3 flex flex-row items-center mt-4"
        activeOpacity={0.8}
      >
        <CustomIcon name="UserPlus" size={24} color="#000" />
        <MediumText className="ml-2 text-secondary">
          Người thụ hưởng mới
        </MediumText>
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View className="flex flex-row space-x-2 mt-6">
            <FlatList
              data={transferTypes}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`border rounded-full px-2 py-1 ${
                    transferType === item ? 'border-primary' : 'border-tertiary'
                  }`}
                  onPress={() => handleTransferTypeChange(item)}
                >
                  <NormalText
                    className={`${
                      transferType === item ? 'text-primary' : 'text-tertiary'
                    }`}
                  >
                    {item}
                  </NormalText>
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              keyExtractor={(item) => item}
              contentContainerStyle={{ columnGap: 10 }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* list rendered based on transfer types */}
      {renderList()}
    </SharedLayout>
  )
}

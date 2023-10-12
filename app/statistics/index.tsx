import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import Colors from '@/constants/Colors'
import { convertDateFormat, formatMoney } from '@/utils/helper'
import React from 'react'
import { FlatList, View } from 'react-native'

const expenses = [
  {
    id: 1,
    name: 'Học phí kỳ tiếp',
    amount: 10000000,
    date: '2023-09-25'
  },
  {
    id: 2,
    name: 'Đơn phúc tra',
    amount: 200000,
    date: '2023-07-25'
  },
  {
    id: 3,
    name: 'Đơn phúc tra',
    amount: 200000,
    date: '2023-07-22'
  }
]

export default function StatisticsScreen() {
  return (
    <SharedLayout title="Thống kê chi tiêu" href="/home">
      {/* Tab bar */}
      <View className="mt-4 flex flex-row">
        <View className="flex-1 items-center">
          <MediumText>Tổng chi</MediumText>
        </View>
        <View className="flex-1 items-center">
          <MediumText className="text-tertiary">Tổng thu</MediumText>
        </View>
      </View>

      {/* Amount and filter */}
      <View className="flex flex-row justify-between items-baseline mt-4">
        <SemiText className="text-primary text-2xl">
          {formatMoney(10500000)}đ
        </SemiText>
        <View className="flex flex-row">
          <NormalText className="text-tertiary mr-2">25/09 - 01/10</NormalText>
          <CustomIcon name="Filter" size={20} color={Colors.tertiary} />
        </View>
      </View>

      {/* Expenses */}
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex flex-row justify-between items-center mt-4">
            <View className="flex flex-row items-center">
              <View>
                <MediumText>{item.name}</MediumText>
                <NormalText className="text-tertiary">
                  {convertDateFormat(item.date)}
                </NormalText>
              </View>
            </View>
            <View>
              <MediumText className="text-primary">
                {formatMoney(item.amount)}đ
              </MediumText>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Sort by list or graph */}
      <View className="flex flex-row mt-auto py-4 shadow-sm shadow-tertiary">
        <View className="flex-1 items-center">
          <MediumText>Danh sách</MediumText>
        </View>
        <View className="flex-1 items-center">
          <MediumText className="text-tertiary">Biểu đồ</MediumText>
        </View>
      </View>
    </SharedLayout>
  )
}

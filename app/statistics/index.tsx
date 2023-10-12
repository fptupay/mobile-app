import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import Colors from '@/constants/Colors'
import { WINDOW_WIDTH, convertDateFormat, formatMoney } from '@/utils/helper'
import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'

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

const incomes = [
  {
    id: 1,
    name: 'PQH huyen tien',
    amount: 10000000,
    date: '2023-09-25'
  },
  {
    id: 2,
    name: 'DTT chuyen tien',
    amount: 200000,
    date: '2023-07-25'
  },
  {
    id: 3,
    name: 'HGK chuyen tien',
    amount: 200000,
    date: '2023-07-22'
  }
]

const FirstTab = () => (
  <>
    {/* Expenses */}
    <View className="flex flex-row justify-between items-baseline mt-4">
      <SemiText className="text-primary text-2xl">
        {formatMoney(10500000)}đ
      </SemiText>
      <View className="flex flex-row">
        <NormalText className="text-tertiary mr-2">25/09 - 01/10</NormalText>
        <CustomIcon name="Filter" size={20} color={Colors.tertiary} />
      </View>
    </View>

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
  </>
)

const SecondTab = () => (
  <>
    <View className="flex flex-row justify-between items-baseline mt-4">
      <SemiText className="text-primary text-2xl">
        {formatMoney(200000)}đ
      </SemiText>
      <View className="flex flex-row">
        <NormalText className="text-tertiary mr-2">25/09 - 01/10</NormalText>
        <CustomIcon name="Filter" size={20} color={Colors.tertiary} />
      </View>
    </View>

    <FlatList
      data={incomes}
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
  </>
)

const renderedTab = SceneMap({
  first: FirstTab,
  second: SecondTab
})

const renderedTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: Colors.primary }}
    style={{ backgroundColor: 'white', marginTop: 10, elevation: 0 }}
    renderLabel={({ route, focused }) => (
      <MediumText style={{ color: focused ? Colors.primary : Colors.tertiary }}>
        {route.title}
      </MediumText>
    )}
  />
)

export default function StatisticsScreen() {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'Tổng chi' },
    { key: 'second', title: 'Tổng thu' }
  ])
  return (
    <SharedLayout title="Thống kê chi tiêu" href="/home">
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderedTabBar}
        renderScene={renderedTab}
        onIndexChange={setIndex}
        initialLayout={{ width: WINDOW_WIDTH }}
      />
    </SharedLayout>
  )
}

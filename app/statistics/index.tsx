import { getTransactionReport } from '@/api/transaction'
import BottomSheet from '@/components/BottomSheet'
import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import Colors from '@/constants/Colors'
import {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  convertDateFormat,
  formatMoney
} from '@/utils/helper'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'

export default function StatisticsScreen() {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'Tổng chi' },
    { key: 'second', title: 'Tổng thu' }
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [totalExpenditure, setTotalExpenditure] = useState(0)
  const [expenditures, setExpenditures] = useState([])
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [revenues, setRevenues] = useState([])

  const { mutate } = useMutation({
    mutationFn: getTransactionReport,
    onSuccess: (data) => {
      setTotalExpenditure(data.data.total_out)
      setTotalRevenue(data.data.total_in)
      setExpenditures(data.data.list_out)
      setRevenues(data.data.list_in)
    }
  })

  useEffect(() => {
    mutate({
      account_no: '000000000005',
      from_date: '2023-09-25',
      to_date: '2023-12-01'
    })
  }, [mutate])

  const offset = useRef(new Animated.Value(WINDOW_HEIGHT)).current
  const toggleBottomSheet = () => {
    setIsOpen(!isOpen)

    if (isOpen) {
      // Exiting animation
      Animated.timing(offset, {
        toValue: WINDOW_HEIGHT,
        duration: 800,
        useNativeDriver: true
      }).start()
    } else {
      // Entering animation
      Animated.timing(offset, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true
      }).start()
    }
  }

  /* Expenditures  */
  const FirstTab = () => (
    <>
      <View className="flex flex-row justify-between items-baseline mt-4">
        <SemiText className="text-primary text-2xl">
          {formatMoney(totalExpenditure)}đ
        </SemiText>
        <View className="flex flex-row">
          <NormalText className="text-tertiary mr-2">25/09 - 01/10</NormalText>
          <CustomIcon name="Filter" size={20} color={Colors.tertiary} />
        </View>
      </View>

      <FlatList
        data={expenditures}
        keyExtractor={(item: any) => item.transaction_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex flex-row items-center mt-4"
            onPress={() =>
              router.push({
                pathname: '/transactions/[id]',
                params: { id: item.transaction_id }
              } as any)
            }
          >
            <View className="w-3/5">
              <MediumText>{item.description}</MediumText>
              <NormalText className="text-tertiary">
                {convertDateFormat(item.date)}
              </NormalText>
            </View>
            <View className="w-2/5">
              <MediumText className="text-primary text-right">
                {formatMoney(item.amount)}đ
              </MediumText>
            </View>
          </TouchableOpacity>
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

  /* Revenue */
  const SecondTab = () => (
    <>
      <View className="flex flex-row justify-between items-baseline mt-4">
        <SemiText className="text-primary text-2xl">
          {formatMoney(totalRevenue)}đ
        </SemiText>
        <View className="flex flex-row">
          <NormalText className="text-tertiary mr-2">25/09 - 01/10</NormalText>
          <CustomIcon name="Filter" size={20} color={Colors.tertiary} />
        </View>
      </View>

      <FlatList
        data={revenues}
        keyExtractor={(item: any) => item.transaction_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex flex-row items-center mt-4"
            onPress={() =>
              router.push({
                pathname: '/transactions/[id]',
                params: { id: item.transaction_id }
              } as any)
            }
          >
            <View className="w-3/5">
              <MediumText>{item.description}</MediumText>
              <NormalText className="text-tertiary">
                {convertDateFormat(item.date)}
              </NormalText>
            </View>
            <View className="w-2/5">
              <MediumText className="text-primary text-right">
                {formatMoney(item.amount)}đ
              </MediumText>
            </View>
          </TouchableOpacity>
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
        <MediumText
          style={{ color: focused ? Colors.primary : Colors.tertiary }}
        >
          {route.title}
        </MediumText>
      )}
    />
  )

  return (
    <SharedLayout title="Thống kê chi tiêu" href="/home">
      <Pressable
        className="text-tertiary uppercase"
        onPress={toggleBottomSheet}
      >
        <NormalText>Lọc theo khoảng</NormalText>
      </Pressable>
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderedTabBar}
        renderScene={renderedTab}
        onIndexChange={setIndex}
        initialLayout={{ width: WINDOW_WIDTH }}
      />
      <Animated.View
        className="bg-white absolute bottom-0 left-0 z-10 p-4 h-64 shadow-xl shadow-gray-600"
        style={[styles.bottomSheet, { transform: [{ translateY: offset }] }]}
      >
        <BottomSheet onPick={() => toggleBottomSheet()} />
      </Animated.View>
    </SharedLayout>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    width: WINDOW_WIDTH,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10
  }
})

import { LineChart } from 'react-native-chart-kit'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import SharedLayout from '@/components/SharedLayout'
import {
  WINDOW_WIDTH,
  formatMoney,
  successResponseStatus
} from '@/utils/helper'
import { useTransactionStore } from '@/stores/transactionStore'
import Colors from '@/constants/Colors'
import { MediumText } from '@/components/Themed'
import CustomIcon from '@/components/Icon'
import { router } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import { getTransactionReportByList } from '@/api/transaction'
import {
  extractDateStringFromCurrentDate,
  getCurrentYearTime
} from '@/utils/datetime'
import Toast from 'react-native-toast-message'
import { isAxiosError } from 'axios'

const chartConfig = {
  backgroundGradientFrom: Colors.light.background,
  backgroundGradientTo: Colors.light.background,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: '4',
    strokeWidth: '1'
  }
}

export default function TransactionStatisticsScreen() {
  const { accountNumber, transactionReport, setListTransaction } =
    useTransactionStore()

  const cashIn = transactionReport && transactionReport?.in_amount_total_by_date
  const cashOut =
    transactionReport && transactionReport?.out_amount_total_by_date

  const totalIn = Object.values(cashIn).reduce(
    (a: any, b: any) => a + b,
    0
  ) as number
  const totalOut = Object.values(cashOut).reduce(
    (a: any, b: any) => a + b,
    0
  ) as number

  const display = [
    {
      key: 'cashIn',
      title: 'Tổng tiền vào',
      value: formatMoney(totalIn)
    },
    {
      key: 'cashOut',
      title: 'Tổng tiền ra',
      value: formatMoney(totalOut)
    }
  ]

  const { mutateAsync } = useMutation({
    mutationFn: getTransactionReportByList,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        setListTransaction(data?.data)
      }
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: error.message
        })
      }
    }
  })

  return (
    <SharedLayout title="Thống kê giao dịch">
      <LineChart
        bezier
        withVerticalLabels={false}
        data={{
          labels: Object.keys(cashIn),
          datasets: [
            {
              data: Object.values(cashIn).map((value: any) => value / 1000),
              strokeWidth: 2,
              color: () => '#60a5fa'
            },
            {
              data: Object.values(cashOut).map((value: any) => value / 1000),
              strokeWidth: 2,
              color: () => '#fb923c'
            }
          ],
          legend: ['Tiền vào', 'Tiền ra']
        }}
        formatYLabel={(value) => `${formatMoney(value)} k`}
        width={WINDOW_WIDTH - 32}
        height={250}
        withInnerLines={false}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {display.map((item) => (
        <View className="flex flex-row justify-between mb-4" key={item.key}>
          <MediumText className="text-tertiary">{item.title}</MediumText>
          <TouchableOpacity
            className="flex flex-row items-center"
            onPress={async () => {
              await mutateAsync({
                account_no: accountNumber,
                from_date: getCurrentYearTime(),
                to_date: extractDateStringFromCurrentDate(new Date())
              })
              router.push({
                pathname: '/statistics/[cash]',
                params: { cash: item.key }
              })
            }}
            activeOpacity={0.8}
          >
            <MediumText className="text-secondary mr-1">
              {item.value} đ
            </MediumText>
            <CustomIcon
              name="ChevronRight"
              size={16}
              color={Colors.light.text}
            />
          </TouchableOpacity>
        </View>
      ))}
    </SharedLayout>
  )
}

const styles = StyleSheet.create({
  chart: {
    marginVertical: 16,
    borderRadius: 16
  }
})

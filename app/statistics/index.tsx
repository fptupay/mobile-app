import { LineChart } from 'react-native-chart-kit'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import SharedLayout from '@/components/SharedLayout'
import { WINDOW_WIDTH, formatMoney } from '@/utils/helper'
import { useTransactionStore } from '@/stores/transactionStore'
import Colors from '@/constants/Colors'
import { MediumText } from '@/components/Themed'
import CustomIcon from '@/components/Icon'

export default function TransactionStatisticsScreen() {
  const { transactionReport } = useTransactionStore()

  const cashIn = transactionReport.in_amount_total_by_date
  const cashOut = transactionReport.out_amount_total_by_date

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
      title: 'Tổng tiền vào',
      value: formatMoney(totalIn)
    },
    {
      title: 'Tổng tiền ra',
      value: formatMoney(totalOut)
    }
  ]

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
        onDataPointClick={() => console.log('clicked')}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {display.map((item) => (
        <View className="flex flex-row justify-between mb-4" key={item.title}>
          <MediumText className="text-tertiary">{item.title}</MediumText>
          <TouchableOpacity
            className="flex flex-row items-center"
            onPress={() => console.log('hello')}
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

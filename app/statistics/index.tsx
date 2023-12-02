import { LineChart } from 'react-native-chart-kit'
import React from 'react'
import SharedLayout from '@/components/SharedLayout'
import { WINDOW_WIDTH } from '@/utils/helper'

export default function TransactionStatisticsScreen() {
  return (
    <SharedLayout title="Thống kê giao dịch">
      <LineChart
        bezier
        withHorizontalLabels={false}
        withVerticalLabels={false}
        data={{
          labels: [' jan', ' feb', ' mar', ' apr', ' june', ' july'],
          datasets: [
            {
              data: [10, -4, 6, -8, 80, 20],
              strokeWidth: 2
            },
            {
              data: [5, 8, 6, 9, 8, 2, -2],
              strokeWidth: 2
            }
          ],
          legend: ['car', 'bike']
        }}
        width={WINDOW_WIDTH - 16}
        height={200}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          borderRadius: 16
        }}
      />
    </SharedLayout>
  )
}

import { LineChart } from 'react-native-chart-kit'
import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import SharedLayout from '@/components/SharedLayout'
import {
  WINDOW_WIDTH,
  formatMoney,
  successResponseStatus
} from '@/utils/helper'
import { useTransactionStore } from '@/stores/transactionStore'
import Colors from '@/constants/Colors'
import { MediumText, NormalText } from '@/components/Themed'
import CustomIcon from '@/components/Icon'
import { router } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import {
  getTransactionReportByChart,
  getTransactionReportByList
} from '@/api/transaction'
import {
  convertDateFormat,
  getFirstAndLastDayOfCurrentMonth,
  getTransactionDates
} from '@/utils/datetime'
import Toast from 'react-native-toast-message'
import { isAxiosError } from 'axios'
import LoadingSpin from '@/components/LoadingSpin'

const chartConfig = {
  backgroundGradientFrom: Colors.light.background,
  backgroundGradientTo: Colors.light.background,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16
  }
}

const periods = [
  {
    key: 'this_week',
    title: 'Tuần này'
  },
  {
    key: 'this_month',
    title: 'Tháng này'
  },
  {
    key: 'last_month',
    title: 'Tháng trước'
  },
  {
    key: 'last_3_months',
    title: '3 tháng gần nhất'
  },
  {
    key: 'this_year',
    title: 'Năm nay'
  }
]

export default function TransactionStatisticsScreen() {
  const { firstDay, lastDay } = getFirstAndLastDayOfCurrentMonth()

  const [modalVisible, setModalVisible] = useState(false)
  const [from, setFrom] = useState(firstDay)
  const [to, setTo] = useState(lastDay)
  const [isLoading, setIsLoading] = useState(false)

  const {
    listTransaction,
    accountNumber,
    transactionReport,
    setTransactionReport,
    setListTransaction
  } = useTransactionStore()

  const listReportMutation = useMutation({
    mutationFn: getTransactionReportByList,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        setListTransaction(data?.data)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
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

  const chartReportMutation = useMutation({
    mutationFn: getTransactionReportByChart,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        setTransactionReport(data?.data)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleSortTransaction = (key: string) => {
    const { fromDate, toDate } = getTransactionDates(key)

    setFrom(fromDate)
    setTo(toDate)
    setModalVisible(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const [chartData, listData] = await Promise.all([
          chartReportMutation.mutateAsync({
            account_no: accountNumber,
            from_date: from,
            to_date: to
          }),
          listReportMutation.mutateAsync({
            account_no: accountNumber,
            from_date: from,
            to_date: to
          })
        ])

        if (successResponseStatus(chartData)) {
          setTransactionReport(chartData?.data)
        } else {
          Toast.show({
            type: 'error',
            text1: 'Đã có lỗi xảy ra',
            text2: chartData.message
          })
        }

        if (successResponseStatus(listData)) {
          setListTransaction(listData?.data)
        } else {
          Toast.show({
            type: 'error',
            text1: 'Đã có lỗi xảy ra',
            text2: listData.message
          })
        }
      } catch (error) {
        console.log(error)
        // Handle other errors if needed
      } finally {
        setIsLoading(false)
        setModalVisible(false)
      }
    }

    void fetchData()
  }, [from, to, accountNumber])

  const display = [
    {
      key: 'cashInChart',
      title: 'Tổng tiền vào',
      value: formatMoney(listTransaction.total_in || 0)
    },
    {
      key: 'cashOutChart',
      title: 'Tổng tiền ra',
      value: formatMoney(listTransaction.total_out || 0)
    }
  ]

  return (
    <SharedLayout title="Thống kê giao dịch">
      {isLoading ? (
        <LoadingSpin />
      ) : (
        <>
          <View className="flex flex-row justify-between mt-4">
            <MediumText className="text-secondary">
              {convertDateFormat(from)} - {convertDateFormat(to)}
            </MediumText>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <CustomIcon
                name="ListFilter"
                size={20}
                color={Colors.light.text}
              />
            </TouchableOpacity>
          </View>
          {!isLoading && transactionReport.in_amount_total_by_date && (
            <LineChart
              bezier
              withVerticalLabels={false}
              withDots={false}
              data={{
                labels: Object.keys(transactionReport),
                datasets: [
                  {
                    data: Object.values(
                      transactionReport?.in_amount_total_by_date
                    ).map((value: any) => value / 1000),
                    strokeWidth: 2,
                    color: () => '#60a5fa'
                  },
                  {
                    data: Object.values(
                      transactionReport?.out_amount_total_by_date
                    ).map((value: any) => value / 1000),
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
          )}

          {display.map((item) => (
            <TouchableOpacity
              className="flex flex-row justify-between mb-4"
              key={item.key}
              onPress={() => {
                listReportMutation.mutate({
                  account_no: accountNumber,
                  from_date: from,
                  to_date: to
                })
                router.push({
                  pathname: '/statistics/[cash]',
                  params: { cash: item.key }
                })
              }}
              activeOpacity={0.8}
            >
              <MediumText className="text-tertiary">{item.title}</MediumText>
              <View className="flex flex-row items-center">
                <MediumText className="text-secondary mr-1">
                  {item.value} đ
                </MediumText>
                <CustomIcon
                  name="ChevronRight"
                  size={16}
                  color={Colors.light.text}
                />
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View className="flex-1 justify-end items-center">
          <View
            className="w-full p-4 bg-gray-50 rounded-t-md"
            style={styles.modal}
          >
            <MediumText className="text-secondary mb-1">
              Chọn khoảng thời gian
            </MediumText>
            <View>
              {periods.map((item) => (
                <TouchableOpacity
                  className="flex flex-row justify-between items-center py-2"
                  key={item.key}
                  activeOpacity={0.8}
                  onPress={() => handleSortTransaction(item.key)}
                >
                  <NormalText className="text-secondary">
                    {item.title}
                  </NormalText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SharedLayout>
  )
}

const styles = StyleSheet.create({
  chart: {
    marginVertical: 16,
    borderRadius: 16
  },
  modal: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 5
  }
})

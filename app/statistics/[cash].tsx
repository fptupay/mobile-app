import { View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import SharedLayout from '@/components/SharedLayout'
import { useTransactionStore } from '@/stores/transactionStore'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import { formatDateTime, formatMoney } from '@/utils/helper'
import CustomIcon from '@/components/Icon'

export default function TransactionListScreen() {
  const { cash } = useLocalSearchParams()
  const { listTransaction } = useTransactionStore()

  const isCashIn = cash === 'cashIn'

  return (
    <SharedLayout title={isCashIn ? 'Thống kê tiền vào' : 'Thống kê tiền ra'}>
      <View className="flex items-center">
        <SemiText className="text-4xl text-secondary mt-4">
          {isCashIn
            ? formatMoney(listTransaction.total_in)
            : formatMoney(listTransaction.total_out)}{' '}
          đ
        </SemiText>

        <FlatList
          className="mt-4"
          contentContainerStyle={{
            paddingBottom: 80
          }}
          data={isCashIn ? listTransaction.list_in : listTransaction.list_out}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex flex-row py-3 items-center"
              onPress={() =>
                router.push({
                  pathname: '/transactions/[id]',
                  params: { id: item.transaction_id }
                } as any)
              }
            >
              <View className="flex flex-row items-center space-x-4 w-3/5">
                <View className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center">
                  <CustomIcon
                    name={+item.amount < 0 ? 'ArrowUpRight' : 'ArrowDownLeft'}
                    size={24}
                    color={+item.amount < 0 ? '#ef4444' : '#22c55e'}
                  />
                </View>

                <View>
                  <MediumText className="text-secondary">
                    {item.description}
                  </MediumText>
                  <NormalText className="text-ellipsis text-xs text-tertiary">
                    {formatDateTime(item.created_at)}
                  </NormalText>
                </View>
              </View>
              <View className="w-2/5">
                <NormalText
                  className={`text-right ${
                    +item.amount < 0 ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {formatMoney(item.amount)} đ
                </NormalText>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SharedLayout>
  )
}

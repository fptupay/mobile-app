import { FlatList, Pressable, View } from 'react-native'
import React from 'react'
import SharedLayout from '@/components/SharedLayout'
import BankButton from '@/components/buttons/BankButton'
import { useQuery } from '@tanstack/react-query'
import { getLinkedBanks } from '@/api/bank'
import { AxiosError } from 'axios'
import Toast from 'react-native-toast-message'
import { NormalText } from '@/components/Themed'
import { useRouter } from 'expo-router'

export default function BankListScreen() {
  const router = useRouter()
  const banksLinkedQuery = useQuery({
    queryKey: ['getLinkedBanks'],
    queryFn: () => getLinkedBanks(),
    onError: (error: AxiosError) => {
      Toast.show({
        type: 'error',
        text1: 'Đã có lỗi xảy ra',
        text2: error.message
      })
    }
  })

  if (banksLinkedQuery.isLoading)
    return (
      <View>
        <NormalText>Loading...</NormalText>
      </View>
    )

  return (
    <SharedLayout href="/account/my-wallet" title="Danh sách liên kết">
      <View className="py-4 bg-transparent flex flex-col justify-between">
        <View className="bg-transparent">
          <FlatList
            data={banksLinkedQuery.data?.data}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/bank/[bank-detail]',
                    params: { bankItem: item.item }
                  })
                }
              >
                <BankButton
                  image={require('@/assets/images/techcombank.png')}
                  label={item.item.bank_code}
                  description={item.item.bank_acc_hide}
                />
              </Pressable>
            )}
          />
          <Pressable
            onPress={() => router.push('/main-features/bank/add-bank')}
          >
            <BankButton
              image={require('@/assets/images/add-bank.png')}
              label="Thêm ngân hàng"
            />
          </Pressable>
        </View>
      </View>
    </SharedLayout>
  )
}

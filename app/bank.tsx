import { FlatList, View } from 'react-native'
import React from 'react'
import SharedLayout from '@/components/SharedLayout'
import BankButton from '@/components/buttons/BankButton'

const bankList = [
  {
    id: '1',
    label: 'Agribank',
    description: '1,900,000 VNĐ',
    href: '/bank-detail'
  },
  {
    id: '2',
    label: 'Agribank',
    description: '1,900,000 VNĐ',
    href: '/bank-detail'
  },
  {
    id: '3',
    label: 'Agribank',
    description: '1,900,000 VNĐ',
    href: '/bank-detail'
  },
  {
    id: '4',
    label: 'Agribank',
    description: '1,900,000 VNĐ',
    href: '/bank-detail'
  }
]

export default function BankScreen() {
  return (
    <SharedLayout href="/(account)/my-wallet" title="Danh sách liên kết">
      <View className="py-4 bg-transparent flex flex-col justify-between">
        <View className="bg-transparent">
          <FlatList
            data={bankList}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <BankButton
                image={require('../assets/images/techcombank.png')}
                label={item.item.label}
                description={item.item.description}
                href={item.item.href}
              />
            )}
          />
          <BankButton
            image={require('../assets/images/add-bank.png')}
            label="Thêm ngân hàng"
            href="/add-bank"
          />
        </View>
      </View>
    </SharedLayout>
  )
}

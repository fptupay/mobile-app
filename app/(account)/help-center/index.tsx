import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText, View } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { getLabelBackgroundColor, getLabelTextColor } from '@/utils/helper'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

const requests = [
  {
    id: '433245',
    type: 'Học phí kỳ tiếp',
    status: 'pending',
    date: '12/12/2021'
  },
  {
    id: '433255',
    type: 'Học phí kỳ tiếp',
    status: 'approved',
    date: '12/12/2021'
  },
  {
    id: '433275',
    type: 'Học phí kỳ tiếp',
    status: 'closed',
    date: '12/12/2021'
  },
  {
    id: '433285',
    type: 'Học phí kỳ tiếp',
    status: 'pending',
    date: '12/12/2021'
  }
]

export default function RequestsListScreen() {
  const router = useRouter()

  return (
    <SharedLayout href="/index" title="Hỗ trợ" isTab={true}>
      {requests.length === 0 ? (
        <View className="flex flex-1 items-center justify-center w-4/5 mx-auto">
          <CustomIcon name="FilePlus" size={64} color="#666" />
          <SemiText className="mt-4 text-lg">Không có yêu cầu</SemiText>
          <NormalText className="text-center text-tertiary">
            Nếu có vấn đề cần trao đổi, đừng ngần ngại gửi yêu cầu hỗ trợ đến
            chúng mình nhé!
          </NormalText>

          <View className="w-full mt-6">
            <TextButton
              text="Tạo yêu cầu"
              type="primary"
              onPress={() => router.push('/help-center/create-request')}
            />
          </View>
        </View>
      ) : (
        <>
          <View className="my-4 flex-row justify-between items-end">
            <View className="flex-row gap-x-2 items-end">
              <NormalText className="text-secondary">Tất cả</NormalText>
              <View className="p-0.5 bg-red-600 rounded-md">
                <NormalText className="text-white"> 0 </NormalText>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/help-center/create-request')}
            >
              <CustomIcon name="Plus" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Requests list */}
          <FlatList
            data={requests}
            renderItem={({ item }) => <RequestItem request={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
      {/* Top */}
    </SharedLayout>
  )
}

function RequestItem({ request }: { request: any }) {
  return (
    <Link
      href={{ pathname: `/help-center/${request.id}`, params: request }}
      asChild
    >
      <Pressable className="border-b-gray-200 border-b flex-row items-center justify-between py-3">
        <View>
          <MediumText className="text-secondary">{request.type}</MediumText>
          <NormalText className="text-tertiary">{request.date}</NormalText>
        </View>
        <View
          className="rounded-full px-2 py-0.5"
          style={{ backgroundColor: getLabelBackgroundColor(request.status) }}
        >
          <MediumText style={{ color: getLabelTextColor(request.status) }}>
            {request.status}
          </MediumText>
        </View>
      </Pressable>
    </Link>
  )
}

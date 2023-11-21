import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText, View } from '@/components/Themed'
import { getLabelBackgroundColor, getLabelTextColor } from '@/utils/helper'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

const requests = [
  {
    id: '433245',
    type: 'Học phí kỳ tiếp',
    status: 'approved',
    label: 'Đang xử lý',
    date: '12/12/2021'
  },
  {
    id: '433255',
    type: 'Học phí kỳ tiếp',
    status: 'pending',
    label: 'Đã phê duyệt',
    date: '12/12/2021'
  },
  {
    id: '433275',
    type: 'Học phí kỳ tiếp',
    status: 'approved',
    label: 'Đã đóng',
    date: '12/12/2021'
  },
  {
    id: '433285',
    type: 'Học phí kỳ tiếp',
    status: 'closed',
    label: 'Đang xử lý',
    date: '12/12/2021'
  }
]

const statuses = [
  {
    id: 'all',
    label: 'Tất cả'
  },
  {
    id: 'pending',
    label: 'Đang xử lý'
  },
  {
    id: 'approved',
    label: 'Đã phê duyệt'
  },
  {
    id: 'closed',
    label: 'Đã đóng'
  }
]

export default function RequestsListScreen() {
  const router = useRouter()
  const [currentStatus, setCurrentStatus] = useState('all')
  const [filteredRequests, setFilteredRequests] = useState(requests)

  const handleFilterRequests = (status: string) => {
    setCurrentStatus(status)
    if (status === 'all') {
      setFilteredRequests(requests)
    } else {
      setFilteredRequests(
        requests.filter((request) => request.status === status)
      )
    }
  }

  return (
    <SharedLayout href="/index" title="Hỗ trợ" isTab={true}>
      {requests.length === 0 ? (
        <View className="flex flex-1 items-center justify-center w-4/5 mx-auto">
          <CustomIcon name="FilePlus" size={64} color="#666" />
          <SemiText className="mt-4 text-lg">Không có yêu cầu</SemiText>
          <NormalText className="text-center text-tertiary">
            Nếu gặp phải vấn đề cần thắc mắc, hãy gửi yêu cầu hỗ trợ cho chúng
            mình nhé.
          </NormalText>
        </View>
      ) : (
        <>
          <View className="my-4 flex-row justify-between items-end">
            <FlatList
              data={statuses}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`rounded-full px-2 py-0.5 mr-2 border ${
                    currentStatus === item.id
                      ? 'border-primary'
                      : 'border-gray-300'
                  }`}
                  onPress={() => handleFilterRequests(item.id)}
                >
                  <NormalText
                    className={` ${
                      currentStatus === item.id
                        ? 'text-primary'
                        : 'text-tertiary'
                    }`}
                  >
                    {item.label}
                  </NormalText>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Requests list */}
          <FlatList
            data={filteredRequests}
            renderItem={({ item }) => <RequestItem request={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />

          {/* Create rounded button */}
          <View
            className="absolute bottom-0 right-0 mr-4 mb-8"
            style={{ zIndex: 100 }}
          >
            <TouchableOpacity
              onPress={() => router.push('/account/help-center/create-request')}
              activeOpacity={0.8}
            >
              <View
                className="rounded-full bg-primary p-2 flex items-center justify-center"
                style={{ width: 56, height: 56 }}
              >
                <CustomIcon name="Plus" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
      {/* Top */}
    </SharedLayout>
  )
}

function RequestItem({ request }: { request: any }) {
  return (
    <Link
      href={{ pathname: `/help-center/${request.id}`, params: request } as any}
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
            {request.label}
          </MediumText>
        </View>
      </Pressable>
    </Link>
  )
}

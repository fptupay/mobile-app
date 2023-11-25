import { getSupportRequests } from '@/api/help-center'
import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import {
  getLabelBackgroundColor,
  getLabelTextColor,
  getTitle
} from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { Link, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Pressable, View, FlatList, TouchableOpacity } from 'react-native'

const statuses = [
  {
    id: 'all',
    label: 'Tất cả'
  },
  {
    id: 'PROCESSING',
    label: 'Đang xử lý'
  },
  {
    id: 'APPROVED',
    label: 'Đã phê duyệt'
  },
  {
    id: 'CLOSED',
    label: 'Đã đóng'
  }
]

export default function RequestsListScreen() {
  const router = useRouter()
  const [currentStatus, setCurrentStatus] = useState('all')

  const requestsQuery = useQuery({
    queryKey: ['requests'],
    queryFn: getSupportRequests
  })
  const [filteredRequests, setFilteredRequests] = useState(
    requestsQuery?.data?.data
  )

  useEffect(() => {
    setFilteredRequests(requestsQuery.data?.data)
  }, [requestsQuery.data])

  const handleFilterRequests = (status: string) => {
    setCurrentStatus(status)
    if (status === 'all') {
      setFilteredRequests(requestsQuery.data?.data)
    } else {
      setFilteredRequests(
        requestsQuery.data?.data.filter(
          (request: any) => request.status === status
        )
      )
    }
  }

  return (
    <SharedLayout backHref="/index" title="Hỗ trợ" isTab={true}>
      {filteredRequests === 0 ? (
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
          {filteredRequests === 0 ? (
            <View className="flex flex-1 items-center justify-center w-4/5 mx-auto">
              <NormalText className="text-center text-tertiary">
                Không có yêu cầu nào phù hợp
              </NormalText>
            </View>
          ) : (
            <FlatList
              data={filteredRequests}
              renderItem={({ item }) => <RequestItem request={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          )}
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
    </SharedLayout>
  )
}

function RequestItem({ request }: { request: any }) {
  return (
    <Link href={`/account/help-center/${request.id}`} asChild>
      <Pressable className="border-b-gray-200 border-b flex-row items-center justify-between py-3">
        <View>
          <MediumText className="text-secondary">{request.title}</MediumText>
          <NormalText className="text-tertiary">
            {request.created_at}
          </NormalText>
        </View>
        <View
          className="rounded-full px-2 py-0.5"
          style={{ backgroundColor: getLabelBackgroundColor(request.status) }}
        >
          <MediumText style={{ color: getLabelTextColor(request.status) }}>
            {getTitle(request.status)}
          </MediumText>
        </View>
      </Pressable>
    </Link>
  )
}

import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import Colors from '@/constants/Colors'
import { formatMoney } from '@/utils/helper'
import React, { useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'

interface Subject {
  id: number
  name: string
  fee: number
}

const subjects: Subject[] = [
  {
    id: 1,
    name: 'SSL101c',
    fee: 100000
  },
  {
    id: 2,
    name: 'SSL102c',
    fee: 200000
  },
  {
    id: 3,
    name: 'SSL103c',
    fee: 300000
  },
  {
    id: 4,
    name: 'SSL104c',
    fee: 400000
  },
  {
    id: 5,
    name: 'SSL105c',
    fee: 500000
  },
  {
    id: 6,
    name: 'SSL106c',
    fee: 600000
  },
  {
    id: 7,
    name: 'SSL107c',
    fee: 700000
  },
  {
    id: 8,
    name: 'SSL108c',
    fee: 800000
  },
  {
    id: 9,
    name: 'SSL109c',
    fee: 900000
  },
  {
    id: 10,
    name: 'SSL110c',
    fee: 1000000
  }
]

export default function SubjectsScreen() {
  const [filterSubjects, setFilterSubjects] = useState<Subject[]>(subjects)
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([])

  const handleSelectSubject = (subject: Subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((item) => item !== subject))
    } else {
      setSelectedSubjects([...selectedSubjects, subject])
    }
  }

  const handleSearchSubject = (text: string) => {
    setFilterSubjects(
      subjects.filter((subject) =>
        subject.name.toLowerCase().includes(text.toLowerCase())
      )
    )
  }

  return (
    <SharedLayout title="Các khoản phí khác" href="/payments">
      <View className="mt-6 mb-4">
        <TextField
          label="Tìm kiếm mã môn học"
          onChangeText={handleSearchSubject}
        />
      </View>

      {filterSubjects.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <NormalText>Không có môn học nào</NormalText>
        </View>
      ) : (
        <FlatList
          data={filterSubjects}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="border-b border-b-gray-200 py-2 flex flex-row justify-between items-center"
              activeOpacity={0.8}
              onPress={() => handleSelectSubject(item)}
            >
              <View>
                <MediumText>{item.name}</MediumText>
                <NormalText>{formatMoney(item.fee)}đ</NormalText>
              </View>
              {selectedSubjects.includes(item) && (
                <CustomIcon name="Check" size={24} color={Colors.primary} />
              )}
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View className="my-4">
        <TextButton
          text="Tiếp tục"
          type="primary"
          disable={selectedSubjects.length === 0}
        />
      </View>
    </SharedLayout>
  )
}

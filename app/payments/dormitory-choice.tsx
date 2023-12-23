import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import SharedLayout from '@/components/SharedLayout'
import { router, useLocalSearchParams } from 'expo-router'
import TextButton from '@/components/buttons/TextButton'
import TextField from '@/components/TextField'
import { useMutation } from '@tanstack/react-query'
import { bookDomRoom } from '@/api/booking/dormitory'
import { successResponseStatus } from '@/utils/helper'
import Toast from 'react-native-toast-message'
import { isAxiosError } from 'axios'
import { Dropdown } from 'react-native-element-dropdown'
import Colors from '@/constants/Colors'
import { usePaymentStore } from '@/stores/paymentStore'

const dom = [
  { label: 'DOM A', value: 'DOM_A' },
  { label: 'DOM B', value: 'DOM_B' },
  { label: 'DOM C', value: 'DOM_C' },
  { label: 'DOM D', value: 'DOM_D' },
  { label: 'DOM E', value: 'DOM_E' },
  { label: 'DOM F', value: 'DOM_F' },
  { label: 'DOM G', value: 'DOM_G' },
  { label: 'DOM H', value: 'DOM_H' }
]
const floor = [
  { label: 'Tầng 1', value: '1' },
  { label: 'Tầng 2', value: '2' },
  { label: 'Tầng 3', value: '3' },
  { label: 'Tầng 4', value: '4' },
  { label: 'Tầng 5', value: '5' }
]
const semester = [
  { label: 'Spring', value: 'SPRING' },
  { label: 'Summer', value: 'SUMMER' }
]

export default function DormitoryChoiceScreen() {
  const { code } = useLocalSearchParams()

  const [value, setValue] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const [isFocus2, setIsFocus2] = useState(false)
  const [isFocus3, setIsFocus3] = useState(false)
  const [note, setNote] = useState('')

  const { setPendingBill } = usePaymentStore()

  const bookRoomMutation = useMutation({
    mutationKey: ['room'],
    mutationFn: bookDomRoom,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        setPendingBill(data.data)

        router.push('/payments/dormitory-checkout')
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

  const handleBookRoom = () => {
    bookRoomMutation.mutate({
      dom: value,
      type: code,
      floor: value2,
      semester: value3,
      note: note
    })
  }

  return (
    <SharedLayout title={code as string} backHref="/account/payments">
      <View className="mt-6 mb-4 space-y-4">
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'orange' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={dom}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Chọn DOM' : '...'}
          value={value}
          onFocus={() => {
            setIsFocus(true)
            setIsFocus2(false)
            setIsFocus3(false)
          }}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value)
            setIsFocus(false)
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocus2 && { borderColor: 'orange' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={floor}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Chọn tầng' : '...'}
          value={value2}
          onFocus={() => {
            setIsFocus2(true)
            setIsFocus(false)
            setIsFocus3(false)
          }}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue2(item.value)
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocus3 && { borderColor: Colors.primary }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={semester}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Chọn học kỳ' : '...'}
          value={value3}
          onFocus={() => {
            setIsFocus3(true)
            setIsFocus(false)
            setIsFocus2(false)
          }}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue3(item.value)
          }}
        />
        <View className="mt-4">
          <TextField
            label="Ghi chú"
            value={note}
            onChangeText={(text) => setNote(text)}
          />
        </View>
      </View>

      <View className="mt-4">
        <TextButton
          text="Tiếp tục"
          type="primary"
          onPress={handleBookRoom}
          disable={bookRoomMutation.isLoading || !value || !value2 || !value3}
          loading={bookRoomMutation.isLoading}
        />
      </View>
    </SharedLayout>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: Colors.tertiary,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14
  },
  placeholderStyle: {
    fontSize: 14
  },
  selectedTextStyle: {
    fontSize: 14
  }
})

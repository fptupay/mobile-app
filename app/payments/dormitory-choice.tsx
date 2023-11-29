import { View } from 'react-native'
import React, { useCallback, useState } from 'react'
import SharedLayout from '@/components/SharedLayout'
import { router, useLocalSearchParams } from 'expo-router'
import DropDownPicker from 'react-native-dropdown-picker'
import TextButton from '@/components/buttons/TextButton'
import TextField from '@/components/TextField'
import { useMutation } from '@tanstack/react-query'
import { bookDomRoom } from '@/api/booking/dormitory'
import { successResponseStatus } from '@/utils/helper'
import Toast from 'react-native-toast-message'
import { isAxiosError } from 'axios'
import { useTransferStore } from '@/stores/transferStore'

export default function DormitoryChoiceScreen() {
  const { code } = useLocalSearchParams()
  const { setTransactionType, setTransactionId } = useTransferStore()

  const [domOpen, setDomOpen] = useState(false)
  const [floorOpen, setFloorOpen] = useState(false)
  const [semesterOpen, setSemesterOpen] = useState(false)

  const [value, setValue] = useState(null)
  const [value1, setValue1] = useState(null)
  const [value2, setValue2] = useState(null)

  const [dom, setDom] = useState([
    { label: 'DOM A', value: 'DOM_A' },
    { label: 'DOM B', value: 'DOM_B' },
    { label: 'DOM C', value: 'DOM_C' },
    { label: 'DOM D', value: 'DOM_D' },
    { label: 'DOM E', value: 'DOM_E' },
    { label: 'DOM F', value: 'DOM_F' },
    { label: 'DOM G', value: 'DOM_G' },
    { label: 'DOM H', value: 'DOM_H' }
  ])
  const [floor, setFloor] = useState([
    { label: 'Tầng 1', value: 1 },
    { label: 'Tầng 2', value: 2 },
    { label: 'Tầng 3', value: 3 },
    { label: 'Tầng 4', value: 4 },
    { label: 'Tầng 5', value: 5 }
  ])
  const [semester, setSemester] = useState([
    { label: 'Spring', value: 'SPRING' },
    { label: 'Summer', value: 'SUMMER' }
  ])
  const [note, setNote] = useState('')

  const bookRoomMutation = useMutation({
    mutationKey: ['room'],
    mutationFn: bookDomRoom,
    onSuccess: (data) => {
      console.log(data)
      if (successResponseStatus(data)) {
        router.push({
          pathname: '/payments/payment-bill',
          params: { type: 'ktx' }
        })
        setTransactionId(data.data.trans_id)
        setTransactionType('ktx')
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
      floor: value1,
      semester: value2,
      note: note
    })
  }

  const onDOMOpen = useCallback(() => {
    setFloorOpen(false)
    setSemesterOpen(false)
  }, [])

  const onFloorOpen = useCallback(() => {
    setDomOpen(false)
    setSemesterOpen(false)
  }, [])

  const onSemesterOpen = useCallback(() => {
    setDomOpen(false)
    setFloorOpen(false)
  }, [])

  return (
    <SharedLayout title={code as string} backHref="/account/payments">
      <View className="mb-4">
        <View className="mt-4">
          <DropDownPicker
            placeholder="Chọn DOM"
            open={domOpen}
            value={value}
            items={dom}
            onOpen={onDOMOpen}
            setOpen={setDomOpen}
            setValue={setValue}
            setItems={setDom}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>
        <View className="mt-4">
          <DropDownPicker
            placeholder="Chọn tầng"
            open={floorOpen}
            value={value1}
            items={floor}
            onOpen={onFloorOpen}
            setOpen={setFloorOpen}
            setValue={setValue1}
            setItems={setFloor}
            zIndex={2000}
            zIndexInverse={2000}
          />
        </View>
        <View className="mt-4">
          <DropDownPicker
            placeholder="Chọn học kỳ"
            open={semesterOpen}
            value={value2}
            items={semester}
            onOpen={onSemesterOpen}
            setOpen={setSemesterOpen}
            setValue={setValue2}
            setItems={setSemester}
            zIndex={1000}
            zIndexInverse={3000}
          />
        </View>
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
          disable={bookRoomMutation.isLoading || !value || !value1 || !value2}
          loading={bookRoomMutation.isLoading}
        />
      </View>
    </SharedLayout>
  )
}

import SharedLayout from '@/components/SharedLayout'
import TextButton from '@/components/buttons/TextButton'
import Colors from '@/constants/Colors'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

export default function CreateRequestScreen() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [requestType, setRequestType] = useState([
    { label: 'Lỗi giao dịch', value: 'transaction-error' },
    { label: 'Chuyển nhầm', value: 'wrong-transfer' },
    { label: 'Cách sử dụng', value: 'usage' }
  ])

  return (
    <SharedLayout href="/index" title="Tạo yêu cầu">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="mt-8 space-y-6 flex-1"
      >
        <DropDownPicker
          open={open}
          placeholder="Chọn loại yêu cầu"
          value={value}
          items={requestType}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setRequestType}
          style={{ borderColor: Colors.tertiary }}
          labelStyle={{ color: Colors.tertiary }}
          textStyle={{ color: Colors.tertiary }}
        />
        <TextInput
          editable
          placeholder="Nhập nội dung yêu cầu"
          multiline
          numberOfLines={10}
          className="border border-gray-200 rounded-lg px-3 py-4 mb-8"
          textAlignVertical="top"
        />

        <TextButton text="Gửi đơn" type="primary" />
      </KeyboardAvoidingView>
    </SharedLayout>
  )
}

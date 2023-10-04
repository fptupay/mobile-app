import SharedLayout from '@/components/SharedLayout'
import { NormalText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import Colors from '@/constants/Colors'
import {
  SupportRequestSchema,
  supportRequestSchema
} from '@/schemas/request-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

export default function CreateRequestScreen() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [requestType, setRequestType] = useState([
    { label: 'Lỗi giao dịch', value: 'transaction-error' },
    { label: 'Chuyển nhầm', value: 'wrong-transfer' },
    { label: 'Cách sử dụng', value: 'usage' }
  ])
  const [requestError, setRequestError] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SupportRequestSchema>({
    defaultValues: {
      content: ''
    },
    resolver: zodResolver(supportRequestSchema),
    mode: 'onBlur'
  })

  const onSubmit = (data: SupportRequestSchema) => {
    console.log(data)
    if (value === null) {
      setRequestError('Vui lòng chọn loại yêu cầu')
    }
  }

  return (
    <SharedLayout href="/index" title="Tạo yêu cầu">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="mt-8 flex-1"
      >
        <DropDownPicker
          open={open}
          placeholder="Chọn loại yêu cầu"
          value={value}
          items={requestType}
          onChangeValue={() => setRequestError('')}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setRequestType}
          style={{ borderColor: Colors.tertiary }}
          textStyle={{ color: Colors.tertiary }}
        />
        {requestError ? (
          <NormalText className="text-red-500 mt-2">{requestError}</NormalText>
        ) : null}

        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Nhập nội dung yêu cầu"
              multiline
              numberOfLines={10}
              className="border border-gray-200 rounded-lg px-3 py-4 mt-6 mb-2"
              textAlignVertical="top"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.content ? (
          <NormalText className="text-red-500">
            {errors.content.message}
          </NormalText>
        ) : null}

        <View className="mt-auto mb-4">
          <TextButton
            onPress={handleSubmit(onSubmit)}
            text="Gửi đơn"
            type="primary"
          />
        </View>
      </KeyboardAvoidingView>
    </SharedLayout>
  )
}

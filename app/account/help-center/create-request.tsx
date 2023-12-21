import {
  createSupportRequest,
  uploadImagesToSupportRequest
} from '@/api/help-center'
import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import TextButton from '@/components/buttons/TextButton'
import Colors from '@/constants/Colors'
import { successResponseStatus } from '@/utils/helper'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import Toast from 'react-native-toast-message'
import { Dropdown } from 'react-native-element-dropdown'

import * as ImagePicker from 'expo-image-picker'
import { NormalText } from '@/components/Themed'

const requestType = [
  { label: 'Lỗi giao dịch', value: 'TRANSACTION' },
  { label: 'Vấn đề khác', value: 'OTHER' }
]

export default function CreateRequestScreen() {
  const [isFocus, setIsFocus] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<string[]>([])

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5
    })

    if (result?.assets) {
      uploadImageMutation.mutate(result.assets[0].uri)
    }
  }

  const uploadImageMutation = useMutation({
    mutationFn: (data: string) => uploadImagesToSupportRequest(data),
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        setImages(data?.data.images)
        Toast.show({
          type: 'success',
          text1: 'Thêm ảnh thành công'
        })
      }
    },
    onError: (error: AxiosError) => {
      Toast.show({
        type: 'error',
        text1: 'Đã có lỗi xảy ra',
        text2: error.message
      })
    }
  })

  const queryClient = useQueryClient()
  const createSupportMutation = useMutation({
    mutationFn: createSupportRequest,
    onSuccess: async (data) => {
      if (successResponseStatus(data)) {
        router.push({
          pathname: '/account/help-center/successful-request',
          params: { id: data.data.id }
        })
        // clear state
        setValue('')
        setTransactionId('')
        setTitle('')
        setDescription('')
        setImages([])

        await queryClient.invalidateQueries(['requests'])
      } else {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      }
    }
  })

  const handleCreateSupportRequest = () => {
    createSupportMutation.mutate({
      transaction_id: transactionId,
      title: title,
      description: description,
      type: value,
      images: images
    })
  }

  return (
    <SharedLayout
      backHref="/index"
      questionHref="/instruction/create-request-instruction"
      title="Tạo yêu cầu"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="mt-8 flex-1"
      >
        <ScrollView
          className="space-y-3 pb-10"
          showsVerticalScrollIndicator={false}
        >
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && { borderColor: Colors.primary }
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={requestType}
            placeholder="Chọn loại yêu cầu"
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={value}
            onFocus={() => {
              setIsFocus(true)
            }}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value)
            }}
          />
          {value === 'TRANSACTION' && (
            <TextInput
              placeholder="Mã giao dịch"
              className="border border-gray-300 rounded-lg pl-2.5 pr-3 py-3"
              value={transactionId}
              onChangeText={(text) => setTransactionId(text)}
            />
          )}

          <TextInput
            placeholder="Tiêu đề"
            value={title}
            className="border border-gray-300 rounded-lg pl-2.5 pr-3 py-3"
            onChangeText={(text) => setTitle(text)}
          />

          <TextInput
            placeholder="Mô tả chi tiết vấn đề của bạn"
            multiline
            numberOfLines={7}
            className="border border-gray-300 rounded-lg pl-2.5 pr-3 py-3"
            textAlignVertical="top"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />

          <NormalText className="text-secondary">
            Thêm ảnh chứng minh (tuỳ chọn)
          </NormalText>
          <View className="flex flex-row">
            {images && (
              <View className="flex flex-row flex-wrap">
                {images.map((image) => (
                  <View
                    className="w-16 h-16 rounded-md overflow-hidden mr-2 mb-2"
                    key={image}
                  >
                    <Image
                      source={{ uri: image }}
                      className="w-full h-full object-cover"
                    />
                  </View>
                ))}
              </View>
            )}
            {uploadImageMutation.isLoading && (
              <View className="w-16 h-16 rounded-md bg-gray-200 flex justify-center items-center mr-2 mb-2">
                <ActivityIndicator size="small" color={Colors.tertiary} />
              </View>
            )}
            <TouchableOpacity
              className="w-16 h-16 rounded-md bg-gray-200 flex justify-center items-center"
              onPress={handlePickImage}
            >
              <CustomIcon name="Camera" size={30} color={Colors.tertiary} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View className="bg-white p-4 shadow-sm shadow-tertiary absolute right-0 left-0 bottom-0">
        <TextButton
          onPress={handleCreateSupportRequest}
          text="Gửi đơn"
          type="primary"
          disable={createSupportMutation.isLoading || !title}
          loading={createSupportMutation.isLoading}
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

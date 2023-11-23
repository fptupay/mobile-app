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
  ActivityIndicator
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import Toast from 'react-native-toast-message'
import * as ImagePicker from 'expo-image-picker'
import { NormalText } from '@/components/Themed'
import TextField from '@/components/TextField'

export default function CreateRequestScreen() {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [requestType, setRequestType] = useState([
    { label: 'Lỗi giao dịch', value: 'TRANSACTION' },
    { label: 'Vấn đề khác', value: 'OTHER' }
  ])

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
      type: type,
      images: images
    })
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
          value={type}
          items={requestType}
          setOpen={setOpen}
          setValue={setType}
          setItems={setRequestType}
          style={{ borderColor: Colors.tertiary }}
          textStyle={{ color: Colors.tertiary }}
        />

        <ScrollView
          className="space-y-3 pt-4 pb-10"
          showsVerticalScrollIndicator={false}
        >
          {type === 'TRANSACTION' && (
            <TextField
              label="Mã giao dịch"
              value={transactionId}
              onChangeText={(text) => setTransactionId(text)}
            />
          )}

          <TextField
            label="Tiêu đề"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          <TextInput
            placeholder="Mô tả chi tiết vấn đề của bạn"
            multiline
            numberOfLines={7}
            className="border border-gray-300 rounded-lg pl-6 pr-3 py-3"
            textAlignVertical="top"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />

          <NormalText className="text-tertiary">Thêm ảnh chứng minh</NormalText>
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

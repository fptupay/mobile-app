import { getAllBanks } from '@/api/bank'
import CustomIcon from '@/components/Icon'
import LoadingSpin from '@/components/LoadingSpin'
import { Modal } from '@/components/Modal'
import SharedLayout from '@/components/SharedLayout'
import { NormalText, SemiText } from '@/components/Themed'
import IconButton from '@/components/buttons/IconButton'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import Colors from '@/constants/Colors'
import { successResponseStatus } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ChevronRight } from 'lucide-react-native'
import { useState } from 'react'
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { Image } from 'expo-image'
import Toast from 'react-native-toast-message'
import { blurHash } from '@/constants/Hash'

export type AddBankRouteParams = {
  setDepositSuccessful?: boolean
}

type BankItemProp = {
  id: string
  code: string
  name: string
  short_name: string
  status: string
  display_order: number
  is_direct: boolean
  logo: any
  link_note: string | null
  create_link: string | null
}

export default function AddBankScreen() {
  const params: { previousRoute: string } = useLocalSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [bank, setBank] = useState({
    bankCode: '',
    bankName: ''
  })
  const [isVisible, setVisible] = useState(false)
  const [bankCreateType, setBankCreateType] = useState('')
  const router = useRouter()

  const banksQuery = useQuery({
    queryKey: ['getAllBanks'],
    queryFn: () => getAllBanks(),
    onSuccess: (data) => {
      if (!successResponseStatus(data)) {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
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

  const clearSearchValue = () => {
    setSearchValue('')
  }

  const filteredBankData = banksQuery.data?.data.filter(
    (item: BankItemProp) =>
      item.short_name.toLowerCase().includes(searchValue.toLowerCase()) &&
      item.create_link != null
  )

  const handleSelectBank = (item: BankItemProp) => {
    setBankCreateType(item.create_link || '')
    setBank({
      bankCode: item.code,
      bankName: item.short_name
    })
    setVisible(true)
  }

  const renderItem = ({ item }: { item: BankItemProp }) => (
    <TouchableOpacity onPress={() => handleSelectBank(item)}>
      <KeyboardAvoidingView>
        <View className="flex-row justify-between items-center py-3 h-[75px] w-full border-b border-gray-300">
          <View className="flex-row items-center space-x-4">
            <View className="w-[48px] h-[48px] rounded-full">
              <Image
                source={{
                  uri: item.logo
                }}
                transition={200}
                placeholder={blurHash}
                className="w-full h-full rounded-full"
              />
            </View>
            <View>
              <Text>{item.short_name}</Text>
            </View>
          </View>
          <ChevronRight size={24} color={Colors.secondary} />
        </View>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  )

  const BankTypeModal = () => {
    return (
      <Modal isVisible={isVisible}>
        <Modal.Container>
          <View className="flex items-center">
            <Modal.Header title="Phương thức liên kết" />
          </View>
          <Modal.Body>
            <NormalText className="text-tertiary text-center">
              Chọn phương thức liên kết ví FPTUPay với ngân hàng của bạn
            </NormalText>

            <View className="bg-[#FAFAFA] rounded-lg mt-3">
              {bankCreateType.includes('issue_date') && (
                <IconButton
                  label="Thẻ ngân hàng"
                  onPress={() =>
                    router.push({
                      pathname: '/main-features/bank/[code]',
                      params: {
                        code: bank.bankCode,
                        type: 'CARD',
                        name: bank.bankName
                      }
                    })
                  }
                  description="Liên kết bằng số thẻ ngân hàng"
                />
              )}
              <View className="mt-2">
                <IconButton
                  label="Tài khoản ngân hàng"
                  onPress={() =>
                    router.push({
                      pathname: '/main-features/bank/[code]',
                      params: {
                        code: bank.bankCode,
                        type: 'ACCOUNT',
                        name: bank.bankName
                      }
                    })
                  }
                  description="Liên kết bằng số tài khoản ngân hàng"
                />
              </View>
            </View>

            <View className="mt-3 w-full">
              <TextButton
                text="Liên kết sau"
                type={TextButtonType.SECONDARY}
                onPress={() => setVisible(false)}
              />
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    )
  }

  const BankFlatList = () => {
    return (
      <View className="w-full mt-5">
        <View className="px-4">
          {banksQuery.isLoading ? (
            <LoadingSpin />
          ) : filteredBankData.length == 0 ? (
            <Text className="text-secondary">
              Không có ngân hàng bạn cần tìm
            </Text>
          ) : (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 180
              }}
              data={filteredBankData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    )
  }

  return (
    <SharedLayout
    questionHref='/instruction/add-bank-instruction'
      backHref={params.previousRoute || '/account/home'}
      title="Liên kết ngân hàng"
    >
      <View className="py-4 flex-1 flex-col justify-start gap-y-5">
        <View className="my-1 flex-row">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 flex-row items-center justify-between"
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="flex-1 items-center justify-center">
                <View className="w-full relative">
                  <TextInput
                    className="h-12 px-10 py-3 bg-[#D9D9D9] rounded-lg focus:border-primary"
                    placeholderTextColor={Colors.tertiary}
                    placeholder="Tìm kiếm ngân hàng"
                    value={searchValue}
                    onChangeText={(text) => setSearchValue(text)}
                    style={{ fontFamily: 'Inter' }}
                  />
                  <View className="absolute top-3 left-2">
                    <CustomIcon
                      name="Search"
                      size={24}
                      color={Colors.tertiary}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
            {searchValue.length > 0 && (
              <Pressable className="ml-3" onPress={clearSearchValue}>
                <NormalText className="text-secondary">Hủy</NormalText>
              </Pressable>
            )}
          </KeyboardAvoidingView>
        </View>
        <View>
          <SemiText className="text-secondary">
            {searchValue.length == 0 ? 'Toàn bộ ngân hàng' : 'Gợi ý cho bạn'}
          </SemiText>
          <BankFlatList />
        </View>
      </View>
      <BankTypeModal />
    </SharedLayout>
  )
}

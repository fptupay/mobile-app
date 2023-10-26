import { getAllBanks } from '@/api/bank'
import CustomIcon from '@/components/Icon'
import { Modal } from '@/components/Modal'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import Colors from '@/constants/Colors'
import { successResponseStatus } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ChevronRight } from 'lucide-react-native'
import { useState } from 'react'
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Toast from 'react-native-toast-message'

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

  const renderItem = ({ item }: { item: BankItemProp }) => (
    <KeyboardAvoidingView>
      <View className="flex-row justify-between items-center py-3 h-[75px] w-full border-b border-gray-300">
        <View className="flex-row items-center space-x-4">
          <View className="w-[48px] h-[48px] rounded-full">
            {item.logo != null ? (
              <Image
                source={{
                  uri: item.logo
                }}
                className="w-full h-full rounded-full"
              />
            ) : (
              <Image
                source={require('@/assets/images/tick.png')}
                className="w-full h-full rounded-full"
              />
            )}
          </View>
          <View>
            <Text>{item.short_name}</Text>
          </View>
        </View>
        <View>
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/main-features/bank/[add-bank-item]',
                params: { bank_code: item.code }
              })
            }
          >
            <ChevronRight size={24} color={Colors.secondary} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  )

  const BankTypeModal = () => {
    return (
      <Modal isVisible={false}>
        <Modal.Container>
          <View className="flex items-center">
            <Modal.Header title="" />
          </View>
          <Modal.Body>
            <MediumText className="text-secondary text-center mb-2">
              Xác thực tài khoản hoàn tất
            </MediumText>
            <NormalText className="text-tertiary text-center">
              Bây giờ bạn đã có thể thoải mái trải nghiệm các dịch vụ của ví
              điện tử FPTUPay!
            </NormalText>

            <View className="mt-6 w-full">
              <TextButton
                text="Đến trang chủ"
                type="primary"
                onPress={() => router.push('/account/home')}
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
            <Text>Loading...</Text>
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
          {/* {filteredBankData.length == 0 ? (
            <View className="mt-10 flex justify-center items-center space-y-4">
              <CustomIcon name="SearchX" color={Colors.tertiary} size={64} />
              <SemiText className="text-lg text-tertiary">
                Không tìm thấy kết quả nào
              </SemiText>
            </View>
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
          )} */}
        </View>
      </View>
    )
  }

  return (
    <SharedLayout
      href={params.previousRoute || '/account/home'}
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

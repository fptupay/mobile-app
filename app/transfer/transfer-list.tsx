import { deleteSavedAccount, getSavedAccounts } from '@/api/transfer'
import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useRouter } from 'expo-router'
import { Animated, FlatList, TouchableOpacity, View, Image } from 'react-native'
import LoadingSpin from '@/components/LoadingSpin'
import { successResponseStatus } from '@/utils/helper'
import Toast from 'react-native-toast-message'
import { useTransferStore } from '@/stores/transferStore'

export default function TransferListScreen() {
  const router = useRouter()
  const { setSavedStudentCodes } = useTransferStore()

  const { data: friends, isLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: getSavedAccounts,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        setSavedStudentCodes(data?.data.map((item: any) => item.ref_user_id))
      }
    }
  })

  return (
    <SharedLayout
      backHref="/account/home"
      questionHref="/instruction/transfer-instruction"
      title="Chuyển tiền tới"
    >
      <TouchableOpacity
        onPress={() => router.push('/transfer/transfer-new')}
        className="border border-gray-300 rounded-lg px-4 py-3 flex flex-row items-center mt-4"
        activeOpacity={0.8}
      >
        <CustomIcon name="UserPlus" size={24} color="#000" />
        <MediumText className="ml-2 text-secondary">
          Thêm người nhận mới
        </MediumText>
      </TouchableOpacity>

      <View className="mt-4">
        <SemiText className="text-secondary">Đã lưu</SemiText>
        {isLoading ? (
          <LoadingSpin />
        ) : (
          <FlatList
            data={friends?.data}
            renderItem={({ item }) => (
              <SwipeableItem item={item} router={router} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </SharedLayout>
  )
}

function SwipeableItem({ item, router }: { item: any; router: any }) {
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity)

  const queryClient = useQueryClient()
  const deleteSavedAccountMutation = useMutation({
    mutationFn: deleteSavedAccount,
    onSuccess: async (data) => {
      if (successResponseStatus(data)) {
        Toast.show({
          type: 'success',
          text1: 'Xóa tài khoản thành công'
        })
        await queryClient.invalidateQueries(['friends'])
      }
    }
  })

  /*  const [receiverAvatars, setReceiverAvatars] = useState([])

  useEffect(() => {
    async function getSavedAccountAvatar() {
      const avatar = await SecureStore.getItemAsync(item.ref_user_id)
      setReceiverAvatars({ ...receiverAvatars,  avatar })
    }
    getSavedAccountAvatar().catch((error) => {
      console.log(error)
    })
  }, []) */

  return (
    <Swipeable
      renderRightActions={(progress, dragX) => {
        const scale = dragX.interpolate({
          inputRange: [-110, 0],
          outputRange: [1, 0],
          extrapolate: 'clamp'
        })
        return (
          <AnimatedTouchableOpacity
            onPress={() => deleteSavedAccountMutation.mutate(item.id)}
            className="flex flex-row items-center justify-center bg-red-500 rounded-md w-20 h-full"
            activeOpacity={0.8}
            style={{
              transform: [{ scale }]
            }}
          >
            <CustomIcon name="Trash" size={24} color="#fff" />
          </AnimatedTouchableOpacity>
        )
      }}
    >
      <TouchableOpacity
        className="flex flex-row items-center justify-between py-3"
        onPress={() =>
          router.push({
            pathname: '/transfer/transfer-amount',
            params: {
              receiver: item.name,
              studentCode: item.ref_user_id
            }
          })
        }
      >
        <View className="flex flex-row items-center">
          <Image
            source={{
              uri: item.avatar
            }}
            className="w-12 h-12 rounded-full"
          />
          <View className="ml-3">
            <MediumText className="text-secondary">{item.name}</MediumText>
            <NormalText className="text-tertiary">
              {item.ref_user_id}
            </NormalText>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

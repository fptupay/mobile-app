import { getUserDetails } from '@/api/profile'
import DescriptionRowItem, {
  ListItemProp
} from '@/components/DescriptionRowItem'
import SharedLayout from '@/components/SharedLayout'
import { NormalText, View } from '@/components/Themed'
import Colors from '@/constants/Colors'
import { useAccountStore } from '@/stores/accountStore'
import { useQuery } from '@tanstack/react-query'
import { ActivityIndicator, ScrollView } from 'react-native'

export default function PersonalInfoScreen() {
  const setDetails = useAccountStore((state) => state.setDetails)

  const { data: profile, isLoading } = useQuery({
    queryKey: ['user-details'],
    queryFn: getUserDetails,
    onSuccess: (data) => {
      setDetails(data.data)
    }
  })

  const mockPersonalData: ListItemProp[] = [
    {
      label: 'Họ và tên',
      description: profile?.data.full_name
    },
    {
      label: 'Mã sinh viên',
      description: profile?.data.username
    },
    {
      label: 'Email',
      description: profile?.data.email
    },
    {
      label: 'Số điện thoại',
      description: profile?.data.mobile
    },
    {
      label: 'Cơ sở',
      description: profile?.data.campus
    },
    {
      label: 'Trạng thái tài khoản',
      description:
        profile?.data.status === 'ACTIVE' ? 'Đã kích hoạt' : 'Chưa kích hoạt'
    },
    {
      label: 'Thời gian kích hoạt',
      description: '01:01 - 01/01/2023'
    },
    {
      label: 'Ngân hàng liên kết',
      description: profile?.data.linked_bank
    },
    {
      label: 'Loại tài khoản',
      description:
        profile?.data.user_type === 'STUDENT' ? 'Sinh viên' : 'Giảng viên'
    }
  ]

  return (
    <SharedLayout href="/account/my-wallet" title="Thông tin cá nhân">
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={Colors.tertiary} />
          <NormalText className="mt-2 text-tertiary">
            Đang tải dữ liệu
          </NormalText>
        </View>
      ) : (
        <ScrollView className="mt-10">
          {mockPersonalData.map((item) => (
            <DescriptionRowItem
              key={item.label}
              label={item.label}
              description={item.description}
            />
          ))}
        </ScrollView>
      )}
    </SharedLayout>
  )
}

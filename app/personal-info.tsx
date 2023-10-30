import { getUserDetails } from '@/api/profile'
import DescriptionRowItem, {
  ListItemProp
} from '@/components/DescriptionRowItem'
import SharedLayout from '@/components/SharedLayout'
import { useQuery } from '@tanstack/react-query'
import { ScrollView } from 'react-native'

export default function PersonalInfoScreen() {
  const { data: profile } = useQuery({
    queryKey: ['user-details'],
    queryFn: getUserDetails
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
      <ScrollView className="mt-10">
        {mockPersonalData.map((item) => (
          <DescriptionRowItem
            key={item.label}
            label={item.label}
            description={item.description}
          />
        ))}
      </ScrollView>
    </SharedLayout>
  )
}

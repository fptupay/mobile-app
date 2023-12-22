import DescriptionRowItem, {
  ListItemProp
} from '@/components/DescriptionRowItem'
import SharedLayout from '@/components/SharedLayout'
import { useAccountStore } from '@/stores/accountStore'

import { ScrollView } from 'react-native'

export default function PersonalInfoScreen() {
  const userDetails = useAccountStore((state) => state.details)

  const mockPersonalData: ListItemProp[] = [
    {
      label: 'Họ và tên',
      description: userDetails.full_name
    },
    {
      label: 'Mã sinh viên',
      description: userDetails.username.toUpperCase()
    },
    {
      label: 'Email',
      description: userDetails.email
    },
    {
      label: 'Số điện thoại',
      description: userDetails.mobile
    },
    {
      label: 'Cơ sở',
      description: userDetails.campus
    },
    {
      label: 'Trạng thái tài khoản',
      description:
        userDetails.status === 'ACTIVE' ? 'Đã kích hoạt' : 'Chưa kích hoạt'
    },
    {
      label: 'Loại tài khoản',
      description:
        userDetails.user_type === 'STUDENT' ? 'Sinh viên' : 'Giảng viên'
    }
  ]

  return (
    <SharedLayout backHref="/account/my-wallet" title="Thông tin cá nhân">
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

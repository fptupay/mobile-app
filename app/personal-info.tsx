import DescriptionRowItem, {
  ListItemProp
} from '@/components/DescriptionRowItem'
import SharedLayout from '@/components/SharedLayout'
import { ScrollView } from 'react-native'

const mockPersonalData: ListItemProp[] = [
  {
    label: 'Họ và tên',
    description: 'Phạm Quang Hưng'
  },
  {
    label: 'Mã sinh viên',
    description: 'HE111111'
  },
  {
    label: 'Email',
    description: 'email@gmail.com'
  },
  {
    label: 'Số điện thoại',
    description: '0123456789'
  },
  {
    label: 'Cơ sở',
    description: 'Hòa Lạc'
  },
  {
    label: 'Trạng thái tài khoản',
    description: 'Đã kích hoạt'
  },
  {
    label: 'Thời gian kích hoạt',
    description: '01:01 - 01/01/2023'
  },
  {
    label: 'Loại tài khoản',
    description: 'Sinh viên'
  }
]

export default function PersonalInfoScreen() {
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

import { View } from 'react-native'
import { NormalText } from './Themed'

export type ListItemProp = {
  label: string
  description: string
}

export default function DescriptionRowItem({
  label,
  description
}: ListItemProp) {
  return (
    <View className="flex flex-row justify-between items-center mb-5">
      <NormalText className="text-tertiary">{label}</NormalText>
      <NormalText className="text-secondary">{description}</NormalText>
    </View>
  )
}

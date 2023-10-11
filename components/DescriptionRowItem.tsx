import { View } from 'react-native'
import { MediumText, NormalText } from './Themed'

export type ListItemProp = {
  label: string
  description: string
}

export default function DescriptionRowItem({
  label,
  description
}: ListItemProp) {
  return (
    <View className="flex flex-row justify-between items-center mb-3">
      <NormalText className="text-tertiary">{label}</NormalText>
      <MediumText className="text-secondary">{description}</MediumText>
    </View>
  )
}

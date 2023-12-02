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
    <View className="flex flex-row justify-between items-center mb-4">
      <NormalText className="text-tertiary flex-1">{label}</NormalText>
      <NormalText className="text-secondary flex-1 text-right">
        {description}
      </NormalText>
    </View>
  )
}

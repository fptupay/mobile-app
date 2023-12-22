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
    <View className="flex flex-row items-start mb-4">
      <NormalText className="text-tertiary grow">{label}</NormalText>
      <NormalText className="text-secondary flex-auto text-right">
        {description}
      </NormalText>
    </View>
  )
}

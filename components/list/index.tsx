import { View } from 'react-native'
import { SemiText } from '../Themed'
import ListItem, { ListItemProps } from './ListItem'

export default function List({
  data,
  title
}: {
  data: ListItemProps[]
  title?: string
}) {
  return (
    <View className="mx-4">
      {title && (
        <SemiText className="text-sm mb-3 text-secondary">{title}</SemiText>
      )}
      <View className="bg-[#FAFAFA] rounded-lg">
        {data.map((item, index) => (
          <ListItem
            key={index}
            href={item.href}
            leftIcon={item.leftIcon}
            title={item.title}
            description={item.description}
            rightIcon={item.rightIcon}
            color={item.color}
          />
        ))}
      </View>
    </View>
  )
}

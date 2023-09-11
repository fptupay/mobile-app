import Colors from '@/constants/Colors'
import React, { useState } from 'react'
import { Image, TextInput, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { NormalText, SemiText } from './Themed'

interface SelectFieldProps extends React.ComponentProps<typeof TextInput> {
  label: string;
  description?: string | null;
}

const IconComponent = () => {
	return <View className="w-3 h-3 bg-white rounded-full"></View>
}

export default function SelectField(props: SelectFieldProps) {
	const { label, description, style, ...otherProps } = props

	const [select, setSelect] = useState(false)

	return (
		<View
			{...otherProps}
			style={style}
			className={`p-4 rounded-lg flex flex-row items-center justify-between border ${
				select ? 'border-primary' : 'border-gray-300'
			}`}
		>
			<View className="flex flex-row gap-3 items-center">
				<Image source={require('../assets/images/techcombank.png')} />
				<View>
					<SemiText className="text-secondary capitalize">{label}</SemiText>
					<NormalText className="text-tertiary">{description}</NormalText>
				</View>
			</View>
			<View>
				<BouncyCheckbox
					onPress={(isChecked: boolean) => setSelect(isChecked)}
					fillColor={select ? Colors.primary : Colors.tertiary}
					unfillColor={Colors.tertiary}
					iconStyle={{ borderColor: Colors.tertiary }}
					className="w-7 h-7"
					iconImageStyle={{ display: 'none' }}
					iconComponent={<IconComponent />}
				/>
			</View>
		</View>
	)
}

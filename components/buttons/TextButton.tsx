import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, TouchableOpacity, View } from 'react-native'
import { MediumText } from '../Themed'

export const TextButtonType = {
	PRIMARY: 'primary',
	SECONDARY: 'secondary',
}

type TextButtonProps = {
  href?: any;
  text: string;
  type: string;
  onPress?: () => void;
};

export default function TextButton({ href, text, type, onPress }: TextButtonProps) {
	const route = useRouter()

	return (
		<TouchableOpacity onPress={onPress}>
			<View
				className={`${
					type == TextButtonType.PRIMARY
						? 'bg-primary'
						: 'bg-white border border-tertiary'
				} rounded-lg px-1 py-2`}
			>
				{href ? (
					<Pressable
						onPress={() => route.push(href)}
						className="flex items-center py-2 w-full"
					>
						<MediumText
							className={`${
								type == TextButtonType.PRIMARY ? 'text-white' : 'text-tertiary'
							} py-2 w-full text-center`}
						>
							{text}
						</MediumText>
					</Pressable>
				) : (
					<MediumText
						className={`${
							type == TextButtonType.PRIMARY ? 'text-white' : 'text-tertiary'
						} py-2 w-full text-center`}
					>
						{text}
					</MediumText>
				)}
			</View>
		</TouchableOpacity>
	)
}

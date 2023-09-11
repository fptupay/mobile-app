import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import GradientBackground from './GradientBackground'
import { MediumText } from './Themed'
import BackButton from './buttons/BackButton'
import QuestionButton from './buttons/QuestionButton'

interface SharedLayoutProps {
  href: string;
  title: string;
  children: React.ReactNode;
}

export default function SharedLayout({
	href,
	title,
	children,
}: SharedLayoutProps) {
	return (
		<View className="flex-1">
			<StatusBar style="auto" />
			<View className="h-48">
				<GradientBackground />
				<SafeAreaView className="px-4 pt-4">
					<BackButton href={href} />
					<QuestionButton href="" />
					<MediumText className="text-2xl text-secondary mt-9">
						{title}
					</MediumText>
				</SafeAreaView>
			</View>
			<View className="absolute top-36 left-0 right-0 bottom-0 bg-white flex-1 px-4 rounded-t-[30px] flex justify-between">
				{children}
			</View>
		</View>
	)
}

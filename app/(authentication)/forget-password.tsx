import { MediumText, NormalText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ForgetPassword() {
	return (
		<SafeAreaView className="flex-1">
			<BackButton href="/(authentication)" />

			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				className="flex-1 px-4"
			>
				<StatusBar style="auto" />

				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View className="flex-1 justify-center space-y-8">
						<Image
							source={require('@/assets/images/forgot-mascot.png')}
							className="w-[178px] h-[160px] mx-auto"
						/>
						<View>
							<MediumText className="text-3xl text-left tracking-tighter">
                Bạn quên mật khẩu?
							</MediumText>
							<NormalText className="text-tertiary mt-1">
                Vui lòng nhập số điện thoại di động để tìm kiếm tài khoản của
                bạn
							</NormalText>
						</View>
						<View className="w-full space-y-4 mt-8">
							<TextInput
								className="h-12 px-4 py-3 border border-gray-300 rounded-lg  focus:border-primary"
								placeholder="Số điện thoại"
								style={{ fontFamily: 'Inter' }}
							/>
						</View>
						<View className="w-full mt-8 space-y-2">
							<TextButton
								text="Xác nhận"
								type={TextButtonType.PRIMARY}
								href="/(authentication)/reset-password"
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

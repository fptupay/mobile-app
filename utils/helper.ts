import { Dimensions } from 'react-native'

export const formatMoney = (value: number) => {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')

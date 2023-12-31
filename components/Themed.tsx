/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  Image as DefaultImage,
  useColorScheme
} from 'react-native'
import { SafeAreaView as DefaultSafeAreaView } from 'react-native-safe-area-context'

import Colors from '../constants/Colors'

type ThemeProps = {
  lightColor?: string
  darkColor?: string
}

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props']
export type ImageProps = ThemeProps & DefaultImage['props']

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light
) {
  const theme = useColorScheme() ?? 'light'
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

export function NormalText(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return (
    <DefaultText
      style={[{ color }, style, { fontFamily: 'Inter' }]}
      {...otherProps}
    />
  )
}

export function MediumText(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return (
    <DefaultText
      style={[{ color }, style, { fontFamily: 'Inter-Medium' }]}
      {...otherProps}
    />
  )
}

export function SemiText(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return (
    <DefaultText
      style={[{ color }, style, { fontFamily: 'Inter-SemiBold' }]}
      {...otherProps}
    />
  )
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function SafeAreaView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )

  return (
    <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  )
}

export function Image(props: ImageProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const tintColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text'
  )

  return <DefaultImage tintColor={tintColor} style={[style]} {...otherProps} />
}

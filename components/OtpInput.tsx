import { forwardRef, useImperativeHandle } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import Colors from '../constants/Colors'
import { useOtpInput } from '../hooks/useOtpInput'
import { OtpInputProps, OtpInputRef } from '../types/OtpInput.type'
import { VerticalStick } from './VerticalStick'

export const OtpInput = forwardRef<OtpInputRef, OtpInputProps>((props, ref) => {
  const {
    models: { text, inputRef, focusedInputIndex },
    actions: { clear, handlePress, handleTextChange },
    forms: { setText }
  } = useOtpInput(props)
  const {
    numberOfDigits,
    focusColor = '#A4D0A4',
    focusStickBlinkingDuration,
    theme = {},
    type = 'uncovered'
  } = props
  const {
    containerStyle,
    inputsContainerStyle,
    pinCodeContainerStyle,
    pinCodeTextStyle,
    focusStickStyle
  } = theme

  useImperativeHandle(ref, () => ({ clear, setValue: setText }))

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputsContainer, inputsContainerStyle]}>
        {Array(numberOfDigits)
          .fill(0)
          .map((_, index) => {
            const char = text[index]
            const isFocusedInput = focusedInputIndex === index

            return (
              <Pressable
                key={`${char}-${index}`}
                onPress={handlePress}
                style={[
                  type === 'covered'
                    ? styles.codeContainerCovered
                    : styles.codeContainer,
                  isFocusedInput ? { borderColor: focusColor } : {},
                  pinCodeContainerStyle
                ]}
                accessibilityRole="button"
              >
                {isFocusedInput ? (
                  <VerticalStick
                    focusColor={focusColor}
                    style={focusStickStyle}
                    focusStickBlinkingDuration={focusStickBlinkingDuration}
                  />
                ) : (
                  // display * if there is a char, otherwise display nothing
                  <Text style={[styles.codeText, pinCodeTextStyle]}>
                    {char ? (type === 'covered' ? '*' : char) : ''}
                  </Text>
                )}
              </Pressable>
            )
          })}
      </View>
      <TextInput
        value={text}
        onChangeText={handleTextChange}
        maxLength={numberOfDigits}
        inputMode="numeric"
        ref={inputRef}
        style={styles.hiddenInput}
        testID="otp-input"
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  inputsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  codeContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#DFDFDE',
    height: 60,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  codeContainerCovered: {
    borderBottomWidth: 1,
    borderColor: '#DFDFDE',
    height: 60,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  codeText: {
    fontSize: 28,
    lineHeight: 38,
    color: Colors.tertiary
  },
  hiddenInput: {
    width: 1,
    height: 1,
    opacity: 0
  }
})

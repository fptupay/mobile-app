import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface TextFieldProps extends React.ComponentProps<typeof TextInput> {
  label: string;
  errorText?: string | null;
}

export default function TextField(props: TextFieldProps) {
  const {
    label,
    errorText,
    value,
    style,
    editable,
    onBlur,
    onFocus,
    ...otherProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  return (
    <View style={style}>
      <TextInput
        className={`p-4 font-semibold rounded-lg border border-gray-300 focus:border-primary ${
          !editable && "text-gray-500"
        }`}
        ref={inputRef}
        editable={editable}
        selectTextOnFocus={editable}
        {...otherProps}
        value={value}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
      />
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View
          style={{
            transform: [
              {
                scale: focusAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.75],
                }),
              },
              {
                translateY: focusAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, -7],
                }),
              },
              {
                translateX: focusAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, 0],
                }),
              },
            ],
          }}
          className="absolute px-2 bg-white -mt-1"
        >
          <Text className="text-sm text-gray-500 focus:text-primary">
            {label}
            {errorText ? "*" : ""}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {!!errorText && (
        <Text className="mt-1 ml-3 text-sm text-red-700">{errorText}</Text>
      )}
    </View>
  );
}

import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { OtpInput } from '../OtpInput'

describe('OtpInput', () => {
  test('should render the correct number of digits', () => {
    const { getAllByRole } = render(<OtpInput numberOfDigits={5} />)
    const inputs = getAllByRole('button')
    expect(inputs.length).toBe(5)
  })

  test('should render the correct filter color', () => {
    const { getAllByRole } = render(
      <OtpInput numberOfDigits={5} focusColor="red" />
    )
    const inputs = getAllByRole('button')
    expect(inputs[0].props.style[1].borderColor).toBe('red')
  })

  test('should invoke function when the text changes', () => {
    const mockSetOtpCode = jest.fn()
    const { getByTestId } = render(
      <OtpInput numberOfDigits={6} onTextChange={mockSetOtpCode} />
    )

    const input = getByTestId('otp-input')
    fireEvent.changeText(input, '123456')

    expect(mockSetOtpCode).toHaveBeenCalledWith('123456')
  })
})

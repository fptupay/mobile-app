import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import TextField from '../TextField'

describe('TextField', () => {
  test('should render the label', () => {
    const { getByText } = render(<TextField label="Mã sinh viên" />)
    expect(getByText('Mã sinh viên')).toBeDefined()
  })

  test('should display the error text', () => {
    const { getByText } = render(
      <TextField label="" errorText="Dữ liệu không hợp lệ" />
    )
    expect(getByText('Dữ liệu không hợp lệ')).toBeDefined()
  })

  test('should display the value', () => {
    const { getByDisplayValue } = render(<TextField value="John" label="" />)
    expect(getByDisplayValue('John')).toBeDefined()
  })

  test('should call onChangeText when the text changes', () => {
    const mockSetOwner = jest.fn()
    const { getByDisplayValue } = render(
      <TextField value="" label="" errorText="" onChangeText={mockSetOwner} />
    )

    const input = getByDisplayValue('')
    fireEvent.changeText(input, 'HE160005')

    expect(mockSetOwner).toHaveBeenCalledWith('HE160005')
  })

  test('should call onBlur when the input is blurred', () => {
    const mockSetOwner = jest.fn()
    const { getByDisplayValue } = render(
      <TextField value="" label="" errorText="" onBlur={mockSetOwner} />
    )

    const input = getByDisplayValue('')
    fireEvent(input, 'blur')

    expect(mockSetOwner).toHaveBeenCalled()
  })
})

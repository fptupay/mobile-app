// BEGIN: 8f7e6d5c3b2a
import { fireEvent, render } from '@testing-library/react-native'
import { useRouter } from 'expo-router'
import BackButton from '../buttons/BackButton'

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}))

describe('BackButton', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<BackButton href="test" />)
    expect(getByTestId('link')).toBeDefined()
  })

  it('should navigate on press', () => {
    const mockPush = {
      push: jest.fn()
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockPush)

    const { getByTestId } = render(<BackButton href="test" />)
    const button = getByTestId('link')
    fireEvent.press(button)

    expect(mockPush.push).toHaveBeenCalledWith('test')
  })
})

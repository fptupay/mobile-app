import { render } from '@testing-library/react-native'
import SelectField from '../SelectField'

describe('SelectField', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <SelectField label="Test Bank" description="Test Description" />
    )
    expect(getByText('Test Bank')).toBeDefined()
    expect(getByText('Test Description')).toBeDefined()
  })
})

import * as React from 'react'
import renderer from 'react-test-renderer'
import CustomIcon from '../Icon'

it('should render correctly', () => {
  const tree = renderer
    .create(<CustomIcon name="ChevronLeft" color="gray" size={30} />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})

import { IconProps } from '@/types/Icon.type'
import { useState } from 'react'

export const useTogglePassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true)
  const [icon, setIcon] = useState<IconProps['name']>('Eye')

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible)
    setIcon(icon === 'EyeOff' ? 'Eye' : 'EyeOff')
  }

  return { isPasswordVisible, icon, togglePassword }
}

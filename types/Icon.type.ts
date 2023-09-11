import * as icons from 'lucide-react-native'

export interface IconProps {
  name: keyof typeof icons;
  size?: number;
  color?: string;
}

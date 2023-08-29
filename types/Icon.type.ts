import * as icons from "lucide-react-native";

export interface IconProps {
  name: keyof typeof icons;
  size?: string;
  color?: string;
}

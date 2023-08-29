import * as icons from "lucide-react-native";
import { IconProps } from "../types/Icon.type";

const CustomIcon = ({ name, color, size }: IconProps) => {
  const Icon = icons[name] as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  return <Icon color={color} width={size} height={size} />;
};

export default CustomIcon;

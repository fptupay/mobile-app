import { Image, TextInput, View } from "react-native";
import { NormalText, SemiText } from "./Themed";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Colors from "../constants/Colors";
import { useBankStore } from "../stores/bankStore";

interface SelectFieldProps extends React.ComponentProps<typeof TextInput> {
  label: string;
  description?: string | null;
}

const IconComponent = () => {
  return <View className="w-3 h-3 bg-white rounded-full"></View>;
};

export default function SelectField(props: SelectFieldProps) {
  const { label, description, value, style, ...otherProps } = props;
  const selectedBank = useBankStore((state) => state.selectedBank);
  const setSelectedBank = useBankStore((state) => state.setSelectedBank);

  const handleSelectBank = (e: boolean) => {
    if (e) {
      setSelectedBank(label);
    } else {
      setSelectedBank("");
    }
  };

  return (
    <View
      {...otherProps}
      style={style}
      className={`p-4 rounded-lg flex flex-row items-center justify-between border ${
        selectedBank == label ? "border-primary" : "border-gray-300"
      }`}
    >
      <View className="flex flex-row gap-3 items-center">
        <Image source={require("../assets/images/techcombank.png")} />
        <View>
          <SemiText className="text-secondary capitalize">{label}</SemiText>
          <NormalText className="text-tertiary">{description}</NormalText>
        </View>
      </View>
      <View>
        <BouncyCheckbox
          onPress={(e) => handleSelectBank(e)}
          isChecked={selectedBank == label}
          fillColor={selectedBank == label ? Colors.primary : Colors.tertiary}
          unfillColor={Colors.tertiary}
          iconStyle={{ borderColor: Colors.tertiary }}
          className="w-7 h-7"
          iconImageStyle={{ display: "none" }}
          iconComponent={<IconComponent />}
        />
      </View>
    </View>
  );
}

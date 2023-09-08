import { StatusBar } from "expo-status-bar";
import {
    Text,
  Image,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MediumText } from "../components/Themed";
import TextButton, {
  TextButtonType,
} from "../components/buttons/TextButton";
import {useNavigation} from '@react-navigation/native';


export default function addBankSuccess() {
    const navigation = useNavigation();
    const handleTextButtonClick = () => {
        navigation.navigate("add-bank", { setDepositSuccessful: true });
    };
    
  return (
    <SafeAreaView className="flex-1 px-4">
       <StatusBar style="auto" />
       <View className="flex-1 justify-center space-y-8">
            <Image
              source={require("../assets/images/reset-mascot.png")}
              className="w-[220px] h-[160px] mx-auto"
            />
            <MediumText className='text-2xl tracking-tight text-center'>Liên kết thành công!</MediumText>
       </View>
        <View className="w-full space-y-2 mb-10">
            <TextButton
            text="Nạp tiền ngay"
            type={TextButtonType.PRIMARY}
            onPress={handleTextButtonClick}
            />
        </View>
    </SafeAreaView>
  )
}

import SharedLayout from "../../components/SharedLayout";
import TextField from "../../components/TextField";
import { Image } from "react-native";
import { NormalText, SemiText, View } from "../../components/Themed";
import TextButton, {
  TextButtonType,
} from "../../components/buttons/TextButton";

export default function AddBankItem() {
  return (
    <SharedLayout href="/(main-features)/load-money" title="Agribank">
      <View className="pt-5 py-10 bg-transparent h-full flex flex-col justify-between">
        <View className="bg-transparent">
          <View className="bg-transparent">
            <SemiText className="text-secondary">Thông tin liên kết</SemiText>
            <TextField
              label="Số thẻ/tài khoản"
              className="my-5"
              value="001912111545484878"
            />
            <TextField label="Chủ thẻ" value="CAO QUYNH ANH" />
          </View>
        </View>

        <View className="bg-transparent">
          <View className="bg-transparent flex flex-row gap-x-2 items-center mb-4">
            <Image
              source={require("../../assets/images/tick.png")}
              className="w-6 h-6"
            />
            <NormalText className="text-tertiary flex-1 text-xs">
              Mọi thông tin đều được mã hóa để bảo mật thông tin sinh viên.{" "}
              <NormalText className="text-primary">Tìm hiểu thêm</NormalText>
            </NormalText>
          </View>
          <TextButton
            href="/"
            text="Liên kết ngay"
            type={TextButtonType.SECONDARY}
          />
        </View>
      </View>
    </SharedLayout>
  );
}

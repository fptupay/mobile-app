import SharedLayout from "../../components/SharedLayout";
import TextField from "../../components/TextField";
import { Image } from "react-native";
import { NormalText, SemiText, View } from "../../components/Themed";
import TextButton, {
  TextButtonType,
} from "../../components/buttons/TextButton";
import SelectField from "../../components/SelectField";
import IconButton from "../../components/buttons/IconButton";

export default function LoadMoney() {
  return (
    <SharedLayout href="/(account)" title="Nạp tiền">
      <View className="pt-5 py-10 bg-transparent h-full flex flex-col justify-between">
        <View className="bg-transparent">
          <View className="bg-transparent">
            <SemiText className="text-secondary">
              Nạp tiền vào ví FPTU Pay
            </SemiText>
            <TextField
              label="Số tiền trong ví"
              className="my-5"
              value="20.567.000đ"
            />
            <TextField label="Số tiền cần nạp" />
          </View>
          <View className="py-8 bg-transparent">
            <SemiText className="text-secondary">Từ ngân hàng</SemiText>
            <SelectField
              label="techcombank"
              description="Miễn phí thanh toán"
              className="my-5"
            />
            <IconButton
              label="Thêm ngân hàng"
              description='Miễn phí nạp, rút tiền'
              href="/"
            />
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
            text="Thanh toán"
            type={TextButtonType.PRIMARY}
          />
        </View>
      </View>
    </SharedLayout>
  );
}

import SharedLayout from "../components/SharedLayout";
import TextField from "../components/TextField";
import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { MediumText, NormalText, SemiText } from "../components/Themed";
import TextButton, { TextButtonType } from "../components/buttons/TextButton";
import SelectField from "../components/SelectField";
import IconButton from "../components/buttons/IconButton";
import { useState } from "react";
import { BlurView } from "expo-blur";
import { useRoute, RouteProp } from "@react-navigation/native";
import { AddBankRouteParams } from "./add-bank";
import { useBankStore } from "../stores/bankStore";

const listBank = [
  {
    id: 1,
    label: "techcombank",
    description: "Miễn phí thanh toán",
  },
  {
    id: 2,
    label: "vietcombank",
    description: "Miễn phí thanh toán",
  },
  {
    id: 3,
    label: "Viettinbank",
    description: "Miễn phí thanh toán",
  },
];

export default function LoadMoney() {
  const route =
    useRoute<RouteProp<Record<string, AddBankRouteParams>, string>>();
  const [amount, setAmount] = useState("");
  const setDepositSuccessful = route.params?.setDepositSuccessful || false;
  const [depositSuccessfulVisible, setDepositSuccessfulVisible] =
    useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const selectedBank = useBankStore((state) => state.selectedBank);

  const handleAmountInput = (value: string) => {
    setAmount(value);
  };

  return (
    <SharedLayout href="/(account)" title="Nạp tiền">
      <View className="pt-5 py-10 bg-transparent flex flex-col justify-between">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          <View className="bg-transparent">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="bg-transparent">
                <SemiText className="text-secondary">
                  Nạp tiền vào ví FPTU Pay
                </SemiText>
                <TextField
                  label="Số tiền trong ví"
                  className="my-5"
                  value="20.567.000đ"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <TextField
                  keyboardType="numeric"
                  label="Số tiền cần nạp"
                  editable={true}
                  selectTextOnFocus={true}
                  value={amount}
                  onChangeText={handleAmountInput}
                />
              </View>
            </TouchableWithoutFeedback>

            <View className="py-8 bg-transparent">
              <SemiText className="text-secondary mb-5">Từ ngân hàng</SemiText>
              {listBank.map((item) => (
                <SelectField
                  key={item.id}
                  label={item.label}
                  description={item.description}
                  className="mb-5"
                />
              ))}
              <IconButton
                label="Thêm ngân hàng"
                description="Miễn phí nạp, rút tiền"
                href="/add-bank"
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View className="bg-white p-4 pb-10 shadow-sm shadow-primary absolute right-0 left-0 bottom-0">
        <View className="bg-transparent flex flex-row gap-x-2 items-center mb-4">
          <Image
            source={require("../assets/images/tick.png")}
            className="w-6 h-6"
          />
          <NormalText className="text-tertiary flex-1 text-xs">
            Mọi thông tin đều được mã hóa để bảo mật thông tin sinh viên.{" "}
            <NormalText className="text-primary">Tìm hiểu thêm</NormalText>
          </NormalText>
        </View>
        <TextButton
          text="Thanh toán"
          type={TextButtonType.PRIMARY}
          href="(main-features)/add-bank-item"
          disable={selectedBank == "" || amount == ""}
        />
      </View>
      {setDepositSuccessful && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={depositSuccessfulVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <BlurView
            intensity={15}
            style={{ flex: 1, backgroundColor: "rgba(80, 80, 80, 0.80)" }}
          >
            <View className="flex-1 justify-end mb-24 px-4">
              <View className="bg-white w-full h-[400px] rounded-lg shadow-2xl">
                <Image
                  source={require("../assets/images/deposit.gif")}
                  className="w-[220px] h-[160px] mx-auto"
                />
                <MediumText className="text-2xl tracking-tight text-center text-secondary">
                  Nạp tiền thành công!
                </MediumText>

                <View className="w-full top-12 px-4">
                  <TextButton
                    text="Tạo giao dịch mới"
                    type={TextButtonType.PRIMARY}
                    href="/load-money"
                  />
                </View>
                <View className="w-full top-12 mt-2 px-4 pb-4">
                  <TextButton
                    text="Về màn hình chính"
                    type={TextButtonType.SECONDARY}
                    href="/(account)"
                  />
                </View>
              </View>
            </View>
          </BlurView>
        </Modal>
      )}
    </SharedLayout>
  );
}

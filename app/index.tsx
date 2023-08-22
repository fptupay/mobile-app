import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { MediumText, NormalText, View } from "../components/Themed";
import { Link } from "expo-router";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <MediumText className="text-tertiary">This is a text</MediumText>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <Link href="/ekyc-rule" className="text-center ">
        <NormalText className="text-primary">Go to rule</NormalText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

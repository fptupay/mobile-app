import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { MediumText, View } from "../components/Themed";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <MediumText className="text-tertiary">This is a text</MediumText>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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

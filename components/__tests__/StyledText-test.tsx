import { render, screen } from "@testing-library/react-native";
import { MonoText } from "../StyledText";

it(`renders correctly`, () => {
  render(<MonoText>Hello</MonoText>);
  expect(screen.getByText("Hello")).toBeTruthy();
});

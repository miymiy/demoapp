import Constants from "expo-constants";
import { Dimensions } from "react-native";

const window = Dimensions.get("window");

export const color = {
  white: "#ffffff",
  prezzeeRed: "#E30B17",
  charcoal: "#313E49",
  activeBlue: "#3E77B0",
  darkGrey: "#444444",
  midGrey: "#767676",
  lightGrey: "#A9AAA9",
  errorRed: "#FF747C",
  paleGrey: "#F8F8F8",
  backgrondGrey: "#E5E5E5",
  green: "#25AE88",
  orange: "#DC5800",
  yellow: "#FAA731",
};

export const screen = {
  paddingXSmall: 12,
  paddingX: 24,
  marginTop: Constants.statusBarHeight + 10,
  titleMaxWidth: 300,
};

export const card = {
  horizontalMargin: 4,
  width: window.width - screen.paddingX * 2 + 4 * 2,
  height: 185,
  expandedHeight: Constants.statusBarHeight + 256,
  borderRadius: 14,
};

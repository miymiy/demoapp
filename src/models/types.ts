import { TextProps } from "react-native";
import { GiftStatusLabel } from "./enums";

export type TextPropType = React.PropsWithChildren<TextProps>;

export type Order = {
  id: string;
  name: string;
  number: string;
  amount: string;
  currency: string;
  image: string;
  status: GiftStatusLabel;
};

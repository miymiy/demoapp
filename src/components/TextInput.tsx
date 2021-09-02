import * as React from "react";
import { TextInput as RNTextInput, TextInputProps } from "react-native";
import { color } from "../constants/styles";
import styled from "styled-components/native";

const Input = styled.TextInput`
  padding-top: 0px;
  padding-bottom: 2px;
  font-size: 16px;
  border-bottom-color: ${(props: { invalid?: boolean }) =>
    props.invalid ? color.errorRed : color.activeBlue};
  border-bottom-width: 2px;
  color: ${color.charcoal};
  font-weight: 500;
`;

export interface Props extends TextInputProps {
  invalid?: boolean;
}

export type TextInputRef = RNTextInput;

const TextInput = (
  { invalid = false, ...rest }: Props,
  ref: React.Ref<RNTextInput>
) => {
  return <Input invalid={invalid} {...rest} ref={ref} />;
};

export default React.forwardRef<RNTextInput, Props>(TextInput);

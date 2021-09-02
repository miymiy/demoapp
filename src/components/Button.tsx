import * as React from "react";
import { ActivityIndicator, GestureResponderEvent } from "react-native";
import { color } from "../constants/styles";
import styled from "styled-components/native";

import TextBase from "./TextBase";

interface StyledProps {
  type: "primary" | "secondary" | "outline" | "link";
  disabled?: boolean;
  size?: "sm" | "md";
}

interface Props extends StyledProps {
  loading?: boolean;
  style?: any;
  onPress: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
}

const BtnContainer = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: ${(props: StyledProps) => {
    switch (props.type) {
      case "primary":
        return color.prezzeeRed;
      case "secondary":
        return color.charcoal;
      case "outline":
        return color.white;
      case "link":
        return "transparent";
      default:
        return color.white;
    }
  }};
  padding-vertical: ${(props: StyledProps) => {
    if (props.size === "sm") {
      return props.type === "outline" ? "7px" : "8px";
    }
    return props.type === "outline" ? "13px" : "14px";
  }};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  border-width: ${(props: StyledProps) => (props.type === "outline" ? "2px" : "0px")};
  border-color: ${color.prezzeeRed};
`;

const BtnText = styled(TextBase)`
  color: ${(props: StyledProps) => {
    switch (props.type) {
      case "primary":
        return color.white;
      case "secondary":
        return color.white;
      case "outline":
        return color.prezzeeRed;
      case "link":
        return color.activeBlue;
      default:
        return color.charcoal;
    }
  }};
  opacity: ${(props: StyledProps) => (props.disabled ? 0.8 : 1)};
  font-weight: ${(props: StyledProps) => {
    switch (props.type) {
      case "primary":
      case "secondary":
      case "outline":
        return props.size === "sm" ? 600 : 700;
      case "link":
        return 500;
      default:
        return "normal";
    }
  }};
  font-size: ${(props: StyledProps) => (props.size === "sm" ? "14px" : "16px")};
  text-align: center;
`;

const Button = ({
  type,
  style,
  onPress,
  children,
  disabled,
  loading,
  size,
}: Props) => (
  <BtnContainer
    style={style}
    type={type}
    onPress={onPress}
    disabled={disabled}
    size={size}
  >
    {loading ? (
      <ActivityIndicator size="small" color={color.white} />
    ) : (
      <BtnText disabled={disabled} size={size} type={type}>
        {children}
      </BtnText>
    )}
  </BtnContainer>
);

export default Button;

import Constants from "expo-constants";
import * as React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { color, screen } from "../constants/styles";
import styled from "styled-components/native";

import TextBody from "./TextBody";
const window = Dimensions.get("window");
const BACK_ICON_SIZE = 18;
export const SCREEN_HEADER_HEIGHT =
  Constants.statusBarHeight + BACK_ICON_SIZE + 30;

const isNullOrUndefined = (value: any) => value === null || value === undefined;

const Container = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  width: ${window.width}px;
  background-color: transparent;
  height: ${SCREEN_HEADER_HEIGHT}px;
`;

const BackIcon = styled.Image`
  margin-top: ${screen.marginTop}px;
  margin-left: ${screen.paddingXSmall}px;
  margin-right: 30px;
  tint-color: ${color.charcoal};
  height: 23px;
  width: 20px;
`;

const CloseIcon = styled.Image`
  margin-top: ${screen.marginTop}px;
  margin-left: ${screen.paddingX}px;
  margin-right: 30px;
  tint-color: ${color.charcoal};
  height: ${BACK_ICON_SIZE}px;
  width: ${BACK_ICON_SIZE}px;
`;

const LeftContainer = styled.TouchableOpacity`
  left: 0px;
  bottom: 0px;
  top: 0px;
  position: absolute;
`;

const CenterContainer = styled(Animated.View)`
  margin-top: ${Constants.statusBarHeight + 10}px;
  align-self: center;
`;

const CenterText = styled(TextBody)`
  color: ${color.charcoal};
  text-align: center;
  font-weight: 600;
`;

const RightContainer = styled.TouchableOpacity`
  right: 0px;
  bottom: 0px;
  top: 0px;
  position: absolute;
`;

const RightButtonText = styled(TextBody)`
  margin-top: ${screen.marginTop}px;
  margin-right: ${screen.paddingXSmall}px;
  margin-left: 30px;
  color: ${(props: { disabled: boolean }) =>
    props.disabled ? color.lightGrey : color.charcoal};
  font-weight: 500;
`;

export interface Props {
  style?: any;
  leftIcon?: "close" | "back";
  scrollY?: Animated.Value | Animated.AnimatedAddition;
  onPress?: () => void;
  animated?: boolean;
  leftButtonEnabled?: boolean;
  rightButtonText?: string;
  rightButtonEnabled?: boolean;
  rightButtonOnPress?: () => void;
  title?: string;
  animStartYOffset?: number;
}

const ScreenHeader = ({
  onPress,
  style,
  animated = true,
  leftButtonEnabled = true,
  rightButtonEnabled,
  rightButtonText,
  rightButtonOnPress,
  title,
  scrollY,
  animStartYOffset,
  leftIcon = "close",
}: Props) => {
  const startYOffset = isNullOrUndefined(animStartYOffset)
    ? SCREEN_HEADER_HEIGHT * 0.3
    : animStartYOffset;
  const opacityAnim = scrollY
    ? scrollY.interpolate({
        inputRange: [0, startYOffset, startYOffset + 10],
        outputRange: [0, 0, 1],
        extrapolate: "clamp",
      })
    : 0;

  const getAccessibilityLabel = () => {
    if (leftIcon === "back") {
      return "Go back";
    }

    return "Close";
  };

  return (
    <Container style={style}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: color.white,
            borderBottomWidth: 1,
            borderColor: color.lightGrey,
            opacity: animated ? opacityAnim : 1,
          },
        ]}
      />
      {leftButtonEnabled && onPress && (
        <LeftContainer
          onPress={onPress}
          accessibilityLabel={getAccessibilityLabel()}
        >
          {leftIcon === "close" && (
            <CloseIcon
              resizeMode="contain"
              source={require("../../assets/images/close-icon.png")}
              fadeDuration={0}
            />
          )}
          {leftIcon === "back" && (
            <BackIcon
              resizeMode="contain"
              source={require("../../assets/images/back-icon.png")}
              fadeDuration={0}
            />
          )}
        </LeftContainer>
      )}

      {title && (
        <CenterContainer
          style={{
            opacity: animated ? opacityAnim : 1,
          }}
        >
          <CenterText>{title}</CenterText>
        </CenterContainer>
      )}
      {rightButtonOnPress && (
        <RightContainer
          disabled={!rightButtonEnabled}
          onPress={rightButtonOnPress}
        >
          <RightButtonText disabled={!rightButtonEnabled}>
            {rightButtonText || "Submit"}
          </RightButtonText>
        </RightContainer>
      )}
    </Container>
  );
};

export default ScreenHeader;

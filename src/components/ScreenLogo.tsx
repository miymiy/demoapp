import LottieView from "lottie-react-native";
import * as React from "react";
import { color, screen } from "../constants/styles";
import styled from "styled-components/native";

import TextBody from "./TextBody";

const Container = styled.View`
  margin-top: ${screen.marginTop}px;
  align-items: center;
`;

const Logo = styled(LottieView)`
  margin-bottom: 18px;
  width: 60px;
  height: 60px;
`;

const LogoText = styled(TextBody)`
  font-weight: 500;
  color: ${color.midGrey};
`;

export interface Props {
  style?: any;
  loop?: boolean;
  source: string;
  text?: string;
  onTitleLayout?: (yOffset: number) => void;
}

const ScreenLogo = ({
  style,
  source,
  text,
  onTitleLayout,
  loop = false,
}: Props) => {
  return (
    <Container style={style}>
      <Logo autoPlay={true} source={source} loop={loop} />
      {text && (
        <LogoText
          onLayout={(e) => {
            const {
              nativeEvent: {
                layout: { y, height },
              },
            } = e;
            if (onTitleLayout) {
              onTitleLayout(screen.marginTop + y + height);
            }
          }}
        >
          {text}
        </LogoText>
      )}
    </Container>
  );
};

export default ScreenLogo;

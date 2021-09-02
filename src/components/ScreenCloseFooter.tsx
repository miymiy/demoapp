import Constants from "expo-constants";
import * as React from "react";
import { color, screen } from "../constants/styles";
import styled from "styled-components/native";

import Button from "./Button";

const Container = styled.View`
  flex: 1;
  background-color: ${color.white};
  padding-horizontal: ${screen.paddingX}px;
  padding-top: ${screen.paddingX}px;
  padding-bottom: ${Constants.statusBarHeight}px;
`;

interface Props {
  text?: string;
  close: () => void;
  disabled?: boolean;
}

const ScreenCloseFooter = ({ text, close, disabled = false }: Props) => {
  return (
    <Container>
      <Button type="primary" onPress={close} disabled={disabled}>
        {text || "Close"}
      </Button>
    </Container>
  );
};

export default ScreenCloseFooter;

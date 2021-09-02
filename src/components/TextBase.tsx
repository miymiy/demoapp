import * as React from "react";
import { TextPropType } from "../models/types";
import { color } from "../constants/styles";
import styled from "styled-components/native";

const Container = styled.Text`
  color: ${color.charcoal};
`;

const TextBase = ({ children, ...rest }: TextPropType) => (
  <Container {...rest} allowFontScaling={false}>
    {children}
  </Container>
);

export default TextBase;

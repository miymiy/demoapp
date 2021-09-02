import Constants from "expo-constants";
import * as React from "react";
import { screen } from "../constants/styles";
import styled from "styled-components/native";

const Container = styled.View`
  margin-top: ${Constants.statusBarHeight}px;
  padding-horizontal: ${screen.paddingX}px;
`;

interface Props {
  showLoading: boolean;
  render: () => React.ReactNode;
}

const ParallaxScrollViewForeground = ({ showLoading, render }: Props) => {
  if (showLoading) {
    return null;
  }

  return <Container>{render()}</Container>;
};

export default ParallaxScrollViewForeground;

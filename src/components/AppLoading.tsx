import LottieView from 'lottie-react-native';
import * as React from 'react';
import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { color } from '../constants/styles';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${color.prezzeeRed};
`;

const Animate = styled(LottieView)`
  width: 200px;
  height: 240px;
`;

const AppLoading = () => (
  <Container>
    {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
    <Animate autoPlay={true} source={require('../../assets/animations/gift.json')} loop={false} />
  </Container>
);

export default AppLoading;

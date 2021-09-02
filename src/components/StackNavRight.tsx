import * as React from 'react';
import { screen } from '../constants/styles';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity``;

// This margin is important in order to enlarge clickable area
const Wrapper = styled.View`
  margin-right: ${screen.paddingXSmall}px;
  margin-left: 30px;
`;

interface Props {
  onPress: () => void;
  children: React.ReactNode;
  style?: any;
}

const StackNavRight = ({ onPress, children, style }: Props) => (
  <Container onPress={onPress}>
    <Wrapper style={style}>{children}</Wrapper>
  </Container>
);

export default StackNavRight;

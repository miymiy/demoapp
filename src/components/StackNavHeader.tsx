import * as React from 'react';
import styled from 'styled-components/native';

import StackNavRight from './StackNavRight';
import StackNavLeft from './StackNavLeft';

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  min-height: 23px;
`;

const LeftContainer = styled.View`
  left: 0px;
  bottom: 0px;
  top: 0px;
  position: absolute;
`;

const RightContainer = styled.View`
  right: 0px;
  bottom: 0px;
  top: 0px;
  position: absolute;
`;

interface Props {
  children: React.ReactNode;
  tintColor: string;
  close: () => void;
  navRight?: React.ReactNode;
  navRightOnPress?: () => void;
}

const StackNavHeader = ({ close, navRight, navRightOnPress, tintColor, children }: Props) => {
  return (
    <Container>
      <LeftContainer>
        <StackNavLeft close={close} tintColor={tintColor} />
      </LeftContainer>
      {children}
      {navRight && (
        <RightContainer>
          {navRightOnPress ? <StackNavRight onPress={navRightOnPress}>{navRight}</StackNavRight> : navRight}
        </RightContainer>
      )}
    </Container>
  );
};

export default StackNavHeader;

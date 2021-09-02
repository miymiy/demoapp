import * as React from 'react';
import navigationService from '../navigation/navigationService';
import { HOME_SCREEN } from '../constants/screens';
import { color } from '../constants/styles';
import styled from 'styled-components/native';

import StackNavHeader from './StackNavHeader';

const Logo = styled.Image`
  width: 76px;
  height: 29px;
`;


const HomeFixedHeader = () => {

  return (
    <StackNavHeader
      tintColor={color.white}
      close={() => {
        navigationService.navigate(HOME_SCREEN);
      }}
    >
      <Logo
        source={require('../../assets/images/prezzee-logo-white.png')}
        resizeMode="contain"
      />
    </StackNavHeader>
  );
};

export default HomeFixedHeader;

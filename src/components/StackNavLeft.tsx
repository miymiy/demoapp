import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { screen } from '../constants/styles';
import styled from 'styled-components/native';

// const BackIcon = styled.Image`
//   margin-left: ${screen.paddingXSmall};
//   margin-right: 30;
//   height: 23;
//   width: 20;
// `;

interface Props {
  close: () => void;
  tintColor: string;
}

const StackNavLeft = ({ close, tintColor }: Props) => {
  return (
    <TouchableOpacity onPress={close}>
      {/* <BackIcon
        style={{
          tintColor
        }}
        fadeDuration={0}
        resizeMode="contain"
        source={require('../../assets/images/back-icon.png')}
      /> */}
    </TouchableOpacity>
  );
};

export default StackNavLeft;

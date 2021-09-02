import React from 'react';
import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { color } from '../constants/styles';

const window = Dimensions.get('window');
const LayOver = styled(Animated.View)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: ${window.height}px;
  flex: 1;
  z-index: 50;
  background-color: ${color.prezzeeRed};
`;

const FakeFadeIn = () => {
  const animatedVal = React.useRef(new Animated.Value(1)).current;
  const [isAnimating, setIsAnimating] = React.useState(true);
  
  React.useEffect(() => {
    Animated.timing(animatedVal, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
    setTimeout(() => {
      setIsAnimating(false);
    }, 310);
  }, []);
  
  return (
    isAnimating && <LayOver
      style={{
        opacity: animatedVal
      }}
    ></LayOver>
  );
}

export default FakeFadeIn;

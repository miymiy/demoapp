import * as React from 'react';
import { color, screen } from '../constants/styles';
import styled from 'styled-components/native';

import ParallaxScrollViewLoading from './ParallaxScrollViewLoading';
import TextBody from './TextBody';

const HeaderContainer = styled.View`
  margin-top: -30px;
  padding-horizontal: ${screen.paddingXSmall}px;
`;

const TitleText = styled(TextBody)`
  margin-top: 28px;
  padding-left: ${screen.paddingXSmall}px;
  color: ${color.charcoal};
  margin-bottom: 18px;
  font-weight: 600;
`;

interface HeaderProps {
  loading: boolean;
  title?: string;
}

type Props = React.PropsWithChildren<HeaderProps>;

const ParallaxScrollViewHeader = ({
  loading,
  title,
  children
}: Props) => {
  return (
    <HeaderContainer>
      {loading ? (
        <ParallaxScrollViewLoading />
      ) : (
        <>
          {children}
          {title && <TitleText>{title}</TitleText>}
        </>
      )}
    </HeaderContainer>
  );
};

export default ParallaxScrollViewHeader;

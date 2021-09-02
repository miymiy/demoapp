import * as React from 'react';
import Placeholder, { Box } from 'rn-placeholder';
import styled from 'styled-components/native';

const ContentContainer = styled.View`
  margin-top: 30px;
`;

const TitleContainer = styled.View`
  margin-bottom: 18px;
`;

const ParallaxScrollViewLoading = () => (
  <Placeholder animation="fade">
    <ContentContainer>
      <TitleContainer>
        <Box height={18} width="30%" radius={4} animate="fade" />
      </TitleContainer>
      <Box height={118} width="100%" radius={10} animate="fade" />
    </ContentContainer>
    <ContentContainer>
      <TitleContainer>
        <Box height={18} width="30%" radius={4} animate="fade" />
      </TitleContainer>
      <Box height={128} width="100%" radius={10} animate="fade" />
    </ContentContainer>
    <ContentContainer>
      <Box height={118} width="100%" radius={10} animate="fade" />
    </ContentContainer>
  </Placeholder>
);

export default ParallaxScrollViewLoading;

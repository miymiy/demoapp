import * as React from "react";
import { color } from "../constants/styles";
import styled from "styled-components/native";
import TextBody from "../components/TextBody";

const Line = styled.View`
  background-color: ${(props) =>
    props.isEven ? color.white : color.backgrondGrey};
  border-radius: 8px;
  padding-vertical: 13px;
  padding-horizontal: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const TitleContainer = styled.View`
  width: 130px;
`;

const Title = styled(TextBody)`
  font-weight: 600;
`;

const ValueContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

type Props = {
  isEven: boolean;
  name: string;
  value?: string;
  children?: React.ReactElement;
};

const DetailsLine = ({ isEven, name, value = "", children }: Props) => {
  return (
    <Line isEven={isEven}>
      <TitleContainer>
        <Title>{name}</Title>
      </TitleContainer>
      <ValueContainer>
        {value !== "" && <TextBody>{value}</TextBody>}
        {children}
      </ValueContainer>
    </Line>
  );
};

export default DetailsLine;

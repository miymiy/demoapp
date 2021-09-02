import React from "react";
import TextBody from "./TextBody";
import styled from "styled-components/native";
import { color } from "../constants/styles";
import { Order } from "../models/types";
import StatusLabel from "./StatusLabel";
import navigationService from "../navigation/navigationService";
import { HOME_ORDER_DETAIL_SCREEN } from "../constants/screens";

const Container = styled.TouchableOpacity`
  margin-horizontal: 20px;
  background-color: white;
  margin-bottom: 10px;
  padding-horizontal: 15px;
  padding-vertical: 15px;
  border-radius: 8px;
  border-color: ${color.paleGrey};
  border-width: 1px;
  display: flex;
  flex-direction: row;
`;

const Image = styled.Image`
  width: 113px;
  height: 70px;
  border-radius: 8px;
`;

const Details = styled.View`
  margin-left: 10px;
  flex: 1;
  margin-right: 5px;
`;

const Name = styled(TextBody)`
  font-weight: 600;
  margin-vertical: 6px;
`;

const StatusContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Amount = styled(TextBody)`
  color: ${color.midGrey};
`;

export const OrderItemFragment = `
  fragment OrderItem on Order {
    id
    name
    number
    amount
    currency
    image
    status
  }
`;

type Props = {
  order: Order;
};

const HomeListOrderItem = ({ order }: Props) => {
  return (
    <Container
      onPress={() => {
        navigationService.navigate(HOME_ORDER_DETAIL_SCREEN, {
          id: order.id,
        });
      }}
    >
      <Image
        fadeDuration={0}
        resizeMode="contain"
        source={{
          uri: order.image,
        }}
      />
      <Details>
        <Name>{order.name}</Name>
        <StatusContainer>
          <Amount>{`$${order.amount} ${order.currency}`}</Amount>
          <StatusLabel status={order.status} />
        </StatusContainer>
      </Details>
    </Container>
  );
};

export default HomeListOrderItem;

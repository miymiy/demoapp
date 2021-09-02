import gql from "graphql-tag";
import { Order } from "../models/types";
import { OrderItemFragment } from "./fragments";

export type OrdersQueryData = {
  orders: Order[];
};

export type OrderQueryData = {
  order: Order;
};

export type OrderQueryVar = {
  id: string;
};

export const OrdersQuery = gql`
  query orders {
    orders {
      ...OrderItem
    }
  }
  ${OrderItemFragment}
`;

export const OrderQuery = gql`
  query order($id: ID!) {
    order(id: $id) {
      ...OrderItem
    }
  }
  ${OrderItemFragment}
`;

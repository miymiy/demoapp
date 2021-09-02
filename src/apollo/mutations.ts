import gql from "graphql-tag";
import { OrderItemFragment } from "./fragments";
import { Order } from "../models/types";

export type DeleteOrderInput = {
  input: {
    id: string;
  };
};

export type DeleteOrderData = {
  deleteOrder: Order[];
};

export const DeleteOrderMutation = gql`
  mutation deleteOrder($input: DeleteOrderInput!) {
    deleteOrder(input: $input) {
      ...OrderItem
    }
  }
  ${OrderItemFragment}
`;

export type UpdateOrderInput = {
  input: {
    id: string;
    amount?: string;
  };
};

export type UpdateOrderData = {
  updateOrder: Order;
};

export const UpdateOrderMutation = gql`
  mutation updateOrder($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      ...OrderItem
    }
  }
  ${OrderItemFragment}
`;

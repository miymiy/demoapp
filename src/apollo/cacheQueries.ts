import client from './';
import gql from "graphql-tag";
import { Order } from '../models/types';

import { OrderItemFragment } from './fragments';

export const readOrder = (id: string) => {
  return client.readFragment<Order>({
    id: `Order:${id}`,
    fragment: gql`${OrderItemFragment}`
  });
};
import * as React from "react";
import styled from "styled-components/native";
import { Order } from "../models/types";
import DetailsLine from "./DetailsLine";
import { color } from "../constants/styles";
import { useMutation } from "@apollo/client";
import TextBody from "./TextBody";
import TextInput from "./TextInput";
import {
  UpdateOrderData,
  UpdateOrderInput,
  UpdateOrderMutation,
} from "../apollo/mutations";
import { fakeDelay } from "../utils";
import StatusLabel from "./StatusLabel";

const Container = styled.View`
  margin-top: 30px;
  margin-horizontal: 20px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.Image`
  border-radius: 8px;
  width: 226px;
  height: 140px;
  border-radius: 8px;
  margin-bottom: 25px;
`;

const Button = styled.TouchableOpacity``;
const ValueInput = styled(TextInput)`
  width: 70px;
`;

const EditText = styled(TextBody)`
  color: ${color.activeBlue};
  font-weight: 600;
`;

type Props = {
  order: Order;
  setSubmitting: (submitting: boolean) => void;
};

const HomeOrderDetailView = ({ order, setSubmitting }: Props) => {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(order.amount);
  const [updateOrder] = useMutation<UpdateOrderData, UpdateOrderInput>(
    UpdateOrderMutation,
    {
      variables: {
        input: { id: order.id, amount: value },
      },
      onCompleted: () => {
        fakeDelay(() => {
          setSubmitting(false);
          setEditing(false);
        });
      },
      onError: (e) => {
        console.log(JSON.stringify(e, null, 2));
        setEditing(false);
      },
      context: { ignoreGraphQLErrors: true, ignoreNetworkError: true },
    }
  );
  return (
    <Container>
      <Image
        fadeDuration={0}
        resizeMode="contain"
        source={{
          uri: order.image,
        }}
      />
      <DetailsLine isEven={false} name="Order number" value={order.number} />
      <DetailsLine isEven={true} name="Gift card type" value={order.name} />
      <DetailsLine
        isEven={false}
        name="Value"
        value={editing ? "" : `$${order.amount} ${order.currency}`}
      >
        <>
          {editing ? (
            <>
              <ValueInput
                keyboardType="number-pad"
                autoCorrect={false}
                allowFontScaling={false}
                value={value}
                onChangeText={(str: string) => {
                  setValue(str);
                }}
              />
              <TextBody>{order.currency}</TextBody>
            </>
          ) : null}
          <Button
            onPress={() => {
              if (editing) {
                setSubmitting(true);
                updateOrder();
                return;
              }
              setEditing(true);
            }}
          >
            <EditText>{editing ? "Save" : "Edit"}</EditText>
          </Button>
        </>
      </DetailsLine>
      <DetailsLine isEven={true} name="Status">
        <StatusLabel status={order.status} />
      </DetailsLine>
    </Container>
  );
};

export default HomeOrderDetailView;

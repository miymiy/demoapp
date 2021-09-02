import * as React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";
import ScreenCloseFooter from "../components/ScreenCloseFooter";
import ScreenScrollView from "../components/ScreenScrollView";

import { useQuery, useMutation } from "@apollo/client";
import NavigateTo from "../components/NavigateTo";
import { HOME_SCREEN } from "../constants/screens";
import HomeOrderDetailView from "../components/HomeOrderDetailView";
import { fakeDelay } from "../utils";
import {
  OrderQuery,
  OrderQueryData,
  OrderQueryVar,
  OrdersQuery,
} from "../apollo/queries";
import {
  DeleteOrderInput,
  DeleteOrderMutation,
  DeleteOrderData,
} from "../apollo/mutations";

const HomeOrderDetailsScreen = ({
  navigation,
}: NavigationStackScreenProps<{
  id: string;
}>) => {
  const id = navigation.getParam("id");
  const [submitting, setSubmitting] = React.useState(false);
  const { data, loading } = useQuery<OrderQueryData, OrderQueryVar>(
    OrderQuery,
    {
      variables: { id },
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-only",
      skip: !id,
    }
  );
  const [deleteOrder] = useMutation<DeleteOrderData, DeleteOrderInput>(
    DeleteOrderMutation,
    {
      variables: {
        input: { id },
      },
      update: (cache, { data: { deleteOrder } }) => {
        cache.writeQuery({
          query: OrdersQuery,
          data: { orders: deleteOrder },
        });
      },
      onCompleted: () => {
        fakeDelay(close);
      },
      onError: (e) => {
        console.log(JSON.stringify(e, null, 2));
        fakeDelay(() => {
          setSubmitting(false);
        });
      },
      context: { ignoreGraphQLErrors: true, ignoreNetworkError: true },
    }
  );
  const close = () => {
    navigation.goBack();
  };
  if (!id || (!loading && !data)) {
    return <NavigateTo routeName={HOME_SCREEN} />;
  }

  return (
    <ScreenScrollView
      loading={loading || submitting}
      title="Order details"
      logoSrc={require("../../assets/animations/basket.json")}
      onClose={close}
      fixFooter={
        <ScreenCloseFooter
          close={() => {
            setSubmitting(true);
            deleteOrder();
          }}
          text="Delete"
          disabled={loading || submitting}
        />
      }
    >
      {!loading && data.order && (
        <HomeOrderDetailView setSubmitting={setSubmitting} order={data.order} />
      )}
    </ScreenScrollView>
  );
};

export default HomeOrderDetailsScreen;

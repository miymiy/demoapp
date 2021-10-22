import * as React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";
import ScreenCloseFooter from "../components/ScreenCloseFooter";
import ScreenScrollView from "../components/ScreenScrollView";
import { useMutation } from "@apollo/client";
import NavigateTo from "../components/NavigateTo";
import { HOME_SCREEN } from "../constants/screens";
import HomeOrderDetailView from "../components/HomeOrderDetailView";
import { fakeDelay } from "../utils";
import {
  OrdersQuery,
} from "../apollo/queries";
import {
  DeleteOrderInput,
  DeleteOrderMutation,
  DeleteOrderData,
} from "../apollo/mutations";
import { readOrder } from '../apollo/cacheQueries';

const HomeOrderDetailsScreen = ({
  navigation,
}: NavigationStackScreenProps<{
  id: string;
}>) => {
  const id = navigation.getParam("id");
  const [loading, setLoading] = React.useState(false);
  const data = readOrder(id);
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
          setLoading(false);
        });
      },
      context: { ignoreGraphQLErrors: true, ignoreNetworkError: true },
    }
  );
  const close = () => {
    navigation.goBack();
  };
  if (!id) {
    return <NavigateTo routeName={HOME_SCREEN} />;
  }

  return (
    <ScreenScrollView
      loading={loading}
      title="Order details"
      logoSrc={require("../../assets/animations/basket.json")}
      onClose={close}
      fixFooter={
        <ScreenCloseFooter
          close={() => {
            setLoading(true);
            deleteOrder();
          }}
          text="Delete"
          disabled={loading}
        />
      }
    >
      {data && (
        <HomeOrderDetailView setSubmitting={setLoading} order={data} />
      )}
    </ScreenScrollView>
  );
};

export default HomeOrderDetailsScreen;

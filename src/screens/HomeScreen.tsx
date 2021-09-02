import React from "react";
import { useQuery } from "@apollo/client";
import Constants from "expo-constants";
import { FlatList, Platform, StatusBar } from "react-native";
import styled from "styled-components/native";
import FakeFadeIn from "../components/FakeFadeIn";
import HomeListOrderItem from "../components/HomeListOrderItem";
import { OrdersQuery, OrdersQueryData } from "../apollo/queries";
import HomeScrollView from "../components/HomeScrollView";
import { color } from "../constants/styles";
import { fakeDelay } from '../utils';

const Container = styled.View`
  padding-top: ${Constants.statusBarHeight}px;
  flex: 1;
  background-color: ${color.prezzeeRed};
`;

const HomeScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const { data, loading, refetch } = useQuery<OrdersQueryData>(OrdersQuery, {
    notifyOnNetworkStatusChange: true,
  });
  const renderScrollComponent = React.useCallback(
    (props) => (
      <HomeScrollView
        {...props}
        refreshing={refreshing}
        loading={loading}
        onRefresh={() => {
          setRefreshing(true);
          refetch()
            .then(() => {
              fakeDelay(() => {
                setRefreshing(false);
              });
            })
            .catch((e) => {
              console.log(e);
              setRefreshing(false);
            });
        }}
      />
    ),
    [refreshing, loading]
  );
  return (
    <>
      <FakeFadeIn />
      <Container>
        {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
        <FlatList
          removeClippedSubviews={Platform.OS === "android" ? false : true}
          data={data?.orders || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HomeListOrderItem order={item} />}
          renderScrollComponent={renderScrollComponent}
          // ListHeaderComponent={<ParallaxScrollViewHeader loading={loading} />}
        />
      </Container>
    </>
  );
};

export default HomeScreen;

import * as React from "react";
import { Dimensions, Image, ScrollViewProps } from "react-native";
import { card } from "../constants/styles";
import HomeScreenForeground from "./HomeScreenForeground";
import HomeFixedHeader from "./HomeFixedHeader";

import ParallaxScrollView from "./ParallaxScrollView";

const window = Dimensions.get("window");

interface Props extends ScrollViewProps {
  refreshing: boolean;
  loading: boolean;
  onRefresh: () => void;
}

export default class HomeScrollView extends React.Component<Props> {
  public render() {
    const { children, loading, onRefresh, refreshing, ...scrollViewProps } =
      this.props;

    return (
      <ParallaxScrollView
        {...scrollViewProps}
        fixHeader={<HomeFixedHeader />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        parallaxHeaderHeight={card.expandedHeight}
        background={
          <Image
            style={{
              height: card.expandedHeight,
              width: window.width,
              opacity: 0.2,
            }}
            source={require("../../assets/images/gift-bg.png")}
          />
        }
        foreground={<HomeScreenForeground loading={loading} />}
      >
        {children}
      </ParallaxScrollView>
    );
  }
}

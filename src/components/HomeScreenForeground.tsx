import * as React from "react";

import ParallaxScrollViewForeground from "./ParallaxScrollViewForeground";
interface Props {
  loading: boolean;
}

const HomeScreenForeground = ({ loading }: Props) => (
  <ParallaxScrollViewForeground
    showLoading={loading}
    render={() => {
      return null;
    }}
  />
);

export default HomeScreenForeground;

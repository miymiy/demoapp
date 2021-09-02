import * as React from "react";
import Constants from "expo-constants";
import {
  Animated,
  Dimensions,
  RefreshControl,
  ScrollViewProps,
  StyleSheet,
} from "react-native";
import { screen, color } from "../constants/styles";
import styled from "styled-components/native";

const window = Dimensions.get("window");
const refreshControlOffsetTop = screen.marginTop + 40;

const Container = styled.View`
  margin-top: -${Constants.statusBarHeight}px;
  flex: 1;
  background-color: transparent;
`;

const FixHeaderContainer = styled(Animated.View)`
  width: ${window.width}px;
  position: absolute;
  overflow: hidden;
  background-color: transparent;
  top: 0px;
  left: 0px;
`;

const FixHeaderWrapper = styled.View`
  margin-top: ${Constants.statusBarHeight}px;
  padding-bottom: 16px;
`;

const ScrollContainer = styled(Animated.ScrollView)`
  background-color: transparent;
  margin-top: ${Constants.statusBarHeight + 50}px;
`;

const ScrollWrapper = styled.View`
  background-color: transparent;
  overflow: hidden;
`;

const Background = styled(Animated.View)`
  position: absolute;
  background-color: transparent;
  overflow: hidden;
  top: 0px;
  width: ${window.width}px;
`;

const ChildrenContainer = styled.View`
  margin-top: -150px;
`;

export interface Props extends ScrollViewProps {
  onRefresh: () => void;
  refreshing: boolean;
  parallaxHeaderHeight: number;
  background: React.ReactNode;
  foreground: React.ReactNode;
  fixHeader: React.ReactNode;
  children: React.ReactNode;
}

interface State {
  scrollY: Animated.Value;
}

export default class ParallaxScrollView extends React.Component<Props, State> {
  public static defaultProps = {
    scrollEnabled: true,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  public render() {
    const {
      parallaxHeaderHeight,
      background,
      foreground,
      fixHeader,
      scrollEnabled,
      refreshing,
      onRefresh,
      stickyHeaderIndices,
      children,
      ...scrollViewProps
    } = this.props;
    return (
      <Container>
        <Background
          style={{
            transform: [
              {
                translateY: this.state.scrollY.interpolate({
                  inputRange: [0, parallaxHeaderHeight],
                  outputRange: [0, -parallaxHeaderHeight],
                  extrapolateRight: "extend",
                  extrapolateLeft: "clamp",
                }),
              },
              {
                scale: this.state.scrollY.interpolate({
                  inputRange: [-window.height, 0],
                  outputRange: [3 * 1.5, 1],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          {background}
        </Background>
        <ScrollContainer
          {...scrollViewProps}
          // need add 1 to exclude foreground from indices
          stickyHeaderIndices={
            stickyHeaderIndices && stickyHeaderIndices.map((i) => i + 1)
          }
          refreshControl={
            <RefreshControl
              tintColor={color.white}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          scrollEnabled={scrollEnabled}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
              useNativeDriver: true,
              listener: this.props.onScroll, // This is important to make "onEndReached" works
            }
          )}
        >
          <ScrollWrapper>
            <Animated.View
              style={{
                marginTop: -refreshControlOffsetTop,
                backgroundColor: "transparent",
                overflow: "hidden",
                height: parallaxHeaderHeight,
                opacity: this.state.scrollY.interpolate({
                  inputRange: [
                    0,
                    parallaxHeaderHeight * 0.5,
                    parallaxHeaderHeight * 0.75,
                    parallaxHeaderHeight,
                  ],
                  outputRange: [1, 0.3, 0.1, 0],
                  extrapolate: "clamp",
                }),
              }}
            >
              {foreground}
            </Animated.View>
          </ScrollWrapper>
          <ChildrenContainer>{children}</ChildrenContainer>
        </ScrollContainer>
        <FixHeaderContainer>
          <FixHeaderWrapper>
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: "transparent",
                  opacity: this.state.scrollY.interpolate({
                    inputRange: [
                      0,
                      parallaxHeaderHeight * 0.1,
                      parallaxHeaderHeight,
                    ],
                    outputRange: [0, 1, 1],
                    extrapolate: "clamp",
                  }),
                },
              ]}
            />
            {fixHeader}
          </FixHeaderWrapper>
        </FixHeaderContainer>
      </Container>
    );
  }
}

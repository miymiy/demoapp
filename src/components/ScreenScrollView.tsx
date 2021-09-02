import * as React from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  NativeEventSubscription,
  Platform,
  ScrollViewProps,
  StatusBar,
  StatusBarStyle,
  View,
} from "react-native";
import { color } from "../constants/styles";
import styled from "styled-components/native";

import ScreenHeader, { SCREEN_HEADER_HEIGHT } from "./ScreenHeader";
import ScreenLogo from "./ScreenLogo";

const window = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  background-color: transparent;
`;

const BodyContainer = styled.View`
  background-color: ${color.white};
  flex: 1;
`;

const ScrollContainer = styled(Animated.ScrollView)`
  flex: 1;
  background-color: transparent;
`;

const FixFooterContainer = styled.View`
  position: absolute;
  background-color: ${color.white};
  bottom: 0px;
  width: ${window.width}px;
`;

interface Props {
  children: React.ReactNode;

  onClose?: () => void;
  title?: string;
  logoSrc?: string;
  loading?: boolean;
  disableAndroidBackButton?: boolean;
  hideModalHeader?: boolean;
  fixFooter?: React.ReactNode;
  logoAnimationLoop?: boolean;

  statusBarStyle?: StatusBarStyle;
  headerAnimated?: boolean;
  headerLeftIcon?: "close" | "back";
  headerLeftButtonEnabled?: boolean;
  headerRightButtonText?: string;
  headerRightButtonEnabled?: boolean;
  headerRightButtonOnPress?: () => void;
}

interface State {
  scrollY: Animated.Value;
  headerAnimStartYOffset: number;
}

type ScreenScrollViewProps = Props & ScrollViewProps;

export default class ScreenScrollView extends React.Component<
  ScreenScrollViewProps,
  State
> {
  public static defaultProps = {
    scrollEnabled: true,
    statusBarStyle: "dark-content",
    disableAndroidBackButton: false,
    loading: false,
    logoAnimationLoop: false,
    keyboardAware: false,
  };
  private bodyRef: any;
  private footerHeight: number;
  private androidBackButtonEvent: NativeEventSubscription;

  constructor(props: Props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      headerAnimStartYOffset: null,
    };
    this.bodyRef = React.createRef();
    this.footerHeight = 0;
  }

  public componentDidMount() {
    this.androidBackButtonEvent = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return this.props.disableAndroidBackButton;
      }
    );
  }

  public componentWillUnmount() {
    if (this.androidBackButtonEvent) {
      this.androidBackButtonEvent.remove();
    }
  }

  public render() {
    const {
      onClose,
      fixFooter,
      hideModalHeader,
      headerLeftIcon,
      headerLeftButtonEnabled,
      headerRightButtonText,
      headerRightButtonOnPress,
      headerRightButtonEnabled,
      headerAnimated,
      children,
      scrollEnabled,
      title,
      statusBarStyle,
      logoSrc,
      loading,
      ...scrollViewProps
    } = this.props;

    return (
      <Container>
        {Platform.OS === "ios" && <StatusBar barStyle={statusBarStyle} />}

        {scrollEnabled ? (
          <ScrollContainer
            {...scrollViewProps}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              {
                useNativeDriver: true,
              }
            )}
          >
            {this.renderBodyContainer()}
          </ScrollContainer>
        ) : (
          this.renderBodyContainer()
        )}

        {!hideModalHeader && (
          <ScreenHeader
            leftIcon={headerLeftIcon}
            leftButtonEnabled={headerLeftButtonEnabled}
            rightButtonText={headerRightButtonText}
            rightButtonOnPress={headerRightButtonOnPress}
            rightButtonEnabled={headerRightButtonEnabled}
            onPress={onClose}
            animated={headerAnimated}
            scrollY={this.state.scrollY}
            animStartYOffset={this.state.headerAnimStartYOffset}
            title={title}
          />
        )}
        {fixFooter && (
          <FixFooterContainer>{this.renderFixFooter()}</FixFooterContainer>
        )}
      </Container>
    );
  }

  private renderBodyContainer() {
    return (
      <BodyContainer ref={this.bodyRef}>
        {this.renderLogo()}
        {this.props.children}
      </BodyContainer>
    );
  }

  private renderLogo() {
    const { loading, logoSrc, title, logoAnimationLoop } = this.props;

    if (!logoSrc) {
      return null;
    }

    if (loading) {
      return (
        <ScreenLogo
          key="spinner"
          onTitleLayout={(y) => {
            this.setState({ headerAnimStartYOffset: y - SCREEN_HEADER_HEIGHT });
          }}
          source={require("../../assets/animations/spinner.json")}
          text={title}
          loop={true}
        />
      );
    }

    return (
      <ScreenLogo
        key="logo"
        onTitleLayout={(y) => {
          this.setState({ headerAnimStartYOffset: y - SCREEN_HEADER_HEIGHT });
        }}
        source={logoSrc}
        text={title}
        loop={logoAnimationLoop}
      />
    );
  }

  private renderFixFooter = () => {
    return (
      <View
        onLayout={(e) => {
          // Adjust the bottom height so that we can scroll out of the fixed Footer
          const {
            nativeEvent: {
              layout: { height },
            },
          } = e;
          const footerHeight = height;
          if (this.footerHeight !== footerHeight) {
            this.bodyRef.current.setNativeProps({
              style: { marginBottom: footerHeight + 20 },
            });
            this.footerHeight = footerHeight;
          }
        }}
      >
        {this.props.fixFooter}
      </View>
    );
  };
}

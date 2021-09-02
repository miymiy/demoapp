import React from "react";
import { ApolloProvider } from "@apollo/client";
import AppLoading from "./components/AppLoading";
import AppNavigator from "./navigation/AppNavigation";
import navigationService from "./navigation/navigationService";
import { Asset } from "expo-asset";
import client from "./apollo";

const loadResourcesAsync = async (callback: () => void) => {
  try {
    await Promise.all([
      Asset.loadAsync([
        require("../assets/images/gift-bg.png"),
        require("../assets/images/prezzee-logo-white.png"),
        require("../assets/images/back-icon.png"),
        require("../assets/images/close-icon.png"),
      ]),
    ]);
    callback();
  } catch (e) {
    console.log(e);
  }
};

const setNavigatorRef = (navigatorRef) => {
  navigationService.setTopLevelNavigator(navigatorRef);
};

const App = () => {
  const [isAnimationLoading, setIsAnimationLoading] = React.useState(true);
  const [isLoadingResources, setIsLoadingResources] = React.useState(true);
  React.useEffect(() => {
    if (isLoadingResources) {
      loadResourcesAsync(() => setIsLoadingResources(false));
    }
    setTimeout(() => {
      setIsAnimationLoading(false);
    }, 3300);
  }, []);

  return (
    <ApolloProvider client={client}>
      {isAnimationLoading || isLoadingResources ? (
        <AppLoading />
      ) : (
        <AppNavigator ref={setNavigatorRef} />
      )}
    </ApolloProvider>
  );
};

export default App;

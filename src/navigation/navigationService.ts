import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function setParams(params: {}, key: string) {
  _navigator.dispatch(
    NavigationActions.setParams({
      params,
      key
    })
  );
}

function navigate(routeName: string, params?: any) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function goBack() {
  _navigator.dispatch(NavigationActions.back());
}

function getCurrentRoute() {
  if (_navigator) {
    let route = _navigator.state.nav;
    while (route.routes) {
      route = route.routes[route.index];
    }
    return route;
  }

  return null;
}

export default {
  navigate,
  setParams,
  setTopLevelNavigator,
  goBack,
  getCurrentRoute
};

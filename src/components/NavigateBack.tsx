import * as React from "react";
import NavigationService from "../navigation/navigationService";

export default class NavigateBack extends React.PureComponent {
  constructor(props: any) {
    super(props);
    NavigationService.goBack();
  }

  public render() {
    return null;
  }
}

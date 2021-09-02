import * as React from "react";
import NavigationService from "../navigation/navigationService";

export interface Props {
  routeName: string;
  params?: any;
}

export default class NavigateTo extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    NavigationService.navigate(this.props.routeName, this.props.params);
  }

  public render() {
    return null;
  }
}

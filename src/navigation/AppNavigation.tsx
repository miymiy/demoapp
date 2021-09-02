import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import { color } from "../constants/styles";
import { HOME_SCREEN, HOME_ORDER_DETAIL_SCREEN } from "../constants/screens";
import { createStackNavigator } from "react-navigation-stack";
import HomeOrderDetailsScreen from "../screens/HomeOrderDetailScreen";

const Navigation = createAppContainer(
  createStackNavigator(
    {
      [HOME_SCREEN]: HomeScreen,
      [HOME_ORDER_DETAIL_SCREEN]: HomeOrderDetailsScreen,
    },
    {
      headerMode: "none",
      initialRouteName: HOME_SCREEN,
      defaultNavigationOptions: {
        cardStyle: {
          backgroundColor: color.white,
        },
      },
    }
  )
);

export default Navigation;

import {ProfileStackParams, HomeStackParams} from '..';

type AppStackParams = {
  HomeScreenStack: HomeStackParams;
  ProfileScreenStack: () => ProfileStackParams;
  LoginScreen: () => JSX.Element;
  NotificationsScreen: () => JSX.Element;
};

export default AppStackParams;

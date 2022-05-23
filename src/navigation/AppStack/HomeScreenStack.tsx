import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CommentsScreen, HomeScreen} from '../../screens';

export type HomeStackParams = {
  HomeScreen: undefined;
  CommentsScreen: {
    postObject: any;
  };
};

const HomeStack = createNativeStackNavigator<HomeStackParams>();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="CommentsScreen" component={CommentsScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeScreenStack;

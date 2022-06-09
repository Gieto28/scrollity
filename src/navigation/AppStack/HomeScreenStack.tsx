import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CommentsScreen, HomeScreen} from '../../screens';
import CreatePostScreen from '../../screens/CreatePostScreen/CreatePostScreen';
import {PostModel} from '../../models';

export type HomeStackParams = {
  HomeScreen: () => JSX.Element;
  CommentsScreen: {
    postObject: PostModel;
  };
  CreatePostScreen: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParams>();

/**
 *
 * @returns navigator with 3 screens, HomeScreen, CommentsScreen and CreatePostScreen
 */
const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="CommentsScreen" component={CommentsScreen} />
      <HomeStack.Screen name="CreatePostScreen" component={CreatePostScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeScreenStack;

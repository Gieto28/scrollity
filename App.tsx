import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

// screens
import Home from './src/screens/Home/Home';
import Login from './src/screens/Login/Login';
import Notifications from './src/screens/notifications/Notifications';
import Profile from './src/screens/profile/Profile';

import {StyledText, GlobalView} from './src/styles/GlobalStyle';

const RootStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Notifications" component={Notifications} />
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Profile" component={Profile} />
      </RootStack.Navigator>
      {/* <Login /> */}
    </NavigationContainer>
  );
};

export default App;

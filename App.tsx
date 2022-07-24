import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import Route from './src/navigation/Route';
import {AppProvider} from './src/context';
import OneSignal from 'react-native-onesignal';

import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
  'Possible Unhandled Promise Rejection',
]);

const App: React.FC = () => {
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId('555ffc0d-356e-4403-968d-127962153363');

  //IOS
  // OneSignal.promptForPushNotificationsWithUserResponse(response => {
  //   console.log("Prompt response:", response);
  // });

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('OneSignal: notification opened:', notification);
  });

  // OneSignal.getDeviceState().then((deviceState: DeviceState | null) =>
  //   console.log('DEVICE_STATE: ', deviceState),
  // );

  return (
    <AuthProvider>
      <AppProvider>
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import Route from './src/navigation/Route';
import {AppProvider} from './src/context';
import OneSignal from 'react-native-onesignal';

const App: React.FC = () => {
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId('555ffc0d-356e-4403-968d-127962153363');

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      let notification = notificationReceivedEvent.getNotification();
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

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

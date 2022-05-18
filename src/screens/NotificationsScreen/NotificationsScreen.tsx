import {ScrollView} from 'react-native';
import React from 'react';
import {NotificationCardComponent} from '../../components';

const NotificationsScreen = () => {
  return (
    <ScrollView>
      <NotificationCardComponent name="John Doe" message="shared your post" />
      <NotificationCardComponent name="Matateu" message="liked your message" />
      <NotificationCardComponent
        name="Mario Santos"
        message="sent you a friends request"
      />
      <NotificationCardComponent
        name="Ernesto"
        message="reclined your friend request!"
      />
    </ScrollView>
  );
};

export default NotificationsScreen;

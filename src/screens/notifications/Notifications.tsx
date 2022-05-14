import {ScrollView} from 'react-native';
import React from 'react';
import NotificationCard from '../../components/component.Notifications/notification/NotificationCard';

import {ScreenView} from '../../styles/GlobalStyle';

const Notifications = () => {
  return (
    <ScreenView>
      <ScrollView>
        <NotificationCard name="John Doe" message="shared your post" />
        <NotificationCard name="Matateu" message="liked your message" />
        <NotificationCard
          name="Mario Santos"
          message="sent you a friends request"
        />
        <NotificationCard
          name="Ernesto"
          message="reclined your friend request!"
        />
      </ScrollView>
    </ScreenView>
  );
};

export default Notifications;

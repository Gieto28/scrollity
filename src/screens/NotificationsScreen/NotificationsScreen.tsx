import React from 'react';
import {NotificationCardComponent} from '../../components';
import {ViewScroll} from './Styled.NotificationsScreen';

const NotificationsScreen = () => {
  return (
    <ViewScroll>
      <NotificationCardComponent
        username="John Doe"
        likes="8"
        postId="01010101"
      />
      <NotificationCardComponent
        username="Matateu"
        likes="7"
        postId="02020202"
      />
      <NotificationCardComponent
        username="Mario Santos"
        likes="9"
        postId="03030303"
      />
      <NotificationCardComponent
        username="Ernesto"
        likes="1"
        postId="04040404"
      />
    </ViewScroll>
  );
};

export default NotificationsScreen;

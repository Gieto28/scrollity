import React from 'react';
import {useApp, useAuth} from '../../context';
import {updateNotification} from '../../services';

// defining props type to be used in notification
interface Props {
  notification_id: number;
  username: string;
  title: string;
  body: string;
  seen: boolean;
}

import {
  CardView,
  CardMessage,
  CardTitle,
  CardButton,
} from './Styled.NotificationCardComponent';

/**
 * @param notification_id - id of the notification
 * @param title - title of the notification
 * @param username - username of the persons notification it corresponds to
 * @param body- body of the notification
 * @returns
 */
const NotificationCardComponent: React.FC<Props> = ({
  notification_id,
  username,
  title,
  body,
  seen,
}) => {
  const {theme} = useApp();
  const {getNotifications} = useAuth();

  const handleSeen = () => {
    updateNotification(notification_id);
    getNotifications();
  };

  return (
    <CardView
      style={{
        borderColor: seen ? theme.button.border : theme.fonts.colors.primary,
      }}>
      <CardButton onPress={() => handleSeen()}>
        <CardTitle>{title}</CardTitle>
        <CardMessage>
          {body} {username}!
        </CardMessage>
      </CardButton>
    </CardView>
  );
};

export default NotificationCardComponent;

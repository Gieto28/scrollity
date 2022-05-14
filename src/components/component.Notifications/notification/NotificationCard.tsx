import React from 'react';

// defining props type to be used in notification
interface Props {
  name: string;
  message: string;
}

import {CardView, CardMessage, CardTitle} from './Styled.NotificationCard';

// Notification with : and the definition of the type and the types it has in it self
// Also passing in the prop name to be used in the Text below
const NotificationCard: React.FC<Props> = ({name, message}) => {
  return (
    <CardView>
      <CardTitle>Notification from {name} </CardTitle>
      <CardMessage>
        {name} has {message}!
      </CardMessage>
    </CardView>
  );
};

export default NotificationCard;

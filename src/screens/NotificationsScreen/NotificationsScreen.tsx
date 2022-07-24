import React from 'react';
import {NotificationCardComponent} from '../../components';
import {useAuth} from '../../context';
import {NotificationModel} from '../../models';
import {NoContentText, NoContentView} from '../../styles/GlobalStyle';
import {ViewScroll} from './Styled.NotificationsScreen';

const NotificationsScreen = () => {
  const {user, notification} = useAuth();

  return (
    <ViewScroll>
      {notification.length > 0 ? (
        notification.map((n: NotificationModel, i: number) => (
          <NotificationCardComponent
            key={i}
            username={user!.name}
            title={n.title}
            body={n.body}
            seen={n.seen}
            notification_id={n._id}
          />
        ))
      ) : (
        <NoContentView>
          <NoContentText>No notifications?</NoContentText>
          <NoContentText>
            Create a post or a comment and be notified when it's published!
          </NoContentText>
        </NoContentView>
      )}
    </ViewScroll>
  );
};

export default NotificationsScreen;

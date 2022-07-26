import React from 'react';
import {useTranslation} from 'react-i18next';
import {NotificationCardComponent} from '../../components';
import {useAuth} from '../../context';
import {NotificationModel} from '../../models';
import {NoContentText, NoContentView} from '../../styles/GlobalStyle';
import {ViewScroll} from './Styled.NotificationsScreen';

const NotificationsScreen = () => {
  const {user, notification} = useAuth();
  const {t} = useTranslation();

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
          <NoContentText>{t('noNotificationsTitle')}</NoContentText>
          <NoContentText>{t('noNotificationsBody')}</NoContentText>
        </NoContentView>
      )}
    </ViewScroll>
  );
};

export default NotificationsScreen;

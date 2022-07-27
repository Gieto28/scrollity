import React from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl} from 'react-native';
import {NotificationCardComponent} from '../../components';
import {useApp, useAuth} from '../../context';
import {NotificationModel} from '../../models';
import {NoContentText, NoContentView} from '../../styles/GlobalStyle';
import {ViewScroll} from './Styled.NotificationsScreen';

const NotificationsScreen = () => {
  const {user} = useAuth();
  const {theme, notification, getNotifications, loadingNotifications} =
    useApp();
  const {t} = useTranslation();

  const onRefresh = () => {
    getNotifications();
  };

  return (
    <ViewScroll
      refreshControl={
        <RefreshControl
          refreshing={loadingNotifications}
          onRefresh={onRefresh}
          colors={[theme.screen.secondaryColor]}
          tintColor={theme.screen.secondaryColor}
          progressViewOffset={300}
        />
      }>
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

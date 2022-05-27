import React from 'react';

// defining props type to be used in notification
interface Props {
  username: string;
  likes: string;
  postId: string;
}

import {
  CardView,
  CardMessage,
  CardTitle,
  CardButton,
} from './Styled.NotificationCardComponent';

/**
 * @param postId - id of the post it relates to, we'll use the postId to redirect the user to that post on click
 * @param likes - amount of likes passed into the component relative to the post
 * @param username - username of the user that is correctly logged in
 * @returns
 */
const NotificationCardComponent: React.FC<Props> = ({
  username,
  likes,
  postId,
}) => {
  const handleNotificationRedirectToPost = (id: string) => {
    console.log('redirect to post with id:', id);
    // on click goes to post then we filter all notifications and remove that post from the notifications
  };

  return (
    <CardView>
      <CardButton onPress={() => handleNotificationRedirectToPost(postId)}>
        <CardTitle>Congrats {username}!</CardTitle>
        <CardMessage>Your post has reached {likes} likes!</CardMessage>
      </CardButton>
    </CardView>
  );
};

export default NotificationCardComponent;

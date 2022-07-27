import React, {useEffect, useState} from 'react';
import {ImageSourcePropType} from 'react-native';
import {useApp, useAuth} from '../../context';
import {CommentModel, GetUserVote} from '../../models';
import getCommentAxios from '../../services/comment/getCommentAxios';
import getUserVoteCommentsAxios from '../../services/comment/getUserVoteCommentsAxios';
import handleVoteCommentAxios from '../../services/comment/handleVoteCommentAxios';
import {UpVoteIcon, VoteButton} from '../../styles/GlobalStyle';
import {timeAgo} from '../../utils/timeAgo';
import {
  BodyComment,
  BodyFooter,
  BodyHeader,
  BodyWrapper,
  Comment,
  CommentVote,
  CommentWrapper,
  ImageWrapper,
  TimeStamp,
  UserImage,
  UserName,
  VotesWrapper,
} from './Styled.CommentComponent';

interface Props {
  commentObj: CommentModel;
}

/**
 *
 * @returns comment component being used in the comments screen, it's used in a map to iterate through all the comments of a specific post
 */
const CommentComponent: React.FC<Props> = ({commentObj}) => {
  const {theme} = useApp();
  const {userId} = useAuth();

  const {_id, comment, dateCreated, up_votes, down_votes, user} = commentObj;
  const placeholder = require('../../assets/Images/profile-Placeholder.png');

  const [waitingVote, setWaitingVote] = useState<boolean>(false);
  const [updateComment, setUpdateComment] = useState<CommentModel>();
  const [userVote, setUserVote] = useState<GetUserVote>();

  const upVoteIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-24-upvote-dark.png')
    : require('../../assets/Images/arrow-24-upvote-light.png');

  const downVoteIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-24-downvote-dark.png')
    : require('../../assets/Images/arrow-24-downvote-light.png');

  const activeUpvote: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-24-upvote-active-dark.png')
    : require('../../assets/Images/arrow-24-upvote-active-light.png');

  const activeDownvote: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-24-downvote-active-dark.png')
    : require('../../assets/Images/arrow-24-downvote-active-light.png');

  useEffect(() => {
    const checkUserLikes = async () => {
      try {
        const user_vote: GetUserVote = await getUserVoteCommentsAxios(
          _id,
          userId,
        );
        setUserVote(user_vote);
      } catch (e: any) {
        throw new Error(e.message);
      }
    };
    checkUserLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateComment]);

  const handleVote = async (vote: number, comment_id: number) => {
    try {
      if (vote === 1) {
        setWaitingVote(true);
      }
      if (vote === 0) {
        setWaitingVote(true);
      }

      await handleVoteCommentAxios(vote, comment_id, userId!);
      const post: CommentModel = await getCommentAxios(_id);
      setUpdateComment(post);
    } catch (e: any) {
      throw new Error(e.message);
    }
    setWaitingVote(false);
  };

  return (
    <CommentWrapper>
      <ImageWrapper>
        <UserImage source={placeholder} />
      </ImageWrapper>
      <BodyWrapper>
        <BodyHeader>
          <UserName>{user.name}</UserName>
          <TimeStamp> ● {timeAgo(dateCreated)}</TimeStamp>
        </BodyHeader>
        <BodyComment>
          <Comment>{comment}</Comment>
        </BodyComment>
        <BodyFooter>
          <VotesWrapper>
            <CommentVote>
              {updateComment ? updateComment.up_votes : up_votes}
            </CommentVote>
            <VoteButton
              disabled={waitingVote}
              onPress={() => handleVote(1, _id)}>
              <UpVoteIcon
                source={userVote?.data?.vote === 1 ? activeUpvote : upVoteIcon}
                accessibilityLabel="Up vote Icon"
              />
            </VoteButton>
            <CommentVote>
              {updateComment ? updateComment.down_votes : down_votes}
            </CommentVote>
            <VoteButton
              disabled={waitingVote}
              onPress={() => handleVote(0, _id)}>
              <UpVoteIcon
                source={
                  userVote?.data?.vote === 0 ? activeDownvote : downVoteIcon
                }
                accessibilityLabel="Down vote Icon"
              />
            </VoteButton>
          </VotesWrapper>
        </BodyFooter>
      </BodyWrapper>
    </CommentWrapper>
  );
};

export default CommentComponent;

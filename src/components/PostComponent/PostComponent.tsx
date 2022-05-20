import {View, Text} from 'react-native';
import React from 'react';

interface Props {
  name: string;
  source: any;
  description: string;
  upVotes: number;
  downVotes: number;
  postId: string;
}

const PostComponent: React.FC<Props> = ({
  name,
  source,
  description,
  upVotes,
  downVotes,
  postId,
}) => {
  return (
    <View>
      <Text>{name}</Text>

      <Text>PostComponent</Text>
    </View>
  );
};

export default PostComponent;

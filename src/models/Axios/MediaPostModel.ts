/**
 * Media Model being used in the create post file, used to upload the media to node
 *
 */
interface MediaPostModel {
  uri: string;
  type: string;
  name: string;
}

export default MediaPostModel;

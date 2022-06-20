/**
 * Media Model being used in the create post file, used to upload the media to node
 *
 */
interface MediaPostModel {
  uri: string | null;
  type: string | null;
  name: string | null;
}

export default MediaPostModel;

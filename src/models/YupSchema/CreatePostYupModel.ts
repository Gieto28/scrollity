import * as yup from 'yup';

const SchemaCreatePost = yup.object().shape({
  title: yup.string().min(3).max(50).required(),
  description: yup.string().max(200).nullable(true),
});

export default SchemaCreatePost;

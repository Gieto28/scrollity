import * as yup from 'yup';

const SchemaCreatePost = yup.object().shape({
  title: yup.string().min(3).max(40).required(),
  description: yup.string().min(20).max(255).nullable(true),
});

export default SchemaCreatePost;

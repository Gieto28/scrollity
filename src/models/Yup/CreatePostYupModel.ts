import * as yup from 'yup';

/**
 * **Name** - type string, required, it needs to match the condition set in the matches method, minimum length is 5 and maximum length is 20
 *
 * **password** - type string, minimum length is 6 and maximum length is 18
 *
 * **passwordConfirmation** - type string also required and I'm also using yup to confirm if both password and passwordConfirmation are the same
 */
const SchemaCreatePost = yup.object().shape({
  title: yup.string().min(3).max(40).required(),
  description: yup.string().min(20).max(255).nullable(true),
});

export default SchemaCreatePost;

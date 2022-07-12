import * as yup from 'yup';

/**
 * **email** - type string, also type email and required
 *
 * **password** - type string, minimum length is 6 characters and maximum length is 18, it's required
 */
const SchemaSignIn = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(18).required(),
});

export default SchemaSignIn;

import * as yup from 'yup';

/**
 * **Name** - type string, required, it needs to match the condition set in the matches method, minimum length is 5 and maximum length is 20
 *
 * **email** - type string, type email also required
 *
 * **password** - type string, minimum length is 6 and maximum length is 18
 *
 * **passwordConfirmation** - type string also required and I'm also using yup to confirm if both password and passwordConfirmation are the same
 */
const SchemaSignUp = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-z0-9_.]+$/, 'name is invalid')
    .min(5)
    .max(20)
    .required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(18).required(),
  passwordConfirmation: yup
    .string()
    .required()
    .min(6)
    .max(18)
    .oneOf([yup.ref('password'), null], 'Passwords must match!'),
});

export default SchemaSignUp;

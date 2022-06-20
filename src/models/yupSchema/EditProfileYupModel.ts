import * as yup from 'yup';

/**
 * **Name** - type string, required, it needs to match the condition set in the matches method, minimum length is 5 and maximum length is 20
 *
 * **password** - type string, minimum length is 6 and maximum length is 18
 *
 * **passwordConfirmation** - type string also required and I'm also using yup to confirm if both password and passwordConfirmation are the same
 */
const SchemaEditProfile = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z0-9_.]+$/, 'name is invalid')
    .nullable(true)
    .min(5)
    .max(20),
  password: yup.string().min(6).max(18).nullable(true),
  passwordConfirmation: yup
    .string()
    .min(6, 'password must be at least 6 characters')
    .max(18)
    .oneOf([yup.ref('password'), null], 'Passwords must match!')
    .when('password', {
      is: (password: string) =>
        password?.length > 0 && password?.length !== undefined,
      then: yup.string().required('Field is required'),
    }),
});

export default SchemaEditProfile;

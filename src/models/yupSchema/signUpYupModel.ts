import * as yup from 'yup';

const schemaSignUp = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-z0-9_.]+$/, 'name is invalid')
    .min(5)
    .max(20)
    .required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(20).required(),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match!'),
});

export default schemaSignUp;

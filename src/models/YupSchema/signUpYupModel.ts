import * as yup from 'yup';

const SchemaSignUp = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z0-9_.]+$/, 'name is invalid')
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

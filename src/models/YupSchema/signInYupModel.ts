import * as yup from 'yup';

const SchemaSignIn = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(18).required(),
});

export default SchemaSignIn;

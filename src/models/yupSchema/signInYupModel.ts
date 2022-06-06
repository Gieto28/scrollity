import * as yup from 'yup';

const schemaSignIn = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(20).required(),
});

export default schemaSignIn;

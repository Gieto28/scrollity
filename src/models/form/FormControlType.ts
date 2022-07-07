import FormCommentModel from './FormCommentModel';
import FormCreatePostModel from './FormCreatePostModel';
import FormSearchModel from './FormSearchModel';
import FormSignInModel from './FormSignInModel';
import FormSignUpModel from './FormSignUpModel';

type FormControlType =
  | FormSignUpModel
  | FormSearchModel
  | FormSignInModel
  | FormSearchModel
  | FormCreatePostModel
  | FormCommentModel;

export default FormControlType;

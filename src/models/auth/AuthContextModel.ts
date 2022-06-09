import FormSignInModel from '../form/FormSignInModel';
import FormSignUpModel from '../form/FormSignUpModel';
import JwtDecodedModel from './JwtDecodedModel';

interface AuthContextModel {
  isSignedIn: boolean;
  user: JwtDecodedModel | null;
  loading: boolean;
  token: string | null;
  userId: string | null;
  signIn(data: FormSignInModel): Promise<void>;
  signUp(data: FormSignUpModel): Promise<void>;
  signOut(): Promise<any>;
}

export default AuthContextModel;

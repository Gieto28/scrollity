import FormSignInModel from '../Form/FormSignInModel';
import FormSignUpModel from '../Form/FormSignUpModel';
import JwtDecodedModel from './JwtDecodedModel';

/**
 * Auth Context Model - pretty straight forward interface
 */
interface AuthContextModel {
  isSignedIn: boolean;
  user: JwtDecodedModel | null;
  loading: boolean;
  token: string | null;
  userId: string | null;
  signIn(data: FormSignInModel): Promise<void>;
  signUp(data: FormSignUpModel): Promise<void>;
  signOut(): Promise<void>;
}

export default AuthContextModel;

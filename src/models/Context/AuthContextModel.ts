import FormEditProfileModel from '../Form/FormEditProfileModel';
import FormSignInModel from '../Form/FormSignInModel';
import FormSignUpModel from '../Form/FormSignUpModel';
import UserModel from '../Models/UserModel';
import JwtDecodedModel from './JwtDecodedModel';

/**
 * Auth Context Model - pretty straight forward interface, it includes states and functions
 */
interface AuthContextModel {
  isSignedIn: boolean;
  user: JwtDecodedModel | null;
  setUser: any;
  loading: boolean;
  token: string | null;
  userId: string | null;
  signIn(data: FormSignInModel): Promise<void>;
  signUp(data: FormSignUpModel): Promise<void>;
  signOut(): Promise<void>;
  getUser(id: string): any;
  updateProfile: (data: FormEditProfileModel) => Promise<void>;
}

export default AuthContextModel;

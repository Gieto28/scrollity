import FormEditProfileModel from '../Forms/FormEditProfileModel';
import FormSignInModel from '../Forms/FormSignInModel';
import FormSignUpModel from '../Forms/FormSignUpModel';
import NotificationModel from '../Models/NotificationModel';
import UserModel from '../Models/UserModel';

/**
 * Auth Context Model - pretty straight forward interface, it includes states and functions
 */
interface AuthContextModel {
  isSignedIn: boolean;
  user: UserModel | null;
  loading: boolean;
  loadingNotifications: boolean;
  token: string | null;
  userId: string | null;
  notification: NotificationModel[];
  signIn(data: FormSignInModel): Promise<void>;
  signUp(data: FormSignUpModel): Promise<void>;
  signOut(): Promise<void>;
  getUser(id: string): Promise<UserModel>;
  updateProfile: (data: FormEditProfileModel) => Promise<void>;
  getNotifications: () => void;
}

export default AuthContextModel;

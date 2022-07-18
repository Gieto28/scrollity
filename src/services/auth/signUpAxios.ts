import {AxiosResponse} from 'axios';
import {api} from '..';
import {TokenResponse} from '../../models';
import {AUTH_REGISTER} from '../../../env';

/**
 *
 * @param name name being retrieved from the form
 * @param email email being retrieved from the form
 * @param password password being retrieved from the form
 * @param passwordConfirmation password confirmation being retrieved from the form
 * @returns res.data which should be a very long token with the user information or if error should catch and show it on the screen
 */
const signUpAxios = async (
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
): Promise<TokenResponse> => {
  try {
    const res: AxiosResponse<TokenResponse> = await api.post<TokenResponse>(
      AUTH_REGISTER,
      {
        name,
        email,
        password,
        passwordConfirmation,
      },
    );
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default signUpAxios;

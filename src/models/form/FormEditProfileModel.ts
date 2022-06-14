/**
 * Form type/model being used in the settings screen
 *
 */
interface FormEditProfileModel {
  name: string | undefined | null;
  password: string | undefined | null;
  passwordConfirmation: string | undefined | null;
}

export default FormEditProfileModel;

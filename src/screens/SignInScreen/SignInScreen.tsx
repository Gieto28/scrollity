import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  BadCredentialsText,
  IconWrapper,
  LoginTitle,
} from './Styled.SignInScreen';
import {
  InputTextComponent,
  FormButtonComponent,
  SeparatorLineComponent,
  IconComponent,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScrollView, AuthView} from '../../styles/GlobalStyle';
import {ImageSourcePropType, View} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  AuthStackParams,
  FormControllerName,
  FormSignInModel,
  SchemaSignIn,
} from '../../models';
import {useAuth, useAppSettings} from '../../context';
import {useTranslation} from 'react-i18next';

type SignUpNavigationProp = StackNavigationProp<
  AuthStackParams,
  'SignUpScreen'
>;

/**
 *
 * @returns Sign in screen, using a form to login and calling the signIn method from the useAuth to check if user can be signed in. Authentication using yup, jwt and sending data to node typeorm and checking an mySQL database to match data and returning either an error or the token if successful.
 */
const SignInScreen: React.FC = () => {
  const {theme, changeTheme, changeLang} = useAppSettings();
  const {signIn} = useAuth();
  const {t, i18n} = useTranslation();

  // States
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [badCredentials, setBadCredentials] = useState<boolean>(false);

  const lightDarkIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/moon-30.png')
    : require('../../assets/Images/sun-50.png');

  const hiddenPasswordIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/hide-password-24-dark.png')
    : require('../../assets/Images/hide-password-24-light.png');

  const showingPasswordIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/show-password-24-dark.png')
    : require('../../assets/Images/show-password-24-light.png');

  const lang = i18n.language;

  const imageLanguage =
    lang === 'en'
      ? require('../../assets/Images/portugal.png')
      : require('../../assets/Images/united-kingdom.png');

  //Icon depending on wether the password is hidden or not
  const isPasswordHiddenIcon = isPasswordHidden
    ? hiddenPasswordIcon
    : showingPasswordIcon;

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormSignInModel>({
    resolver: yupResolver(SchemaSignIn),
  });

  /**
   *
   * @param data consists of the model FormSignInModel which has:
   *
   * **email**: string
   *
   * **password**: string
   * @returns
   */
  const handleSignIn: SubmitHandler<FormSignInModel> = async (
    data: FormSignInModel,
  ) => {
    try {
      await signIn(data);
      reset();
    } catch (e: any) {
      setBadCredentials(true);
      setTimeout(() => {
        setBadCredentials(false);
      }, 8000);
      throw new Error(e.message);
    }
  };

  const navigation: SignUpNavigationProp =
    useNavigation<SignUpNavigationProp>();

  const handleShowPassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const handleRedirectToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <AuthScrollView>
      <IconWrapper>
        <IconComponent
          image={imageLanguage}
          altText={'Click here to change language'}
          onPress={() => changeLang()}
          style={{marginRight: 15}}
        />
        <IconComponent
          image={lightDarkIcon}
          altText={'Light dark icon to change theme'}
          onPress={() => changeTheme()}
        />
      </IconWrapper>
      <AuthView>
        <LoginTitle>Scrollity</LoginTitle>

        {badCredentials && (
          <BadCredentialsText>{t('badCredentials')}</BadCredentialsText>
        )}
        <InputTextComponent
          placeholder={t('yourEmail')}
          controllerName={FormControllerName.EMAIL}
          control={control}
          // label
          label={t('yourEmail')}
          keyboard="email-address"
        />

        <InputTextComponent
          placeholder={t('yourPassword')}
          controllerName={FormControllerName.PASSWORD}
          control={control}
          errors={errors.password}
          securedBoolean={isPasswordHidden}
          // label
          label={t('yourPassword')}
          icon={isPasswordHiddenIcon}
          onPress={handleShowPassword}
        />

        <FormButtonComponent
          name={t('signIn')}
          onPress={handleSubmit(handleSignIn)}
        />

        <SeparatorLineComponent labelName={t('or')} />

        <View>
          <FormButtonComponent
            name={t('signUp')}
            fontSize="16px"
            fontWeight="400"
            onPress={handleRedirectToSignUp}
          />
        </View>
      </AuthView>
    </AuthScrollView>
  );
};

export default SignInScreen;

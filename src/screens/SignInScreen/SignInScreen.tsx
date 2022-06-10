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
import {AuthStackParams, FormSignInModel, SchemaSignIn} from '../../models';
import {useApp, useAuth} from '../../context';

type SignUpNavigationProp = StackNavigationProp<
  AuthStackParams,
  'SignUpScreen'
>;

/**
 *
 * @returns Sign in screen, using a form to login and calling the signIn method from the useAuth to check if user can be signed in. Authentication using yup, jwt and sending data to node typeorm and checking an mySQL database to match data and returning either an error or the token if successful.
 */
const SignInScreen: React.FC = () => {
  const {theme, changeTheme} = useApp();
  const {signIn} = useAuth();

  const lightDarkIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/moon-30.png')
    : require('../../assets/Images/sun-50.png');

  const hiddenPasswordIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/hide-password-24-dark.png')
    : require('../../assets/Images/hide-password-24-light.png');

  const showingPasswordIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/show-password-24-dark.png')
    : require('../../assets/Images/show-password-24-light.png');

  // States
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [badCredentials, setBadCredentials] = useState<boolean>(false);

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

      console.log('sign in successful - file sign in screen.tsx');
      reset();
    } catch (e) {
      setBadCredentials(true);
      setTimeout(() => {
        setBadCredentials(false);
      }, 8000);
      throw new Error('error while submitting form in file signInScreen');
    }
  };

  const navigation: SignUpNavigationProp =
    useNavigation<SignUpNavigationProp>();

  const handleShowPassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
    console.log(isPasswordHidden);
  };

  const handleRedirectToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  const handleTheme = async () => {
    await changeTheme();
  };

  return (
    <AuthScrollView>
      <IconWrapper>
        <IconComponent
          image={lightDarkIcon}
          altText={'Light dark icon to change theme'}
          onPress={handleTheme}
        />
      </IconWrapper>
      <AuthView>
        <LoginTitle>Scrollity</LoginTitle>

        {badCredentials && (
          <BadCredentialsText>Bad credentials...</BadCredentialsText>
        )}
        <InputTextComponent
          placeholder="E-mail"
          value={''}
          controllerName="email"
          control={control}
          errors={errors.email}
          // label
          label="Your email"
        />

        <InputTextComponent
          placeholder="Password"
          value=""
          controllerName="password"
          control={control}
          errors={errors.password}
          securedBoolean={isPasswordHidden}
          // label
          label="Password"
          icon={isPasswordHiddenIcon}
          onPress={handleShowPassword}
          customIconStyles={{marginTop: 16, marginRight: 5}}
        />

        <FormButtonComponent
          name="Sign in"
          onPress={handleSubmit(handleSignIn)}
        />

        <SeparatorLineComponent labelName="or" />

        <View>
          <FormButtonComponent
            name="Sign up"
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

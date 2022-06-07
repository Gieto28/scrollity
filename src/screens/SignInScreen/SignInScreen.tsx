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
import {AuthStackParams} from '../../navigation/AuthStack/AuthStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScrollView, AuthView} from '../../styles/GlobalStyle';
import {View} from 'react-native';
import useDeviceColor from '../../hooks/useDeviceColor';
import signIn from '../../services/auth/signIn';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormSignInModel, schemaSignIn} from '../../models';
import {api} from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import parseJwt from '../../utils/decodeJsonToken';

type SignUpNavigationProp = StackNavigationProp<AuthStackParams, 'SignUp'>;

const SignInScreen: React.FC = () => {
  const theme = useDeviceColor();

  const lightDarkIcon = theme.bool
    ? require('../../assets/Images/moon-30.png')
    : require('../../assets/Images/sun-50.png');

  const hiddenPasswordIcon = theme.bool
    ? require('../../assets/Images/hide-password-24-dark.png')
    : require('../../assets/Images/hide-password-24-light.png');

  const showingPasswordIcon = theme.bool
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
    resolver: yupResolver(schemaSignIn),
  });

  /**
   *
   * @param data consists of the model FormSignInModel which has email: string and password: string
   * @returns
   */
  const onSubmit: SubmitHandler<FormSignInModel> = async (
    data: FormSignInModel,
  ) => {
    const {email, password} = data;
    try {
      const data = await signIn(email, password);

      if (!data?.token) {
        setBadCredentials(true);
        setTimeout(() => {
          setBadCredentials(false);
        }, 8000);
        return console.log('bad credentials');
      }
      //
      api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      // const parsedToken = await parseJwt(data.token);
      // console.log(parsedToken);

      // await AsyncStorage.setItem('token', data.token);
      // await AsyncStorage.setItem('userID', 'hello');

      console.log('token', data.token);
    } catch (error) {
      throw new Error('error while submitting form in file signInScreen');
    }
  };

  const navigation = useNavigation<SignUpNavigationProp>();

  const handleShowPassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
    console.log(isPasswordHidden);
  };

  const handleRedirectToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleTheme = () => {
    console.log('theme');
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

        <FormButtonComponent name="Sign in" onPress={handleSubmit(onSubmit)} />

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
function password(name: any, password: any) {
  throw new Error('Function not implemented.');
}

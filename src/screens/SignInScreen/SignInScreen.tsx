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
import {Text, View} from 'react-native';
import useDeviceColor from '../../hooks/useDeviceColor';
import signIn from '../../services/auth/signIn';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormSignInModel, schemaSignIn} from '../../models';

type SignUpNavigationProp = StackNavigationProp<AuthStackParams, 'SignUp'>;

const SignInScreen: React.FC = () => {
  const theme = useDeviceColor();

  const lightDarkICon = theme.bool
    ? require('../../assets/Images/moon-30.png')
    : require('../../assets/Images/sun-50.png');

  // States

  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [badCredentials, setBadCredentials] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormSignInModel>({
    resolver: yupResolver(schemaSignIn),
  });

  // Functions
  // :
  const onSubmit: SubmitHandler<FormSignInModel> = async (data: {
    email: string;
    password: string;
  }) => {
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
      console.log(data.token);
    } catch (error) {
      throw new Error('error while submitting form in file signInScreen');
    }
  };

  const navigation = useNavigation<SignUpNavigationProp>();

  const handleRedirectToSignUp = () => {
    console.log('This button is working');

    navigation.navigate('SignUp');
  };

  const handleTheme = () => {
    console.log('theme');
  };

  return (
    <AuthScrollView>
      <IconWrapper>
        <IconComponent
          image={lightDarkICon}
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

import React from 'react';
import {SignUpTitle} from './Styled.SignUpScreen';
import {useForm} from 'react-hook-form';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {AuthScrollView, AuthView} from '../../styles/GlobalStyle';
import {
  LightDarkButtonComponent,
  InputTextComponent,
  OpacityButtonComponent,
  GoBackComponent,
} from '../../components';

const SignUpScreen = () => {
  // Form handler

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      signUpUsername: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpPasswordConfirmation: '',
    },
  });

  const handleSignUp = (data: {}) => {
    console.log('Sign Up is working');
    console.log('errors---------------------------', errors);

    console.log(data);
  };

  return (
    <AuthScrollView>
      <LightDarkButtonComponent />
      <GoBackComponent />
      <AuthView>
        <InputTextComponent
          placeholder="Your Username"
          value={''}
          controllerName="signUpUsername"
          control={control}
          errors={errors.signUpUsername?.ref}
          label="Your Username"
        />
        <InputTextComponent
          placeholder="Your Email"
          value={''}
          controllerName="signUpEmail"
          control={control}
          errors={errors.signUpEmail}
          label="Your Email"
        />
        <InputTextComponent
          placeholder="Your Password"
          value={''}
          controllerName="signUpPassword"
          control={control}
          errors={errors.signUpPassword}
          label="Your Password"
        />
        <InputTextComponent
          placeholder="Confirm Password"
          value={''}
          controllerName="signUpPasswordConfirmation"
          control={control}
          errors={errors.signUpPasswordConfirmation?.type}
          label="Confirm Password"
        />

        <OpacityButtonComponent
          name="Sign up"
          onPress={handleSubmit(handleSignUp)}
        />
      </AuthView>
    </AuthScrollView>
  );
};

export default SignUpScreen;

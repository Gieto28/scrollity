import React from 'react';
import {SignUpTitle} from './Styled.SignUpScreen';
import InputTextComponent from '../../components/component.Forms/inputText/InputTextComponent';
import {useForm} from 'react-hook-form';
import OpacityButtonComponent from '../../components/component.Forms/OpacityButton/OpacityButtonComponent';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ScrollView, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {AuthScrollView, AuthView} from '../../styles/GlobalStyle';

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

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <AuthScrollView>
      <AuthView>
        <TouchableOpacity onPress={handleGoBack}>
          <Text> « Go back </Text>
        </TouchableOpacity>

        <SignUpTitle>Sign Up</SignUpTitle>

        <InputTextComponent
          placeholder="Your Username"
          value={''}
          controllerName="signUpUsername"
          control={control}
          errors={errors.signUpUsername?.ref}
          label="Your Username"
          borderColor="black"
          backgroundColor="#e5e5e5"
        />
        <InputTextComponent
          placeholder="Your Email"
          value={''}
          controllerName="signUpEmail"
          control={control}
          errors={errors.signUpEmail}
          label="Your Email"
          borderColor="black"
          backgroundColor="#e5e5e5"
        />
        <InputTextComponent
          placeholder="Your Password"
          value={''}
          controllerName="signUpPassword"
          control={control}
          errors={errors.signUpPassword}
          label="Your Password"
          borderColor="black"
          backgroundColor="#e5e5e5"
        />
        <InputTextComponent
          placeholder="Confirm Password"
          value={''}
          controllerName="signUpPasswordConfirmation"
          control={control}
          errors={errors.signUpPasswordConfirmation?.type}
          label="Confirm Password"
          borderColor="black"
          backgroundColor="#e5e5e5"
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

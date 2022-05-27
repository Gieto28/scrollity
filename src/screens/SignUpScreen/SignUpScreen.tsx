import React from 'react';
import {useForm} from 'react-hook-form';
import {AuthScrollView, AuthView} from '../../styles/GlobalStyle';
import {
  InputTextComponent,
  OpacityButtonComponent,
  IconComponent,
} from '../../components';
import {leftArrowIcon, lightDarkICon} from '../../assets/imagesIndex';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {IconWrapper} from './Styled.SignUpScreen';

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

  const handleTheme = () => {
    console.log('theme');
  };

  return (
    <AuthScrollView>
      <IconWrapper>
        <IconComponent
          image={leftArrowIcon}
          altText={'Go back to previous screen'}
          onPress={handleGoBack}
        />
        <IconComponent
          image={lightDarkICon}
          altText={'Light dark icon to change theme'}
          onPress={handleTheme}
        />
      </IconWrapper>
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

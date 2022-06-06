import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {AuthScrollView, AuthView} from '../../styles/GlobalStyle';
import {
  InputTextComponent,
  FormButtonComponent,
  IconComponent,
} from '../../components';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {IconWrapper} from './Styled.SignUpScreen';
import useDeviceColor from '../../hooks/useDeviceColor';

const SignUpScreen = () => {
  const theme = useDeviceColor();

  const leftArrowIcon = theme.bool
    ? require('../../assets/Images/arrow-left-dark-24.png')
    : require('../../assets/Images/arrow-left-light-24.png');

  const lightDarkICon = theme.bool
    ? require('../../assets/Images/moon-30.png')
    : require('../../assets/Images/sun-50.png');

  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isPasswordConfirmationHidden, setIsPasswordConfirmationHidden] =
    useState<boolean>(true);

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
          securedBoolean={isPasswordHidden}
        />
        <InputTextComponent
          placeholder="Confirm Password"
          value={''}
          controllerName="signUpPasswordConfirmation"
          control={control}
          errors={errors.signUpPasswordConfirmation?.type}
          label="Confirm Password"
          securedBoolean={isPasswordConfirmationHidden}
        />

        <FormButtonComponent
          name="Sign up"
          onPress={handleSubmit(handleSignUp)}
        />
      </AuthView>
    </AuthScrollView>
  );
};

export default SignUpScreen;

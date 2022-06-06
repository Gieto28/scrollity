import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {AuthScrollView, AuthView} from '../../styles/GlobalStyle';
import {
  InputTextComponent,
  FormButtonComponent,
  IconComponent,
} from '../../components';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {IconWrapper} from './Styled.SignUpScreen';
import useDeviceColor from '../../hooks/useDeviceColor';
import register from '../../services/auth/register';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormSignUpModel, schemaSignUp} from '../../models';

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
    reset,
  } = useForm<FormSignUpModel>({
    resolver: yupResolver(schemaSignUp),
  });

  const handleSignUp: SubmitHandler<FormSignUpModel> = async (
    data: FormSignUpModel,
  ) => {
    const {name, email, password, passwordConfirmation} = data;

    if (password !== passwordConfirmation) {
      console.log(`passwords don't match`);
    }
    console.log();

    await register(name, email, password, passwordConfirmation);
    return reset();
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
          controllerName="name"
          control={control}
          errors={errors.name}
          label="Your Username"
        />
        <InputTextComponent
          placeholder="Your Email"
          value={''}
          controllerName="email"
          control={control}
          errors={errors.email}
          label="Your Email"
        />
        <InputTextComponent
          placeholder="Your Password"
          value={''}
          controllerName="password"
          control={control}
          errors={errors.password}
          label="Your Password"
          securedBoolean={isPasswordHidden}
        />
        <InputTextComponent
          placeholder="Confirm Password"
          value={''}
          controllerName="passwordConfirmation"
          control={control}
          errors={errors.passwordConfirmation}
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

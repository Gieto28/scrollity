import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {AuthScrollView, AuthView} from '../../styles/GlobalStyle';
import {
  InputTextComponent,
  FormButtonComponent,
  IconComponent,
} from '../../components';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ErrorWhileSignUpText, IconWrapper} from './Styled.SignUpScreen';
import useDeviceColor from '../../hooks/useDeviceColor';
import register from '../../services/auth/register';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormSignUpModel, schemaSignUp} from '../../models';

const SignUpScreen = () => {
  const theme = useDeviceColor();
  const navigation = useNavigation();

  const leftArrowIcon = theme.bool
    ? require('../../assets/Images/arrow-left-dark-24.png')
    : require('../../assets/Images/arrow-left-light-24.png');

  const lightDarkICon = theme.bool
    ? require('../../assets/Images/moon-30.png')
    : require('../../assets/Images/sun-50.png');

  const hiddenPasswordIcon = theme.bool
    ? require('../../assets/Images/hide-password-24-dark.png')
    : require('../../assets/Images/hide-password-24-light.png');

  const showingPasswordIcon = theme.bool
    ? require('../../assets/Images/show-password-24-dark.png')
    : require('../../assets/Images/show-password-24-light.png');

  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isPasswordConfirmationHidden, setIsPasswordConfirmationHidden] =
    useState<boolean>(true);
  const [errorWhileSignUp, setErrorWhileSignUp] = useState<boolean>(false);

  //Icon depending on wether the password is hidden or not

  const isPasswordHiddenIcon = isPasswordHidden
    ? hiddenPasswordIcon
    : showingPasswordIcon;

  const isPasswordConfirmationHiddenIcon = isPasswordHidden
    ? hiddenPasswordIcon
    : showingPasswordIcon;

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
    try {
      const data = await register(name, email, password, passwordConfirmation);

      if (!data?.token) {
        setErrorWhileSignUp(true);
        setTimeout(() => {
          setErrorWhileSignUp(false);
        }, 8000);
        return console.log('Email already exists or missing/wrong data ');
      }
      reset();
      navigation.dispatch(CommonActions.goBack());

      return;
    } catch (error) {}

    // return reset();
  };

  const handleShowPassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const handleShowPasswordConfirmation = () => {
    setIsPasswordConfirmationHidden(!isPasswordConfirmationHidden);
  };

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
        {errorWhileSignUp && (
          <ErrorWhileSignUpText>
            Email or name already exists or missing/wrong data..
          </ErrorWhileSignUpText>
        )}
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
          icon={isPasswordHiddenIcon}
          onPress={handleShowPassword}
          customIconStyles={{marginTop: 16, marginRight: 5}}
        />
        <InputTextComponent
          placeholder="Confirm Password"
          value={''}
          controllerName="passwordConfirmation"
          control={control}
          errors={errors.passwordConfirmation}
          label="Confirm Password"
          securedBoolean={isPasswordConfirmationHidden}
          icon={isPasswordConfirmationHiddenIcon}
          onPress={handleShowPasswordConfirmation}
          customIconStyles={{marginTop: 16, marginRight: 5}}
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

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
import {yupResolver} from '@hookform/resolvers/yup';
import {FormControllerName, FormSignUpModel, SchemaSignUp} from '../../models';
import {useAuth, useAppSettings} from '../../context';
import {ImageSourcePropType} from 'react-native';

const SignUpScreen = () => {
  const {theme, changeTheme} = useAppSettings();
  const navigation = useNavigation();
  const {signUp} = useAuth();

  const leftArrowIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-left-dark-24.png')
    : require('../../assets/Images/arrow-left-light-24.png');

  const lightDarkICon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/moon-30.png')
    : require('../../assets/Images/sun-50.png');

  const hiddenPasswordIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/hide-password-24-dark.png')
    : require('../../assets/Images/hide-password-24-light.png');

  const showingPasswordIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/show-password-24-dark.png')
    : require('../../assets/Images/show-password-24-light.png');

  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isPasswordConfirmationHidden, setIsPasswordConfirmationHidden] =
    useState<boolean>(true);
  const [errorWhileSignUp, setErrorWhileSignUp] = useState<boolean>(false);

  //Icon depending on wether the password is hidden or not

  const isPasswordHiddenIcon: ImageSourcePropType = isPasswordHidden
    ? hiddenPasswordIcon
    : showingPasswordIcon;

  const isPasswordConfirmationHiddenIcon: ImageSourcePropType =
    isPasswordConfirmationHidden ? hiddenPasswordIcon : showingPasswordIcon;

  // Form handler

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormSignUpModel>({
    resolver: yupResolver(SchemaSignUp),
  });

  const handleSignUp: SubmitHandler<FormSignUpModel> = async (
    data: FormSignUpModel,
  ) => {
    try {
      await signUp(data);

      reset();
    } catch (error) {
      setErrorWhileSignUp(true);
      setTimeout(() => {
        setErrorWhileSignUp(false);
      }, 8000);
      throw new Error('error while submitting form in file signUpScreen');
    }

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

  const handleTheme = async () => {
    await changeTheme();
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
          controllerName={FormControllerName.NAME}
          control={control}
          errors={errors.name}
          label="Your Username"
        />
        <InputTextComponent
          placeholder="Your Email"
          controllerName={FormControllerName.EMAIL}
          control={control}
          errors={errors.email}
          label="Your Email"
          keyboard="email-address"
        />
        <InputTextComponent
          placeholder="Your Password"
          controllerName={FormControllerName.PASSWORD}
          control={control}
          errors={errors.password}
          label="Your Password"
          securedBoolean={isPasswordHidden}
          icon={isPasswordHiddenIcon}
          onPress={handleShowPassword}
        />
        <InputTextComponent
          placeholder="Confirm Password"
          controllerName={FormControllerName.PASSWORDCONFIRMATION}
          control={control}
          errors={errors.passwordConfirmation}
          label="Confirm Password"
          securedBoolean={isPasswordConfirmationHidden}
          icon={isPasswordConfirmationHiddenIcon}
          onPress={handleShowPasswordConfirmation}
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

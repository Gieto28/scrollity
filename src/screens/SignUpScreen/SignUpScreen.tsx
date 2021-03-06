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
import {useAuth, useApp} from '../../context';
import {ImageSourcePropType} from 'react-native';
import {useTranslation} from 'react-i18next';
import {RightSideHeader} from './Styled.SignUpScreen';

const SignUpScreen = () => {
  const {theme, changeTheme, changeLang} = useApp();
  const navigation = useNavigation();
  const {signUp} = useAuth();
  const {t, i18n} = useTranslation();

  const lang = i18n.language;

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

  const imageLanguage =
    lang === 'en'
      ? require('../../assets/Images/portugal.png')
      : require('../../assets/Images/united-kingdom.png');

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

  return (
    <AuthScrollView>
      <IconWrapper>
        <IconComponent
          image={leftArrowIcon}
          altText={'Go back to previous screen'}
          onPress={handleGoBack}
        />
        <RightSideHeader>
          <IconComponent
            image={imageLanguage}
            altText={'Icon to change language - current language is '}
            onPress={() => changeLang()}
            style={{marginRight: 15}}
          />
          <IconComponent
            image={lightDarkICon}
            altText={'Light dark icon to change theme'}
            onPress={() => changeTheme()}
          />
        </RightSideHeader>
      </IconWrapper>
      <AuthView>
        {errorWhileSignUp && (
          <ErrorWhileSignUpText>{t('ErrorSignUp')}</ErrorWhileSignUpText>
        )}
        <InputTextComponent
          placeholder={t('yourName')}
          controllerName={FormControllerName.NAME}
          control={control}
          errors={errors.name}
          label={t('yourName')}
        />
        <InputTextComponent
          placeholder={t('yourEmail')}
          controllerName={FormControllerName.EMAIL}
          control={control}
          errors={errors.email}
          label={t('yourEmail')}
          keyboard="email-address"
        />
        <InputTextComponent
          placeholder={t('yourPassword')}
          controllerName={FormControllerName.PASSWORD}
          control={control}
          errors={errors.password}
          label={t('yourPassword')}
          securedBoolean={isPasswordHidden}
          icon={isPasswordHiddenIcon}
          onPress={handleShowPassword}
        />
        <InputTextComponent
          placeholder={t('confirmPassword')}
          controllerName={FormControllerName.PASSWORDCONFIRMATION}
          control={control}
          errors={errors.passwordConfirmation}
          label={t('confirmPassword')}
          securedBoolean={isPasswordConfirmationHidden}
          icon={isPasswordConfirmationHiddenIcon}
          onPress={handleShowPasswordConfirmation}
        />

        <FormButtonComponent
          name={t('signUp')}
          onPress={handleSubmit(handleSignUp)}
        />
      </AuthView>
    </AuthScrollView>
  );
};

export default SignUpScreen;

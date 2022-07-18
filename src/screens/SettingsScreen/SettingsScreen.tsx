import {ImageSourcePropType} from 'react-native';
import React, {useState} from 'react';
import {AppScrollView} from '../../styles/GlobalStyle';
import {
  FormButtonComponent,
  IconComponent,
  InputTextComponent,
  SeparatorLineComponent,
} from '../../components';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAppSettings, useAuth} from '../../context';
import {
  EditProfileBody,
  FormErrorText,
  RightSideHeader,
  SettingsHeader,
  SettingsLabel,
  SignOutView,
} from './Styled.SettingsScreen';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  FormControllerName,
  FormEditProfileModel,
  SchemaEditProfile,
} from '../../models';
import {useTranslation} from 'react-i18next';

const SettingsScreen = () => {
  const {theme, changeTheme, changeLang} = useAppSettings();
  const {signOut, updateProfile} = useAuth();
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();

  // States
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isPasswordConfirmationHidden, setIsPasswordConfirmationHidden] =
    useState<boolean>(true);
  const [formError, setFormError] = useState<boolean>(false);

  const leftArrowIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-left-dark-24.png')
    : require('../../assets/Images/arrow-left-light-24.png');

  const lightDarkIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/moon-30.png')
    : require('../../assets/Images/sun-50.png');

  const hiddenPasswordIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/hide-password-24-dark.png')
    : require('../../assets/Images/hide-password-24-light.png');

  const showingPasswordIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/show-password-24-dark.png')
    : require('../../assets/Images/show-password-24-light.png');

  const lang = i18n.language;

  const imageLanguage =
    lang === 'en'
      ? require('../../assets/Images/portugal.png')
      : require('../../assets/Images/united-kingdom.png');

  //Icon depending on wether the password is hidden or not

  const isPasswordHiddenIcon: ImageSourcePropType = isPasswordHidden
    ? hiddenPasswordIcon
    : showingPasswordIcon;

  const isPasswordConfirmationHiddenIcon: ImageSourcePropType =
    isPasswordConfirmationHidden ? hiddenPasswordIcon : showingPasswordIcon;

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    resetField,
  } = useForm<FormEditProfileModel>({
    resolver: yupResolver(SchemaEditProfile),
  });

  const handleError = () => {
    setFormError(true);
    setTimeout(() => {
      setFormError(false);
    }, 8000);
  };

  const handleEditProfile: SubmitHandler<FormEditProfileModel> = async (
    data: FormEditProfileModel,
  ) => {
    try {
      const {name, password} = data;

      if (!name && !password) {
        handleError();
        return;
      }
      await updateProfile(data);
      reset();
    } catch (error) {
      resetField('name');
      handleError();
      throw new Error('error while updating profile in file settings screen');
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const handleTheme = async () => {
    await changeTheme();
  };

  const handleShowPassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const handleShowPasswordConfirmation = () => {
    setIsPasswordConfirmationHidden(!isPasswordConfirmationHidden);
  };

  return (
    <AppScrollView>
      <SettingsHeader>
        <IconComponent
          image={leftArrowIcon}
          onPress={handleGoBack}
          altText="click on this button to go back to the previous page"
        />
        <RightSideHeader>
          <IconComponent
            image={imageLanguage}
            altText={'Click here to change language'}
            onPress={() => changeLang()}
            style={{marginRight: 15}}
          />
          <IconComponent
            image={lightDarkIcon}
            onPress={handleTheme}
            altText="click on this button to change theme to the opposite theme"
          />
        </RightSideHeader>
      </SettingsHeader>
      <SeparatorLineComponent />
      <EditProfileBody>
        <SettingsLabel>{t('editProfile')}</SettingsLabel>
        {formError && <FormErrorText>{t('formError')}</FormErrorText>}
        <InputTextComponent
          placeholder={t('yourNewName')}
          controllerName={FormControllerName.NAME}
          errors={errors.name}
          control={control}
          label={t('yourNewName')}
        />
        <InputTextComponent
          placeholder={t('yourNewPassword')}
          controllerName={FormControllerName.PASSWORD}
          errors={errors.password}
          control={control}
          label={t('yourNewPassword')}
          securedBoolean={isPasswordHidden}
          icon={isPasswordHiddenIcon}
          onPress={handleShowPassword}
        />
        <InputTextComponent
          placeholder={t('confirmNewPassword')}
          controllerName={FormControllerName.PASSWORDCONFIRMATION}
          errors={errors.passwordConfirmation}
          control={control}
          label={t('confirmNewPassword')}
          securedBoolean={isPasswordConfirmationHidden}
          icon={isPasswordConfirmationHiddenIcon}
          onPress={handleShowPasswordConfirmation}
        />
        <FormButtonComponent
          name={t('editProfile')}
          onPress={handleSubmit(handleEditProfile)}
          fontSize="24px"
        />
      </EditProfileBody>
      <SeparatorLineComponent />
      <SignOutView>
        <FormButtonComponent
          fontSize="24px"
          name={t('logOut')}
          onPress={handleSignOut}
        />
      </SignOutView>
    </AppScrollView>
  );
};

export default SettingsScreen;

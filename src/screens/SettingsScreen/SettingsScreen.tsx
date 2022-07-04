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
  SettingsHeader,
  SettingsLabel,
  SignOutView,
} from './Styled.SettingsScreen';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormEditProfileModel, SchemaEditProfile} from '../../models';

const SettingsScreen = () => {
  const {theme, changeTheme} = useAppSettings();
  const {signOut, updateProfile} = useAuth();
  const navigation = useNavigation();

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
      console.log('update successful');

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
        <IconComponent
          image={lightDarkIcon}
          onPress={handleTheme}
          altText="click on this button to change theme to the opposite theme"
        />
      </SettingsHeader>
      <SeparatorLineComponent />
      <EditProfileBody>
        <SettingsLabel>Edit Profile</SettingsLabel>
        {formError && (
          <FormErrorText>Oops! Something went wrong.</FormErrorText>
        )}
        <InputTextComponent
          placeholder={'Your new username...'}
          value={''}
          controllerName={'name'}
          errors={errors.name}
          control={control}
          label="Your new username"
        />
        <InputTextComponent
          placeholder={'Your new password...'}
          value={''}
          controllerName={'password'}
          errors={errors.password}
          control={control}
          label="Your new password"
          securedBoolean={isPasswordHidden}
          icon={isPasswordHiddenIcon}
          onPress={handleShowPassword}
          customIconStyles={{marginTop: 16, marginRight: 5}}
        />
        <InputTextComponent
          placeholder={'Confirm new password...'}
          value={''}
          controllerName={'passwordConfirmation'}
          errors={errors.passwordConfirmation}
          control={control}
          label="Confirm new password"
          securedBoolean={isPasswordConfirmationHidden}
          icon={isPasswordConfirmationHiddenIcon}
          onPress={handleShowPasswordConfirmation}
          customIconStyles={{marginTop: 16, marginRight: 5}}
        />
        <FormButtonComponent
          name="Edit Profile"
          onPress={handleSubmit(handleEditProfile)}
          fontSize="24px"
        />
      </EditProfileBody>
      <SeparatorLineComponent />
      <SignOutView>
        <FormButtonComponent
          fontSize="24px"
          name="Log Out"
          onPress={handleSignOut}
        />
      </SignOutView>
    </AppScrollView>
  );
};

export default SettingsScreen;

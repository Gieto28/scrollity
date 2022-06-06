import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {IconWrapper, LoginTitle} from './Styled.SignInScreen';
import {
  InputTextComponent,
  FormButtonComponent,
  SeparatorLineComponent,
  IconComponent,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {AuthStackParams} from '../../navigation/AuthStack/AuthStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScrollView, AuthView} from '../../styles/GlobalStyle';
import {View} from 'react-native';
import useDeviceColor from '../../hooks/useDeviceColor';
import axios from 'axios';

type SignUpNavigationProp = StackNavigationProp<AuthStackParams, 'SignUp'>;

const SignInScreen: React.FC = () => {
  const theme = useDeviceColor();

  const lightDarkICon = theme.bool
    ? require('../../assets/Images/moon-30.png')
    : require('../../assets/Images/sun-50.png');

  // States

  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  // Form handler

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Functions

  const onSubmit = async (data: {}) => {
    await axios.post('http://localhost:3003/auth/login', data);
  };

  const navigation = useNavigation<SignUpNavigationProp>();

  const handleRedirectToSignUp = () => {
    console.log('This button is working');

    navigation.navigate('SignUp');
  };

  const handleTheme = () => {
    console.log('theme');
  };

  return (
    <AuthScrollView>
      <IconWrapper>
        <IconComponent
          image={lightDarkICon}
          altText={'Light dark icon to change theme'}
          onPress={handleTheme}
        />
      </IconWrapper>
      <AuthView>
        <LoginTitle>Scrollity</LoginTitle>

        <InputTextComponent
          placeholder="E-mail"
          value={''}
          controllerName="email"
          control={control}
          errors={errors.email}
          // label
          label="Your email"
        />

        <InputTextComponent
          placeholder="Password"
          value=""
          controllerName="password"
          control={control}
          errors={errors.password}
          securedBoolean={isPasswordHidden}
          // label
          label="Password"
        />

        <FormButtonComponent name="Sign in" onPress={handleSubmit(onSubmit)} />

        <SeparatorLineComponent labelName="or" />

        <View>
          <FormButtonComponent
            name="Sign up"
            fontSize="16px"
            fontWeight="400"
            onPress={handleRedirectToSignUp}
          />
        </View>
      </AuthView>
    </AuthScrollView>
  );
};

export default SignInScreen;

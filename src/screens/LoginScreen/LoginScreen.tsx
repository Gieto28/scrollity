import React, {useState} from 'react';
import {useForm} from 'react-hook-form';

import {LoginView, LoginTitle} from './Styled.LoginScreen';
import InputTextComponent from '../../components/component.Forms/inputText/InputTextComponent';
import OpacityButtonComponent from '../../components/component.Forms/OpacityButton/OpacityButtonComponent';
import SeparatorLineComponent from '../../components/component.Forms/SeparatorLineComponent/SeparatorLineComponent';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  // States

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(true);

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

  const onSubmit = (data: any) => {
    console.log('hello');
    console.log(data);
  };

  const navigation = useNavigation();

  const handleRedirectToRegister = () => {
    navigation.navigate('SignUp');
  };

  return (
    <LoginView>
      <LoginTitle>Scrollity</LoginTitle>

      <InputTextComponent
        placeholder="E-mail"
        value={''}
        controllerName="email"
        control={control}
        errors={errors.email}
        // label
        label="Your email"
        // styling color
        borderColor="black"
        backgroundColor="#e5e5e5"
      />

      <InputTextComponent
        placeholder="Password"
        value=""
        controllerName="password"
        control={control}
        errors={errors.password}
        securedBoolean={passwordShown}
        // label
        label="Password"
        // styling color
        borderColor="black"
        backgroundColor="#e5e5e5"
      />

      <OpacityButtonComponent
        name="Sign in"
        handleSubmit={handleSubmit(onSubmit)}
      />

      <SeparatorLineComponent labelName="or" />

      <View>
        <OpacityButtonComponent
          name="Sign up"
          fontSize="16px"
          handleRedirectToRegister={handleRedirectToRegister}
        />
      </View>
    </LoginView>
  );
};

export default LoginScreen;

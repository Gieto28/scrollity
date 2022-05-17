import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {LoginTitle} from './Styled.SignInScreen';
import InputTextComponent from '../../components/component.Forms/inputText/InputTextComponent';
import OpacityButtonComponent from '../../components/component.Forms/OpacityButton/OpacityButtonComponent';
import SeparatorLineComponent from '../../components/component.Forms/SeparatorLineComponent/SeparatorLineComponent';
import {useNavigation} from '@react-navigation/native';
import {AuthStackParams} from '../../Navigation/AuthStack/AuthStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScrollView, AuthView} from '../../styles/GlobalStyle';
import {View} from 'react-native';

type SignUpNavigationProp = StackNavigationProp<AuthStackParams, 'SignUp'>;

const SignInScreen: React.FC = () => {
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

  const onSubmit = (data: {}) => {
    console.log('hello');
    console.log(data);
  };

  const navigation = useNavigation<SignUpNavigationProp>();

  const handleRedirectToRegister = () => {
    console.log('This button is working');

    navigation.navigate('SignUp');
  };

  return (
    <AuthScrollView>
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
          onPress={handleSubmit(onSubmit)}
        />

        <SeparatorLineComponent labelName="or" />

        <View>
          <OpacityButtonComponent
            name="Sign up"
            fontSize="16px"
            onPress={handleRedirectToRegister}
          />
        </View>
      </AuthView>
    </AuthScrollView>
  );
};

export default SignInScreen;

type AuthStackParams = {
  SignInScreen: () => JSX.Element;
  SignUpScreen: undefined;
  VerifyAuthRouteScreen: () => JSX.Element;
  AuthLoadingScreen: () => JSX.Element;
};

export default AuthStackParams;

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  Feed: undefined;
  Menu: undefined;
};

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserRegistration {
  email: string;
  name: string;
  password: string;
}

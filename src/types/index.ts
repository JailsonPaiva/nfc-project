export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  AccountType: undefined;
  CompleteProfile: undefined;
  Dashboard: undefined;
  BusinessDashboard: undefined;
  BusinessEvents: undefined;
  BusinessReports: undefined;
  Feed: undefined;
  Menu: undefined;
  Notifications: undefined;
  Profile: undefined;
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

export type AccountType = 'individual' | 'business';

export interface CompleteProfileData {
  accountType: AccountType;
  phone?: string;
  dateOfBirth?: string;
  // Individual fields
  cpf?: string;
  // Business fields
  companyName?: string;
  cnpj?: string;
  businessArea?: string;
  website?: string;
}

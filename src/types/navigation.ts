// Tipos de navegação
export type RootStackParamList = {
  // Auth Flow
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  AccountType: undefined;
  CompleteProfile: undefined;
  
  // Individual Flow
  Dashboard: undefined;
  Feed: undefined;
  Menu: undefined;
  Notifications: undefined;
  Profile: undefined;
  
  // Business Flow
  BusinessDashboard: undefined;
  BusinessEvents: undefined;
  BusinessMenu: undefined;
  BusinessReports: undefined;
  BusinessProfile: undefined;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  AccountType: undefined;
  CompleteProfile: undefined;
};

export type IndividualStackParamList = {
  Dashboard: undefined;
  Feed: undefined;
  Menu: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type BusinessStackParamList = {
  BusinessDashboard: undefined;
  BusinessEvents: undefined;
  BusinessMenu: undefined;
  BusinessReports: undefined;
  BusinessProfile: undefined;
};

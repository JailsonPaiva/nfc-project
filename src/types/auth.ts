// Tipos relacionados à autenticação
export type AccountType = 'individual' | 'business';

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserRegistration {
  email: string;
  name: string;
  password: string;
}

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

export interface User extends BaseEntity {
  email: string;
  name: string;
  accountType: AccountType;
  profile?: UserProfile;
  isActive: boolean;
  lastLoginAt?: Date;
}

export interface UserProfile extends BaseEntity {
  userId: string;
  phone?: string;
  dateOfBirth?: Date;
  cpf?: string;
  companyName?: string;
  cnpj?: string;
  businessArea?: string;
  website?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

import { BaseEntity } from './common';

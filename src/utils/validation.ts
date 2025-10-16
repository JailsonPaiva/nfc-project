// Utilitários de validação
import { VALIDATION_RULES } from '../config/constants';

export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
};

export const validateCPF = (cpf: string): boolean => {
  return VALIDATION_RULES.CPF_REGEX.test(cpf);
};

export const validateCNPJ = (cnpj: string): boolean => {
  return VALIDATION_RULES.CNPJ_REGEX.test(cnpj);
};

export const validatePhone = (phone: string): boolean => {
  return VALIDATION_RULES.PHONE_REGEX.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

// Constantes da aplicação
export const APP_CONFIG = {
  name: 'PassaTap',
  version: '1.0.0',
  description: 'Sistema de pagamentos para eventos com NFC',
};

export const API_CONFIG = {
  baseURL: 'https://api.passatap.com',
  timeout: 10000,
  retryAttempts: 3,
};

export const STORAGE_KEYS = {
  USER_TOKEN: '@passatap:user_token',
  USER_DATA: '@passatap:user_data',
  ONBOARDING_COMPLETED: '@passatap:onboarding_completed',
  THEME_PREFERENCE: '@passatap:theme_preference',
};

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  PHONE_REGEX: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  CPF_REGEX: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CNPJ_REGEX: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
};

export const ANIMATION_CONFIG = {
  DEFAULT_DURATION: 300,
  FAST_DURATION: 200,
  SLOW_DURATION: 500,
  SPRING_CONFIG: {
    damping: 15,
    stiffness: 150,
  },
};

export const FEATURE_FLAGS = {
  ENABLE_BIOMETRIC_AUTH: true,
  ENABLE_DARK_MODE: true,
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: true,
};

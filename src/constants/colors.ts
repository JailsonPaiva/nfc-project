// Design System Colors - Converted from HSL to RGB/HEX for React Native
// Based on the original CSS design system

export const colors = {
  // Base colors
  background: '#212121', // hsl(0 0% 13%)
  foreground: '#fafafa', // hsl(0 0% 98%)
  
  // Card colors
  card: '#2e2e2e', // hsl(0 0% 18%)
  cardForeground: '#fafafa', // hsl(0 0% 98%)
  
  // Popover colors
  popover: '#2e2e2e', // hsl(0 0% 18%)
  popoverForeground: '#fafafa', // hsl(0 0% 98%)
  
  // Primary colors
  primary: '#63c4c0', // Verde-água
  primaryForeground: '#1a1a1a', // Preto para contraste
  
  // Gradient colors
  gradientStart: '#474747', // Nova cor principal
  gradientEnd: '#2e2e2e', // Cor mais escura
  
  // Secondary colors
  secondary: '#3a3a3a', // hsl(0 0% 23%)
  secondaryForeground: '#fafafa', // hsl(0 0% 98%)
  
  // Muted colors
  muted: '#474747', // hsl(0 0% 28%)
  mutedForeground: '#a6a6a6', // hsl(0 0% 65%)
  
  // Accent colors
  accent: '#63c4c0', // Verde-água
  accentForeground: '#1a1a1a', // Preto para contraste
  
  // Destructive colors
  destructive: '#ef4444', // hsl(0 84.2% 60.2%)
  destructiveForeground: '#fafafa', // hsl(0 0% 98%)
  
  // Border and input colors
  border: '#474747', // hsl(0 0% 28%)
  input: '#3a3a3a', // hsl(0 0% 23%)
  ring: '#63c4c0', // Verde-água
  
  // Glass effect colors
  glassBg: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  
  // Additional colors for better contrast
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

// Gradient definitions
export const gradients = {
  primary: ['#63c4c0', '#4fa8a5'], // Verde-água claro para escuro
  secondary: ['#63c4c0', '#3a9d99'], // Variação verde-água
  card: ['#404040', '#2e2e2e'], // hsl(0 0% 25%) to hsl(0 0% 18%)
  text: ['#63c4c0', '#4fa8a5'], // Mesmo do primary
  background: ['#212121', '#212121'], // Cinza sólido
};

// Shadow definitions
export const shadows = {
  glow: {
    shadowColor: '#63c4c0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  elegant: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
};

// Spacing system
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

// Typography
export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Glass effect styles
export const glassStyles = {
  glass: {
    backgroundColor: colors.glassBg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  inputGlass: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
};

// Common component styles
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.elegant,
  },
  button: {
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  input: {
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.foreground,
  },
};

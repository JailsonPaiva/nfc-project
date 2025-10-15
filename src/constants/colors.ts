// Design System Colors - PassaTap (versão elegante e clara)
// Paleta sofisticada com toque brasileiro

export const colors = {
  // Cor Principal - Laranja Vibrante
  primary: '#FF7A00', // Energia, inovação e foco
  primaryForeground: '#FFFFFF', // Branco para contraste
  primaryLight: '#FF9433', // Variação mais clara
  primaryDark: '#CC6200', // Variação mais escura
  
  // Background Principal - Off-white Quente
  background: '#FDFBF9', // Fundo suave, levemente quente, elegante e limpo
  foreground: '#2B2B2B', // Cinza escuro profundo para textos
  
  // Background Secundário - Cinza Neutro Claro
  backgroundSecondary: '#F4F4F4', // Camadas e profundidade sem pesar
  
  // Texto Principal - Cinza Escuro Profundo
  textPrimary: '#2B2B2B', // Refinado e confortável para leitura
  
  // Texto Secundário - Cinza Médio
  textSecondary: '#6E6E6E', // Legendas, ícones ou informações secundárias
  
  // Cor de Apoio Fria - Azul Petróleo
  accent: '#004F64', // Contraponto elegante ao laranja
  accentForeground: '#FFFFFF',
  accentLight: '#006B8A', // Variação mais clara
  
  // Cor Destaque Suave - Azul Claro Acinzentado
  highlight: '#DCE9EE', // Fundo de contraste elegante
  highlightForeground: '#2B2B2B',
  
  // Cor Extra de Equilíbrio - Bege Neutro
  neutral: '#EAE3DD', // Sofisticação e naturalidade
  neutralForeground: '#2B2B2B',
  
  // Card colors
  card: '#FFFFFF', // Branco para cards sobre off-white
  cardForeground: '#2B2B2B',
  cardSecondary: '#F4F4F4', // Cards secundários
  
  // Popover colors
  popover: '#FFFFFF',
  popoverForeground: '#2B2B2B',
  
  // Muted colors
  muted: '#F4F4F4', // Background secundário
  mutedForeground: '#6E6E6E', // Texto secundário
  
  // Destructive colors
  destructive: '#E63946', // Vermelho elegante
  destructiveForeground: '#FFFFFF',
  
  // Border and input colors
  border: '#E0E0E0',
  borderOrange: '#FF7A00', // Borda laranja fina
  input: '#F4F4F4',
  ring: '#FF7A00', // Laranja vibrante para focus
  
  // Glass effect colors
  glassBg: 'rgba(255, 255, 255, 0.95)',
  glassBorder: 'rgba(255, 122, 0, 0.3)',
  
  // Additional colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Gradient definitions
export const gradients = {
  primary: ['#FF7A00', '#FF9433'], // Laranja vibrante para laranja claro
  secondary: ['#FF9433', '#FFAA66'], // Laranja claro para mais claro
  accent: ['#004F64', '#006B8A'], // Azul petróleo para azul petróleo claro
  card: ['#FFFFFF', '#F4F4F4'], // Branco para cinza neutro claro (cards elegantes)
  cardDark: ['#2B2B2B', '#1E1E1E'], // Cards escuros quando necessário
  text: ['#FF7A00', '#FF9433'], // Laranja para textos com gradiente
  background: ['#FDFBF9', '#FDFBF9'], // Off-white quente sólido
  neutral: ['#EAE3DD', '#F4F4F4'], // Bege neutro para cinza claro
};

// Shadow definitions
export const shadows = {
  glow: {
    shadowColor: '#FF7A00', // Laranja vibrante
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  elegant: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  card: {
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
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

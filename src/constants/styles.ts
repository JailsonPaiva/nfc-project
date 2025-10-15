import { StyleSheet } from 'react-native';
import { colors, gradients, shadows, spacing, borderRadius, typography, glassStyles } from './colors';

// Global styles that match the CSS design system
export const globalStyles = StyleSheet.create({
  // Base styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Glass effects
  glassEffect: {
    ...glassStyles.glass,
    borderRadius: borderRadius.xl,
  },
  
  glassCard: {
    ...glassStyles.glassCard,
    borderRadius: borderRadius.xxl,
  },
  
  inputGlass: {
    ...glassStyles.inputGlass,
    borderRadius: borderRadius.xl,
  },
  
  // Button styles
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.glow,
  },
  
  buttonSecondary: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  buttonGhost: {
    backgroundColor: 'transparent',
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Text styles
  textPrimary: {
    color: colors.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  
  textSecondary: {
    color: colors.secondaryForeground,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
  },
  
  textMuted: {
    color: colors.mutedForeground,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
  },
  
  textDestructive: {
    color: colors.destructive,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  
  // Heading styles
  heading1: {
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.foreground,
    lineHeight: typography.fontSize['5xl'] * typography.lineHeight.tight,
  },
  
  heading2: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.foreground,
    lineHeight: typography.fontSize['4xl'] * typography.lineHeight.tight,
  },
  
  heading3: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.foreground,
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
  },
  
  heading4: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.foreground,
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
  },
  
  // Input styles
  input: {
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.foreground,
    fontSize: typography.fontSize.base,
    minHeight: 56,
  },
  
  inputFocused: {
    borderColor: colors.ring,
    borderWidth: 2,
  },
  
  // Card styles
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    ...shadows.elegant,
  },
  
  cardGlass: {
    ...glassStyles.glassCard,
    padding: spacing.lg,
    ...shadows.elegant,
  },
  
  // Navigation styles
  navButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  
  navButtonActive: {
    // Active state will be handled by color changes
  },
  
  // Layout styles
  row: {
    flexDirection: 'row',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  spaceAround: {
    justifyContent: 'space-around',
  },
  
  // Spacing utilities
  p: { padding: spacing.md },
  px: { paddingHorizontal: spacing.md },
  py: { paddingVertical: spacing.md },
  pt: { paddingTop: spacing.md },
  pb: { paddingBottom: spacing.md },
  pl: { paddingLeft: spacing.md },
  pr: { paddingRight: spacing.md },
  
  m: { margin: spacing.md },
  mx: { marginHorizontal: spacing.md },
  my: { marginVertical: spacing.md },
  mt: { marginTop: spacing.md },
  mb: { marginBottom: spacing.md },
  ml: { marginLeft: spacing.md },
  mr: { marginRight: spacing.md },
  
  // Large spacing
  pLg: { padding: spacing.lg },
  pxLg: { paddingHorizontal: spacing.lg },
  pyLg: { paddingVertical: spacing.lg },
  ptLg: { paddingTop: spacing.lg },
  pbLg: { paddingBottom: spacing.lg },
  
  mLg: { margin: spacing.lg },
  mxLg: { marginHorizontal: spacing.lg },
  myLg: { marginVertical: spacing.lg },
  mtLg: { marginTop: spacing.lg },
  mbLg: { marginBottom: spacing.lg },
  
  // Extra large spacing
  pXl: { padding: spacing.xl },
  pxXl: { paddingHorizontal: spacing.xl },
  pyXl: { paddingVertical: spacing.xl },
  
  mXl: { margin: spacing.xl },
  mxXl: { marginHorizontal: spacing.xl },
  myXl: { marginVertical: spacing.xl },
});

// Animation configurations
export const animations = {
  smooth: {
    duration: 300,
    useNativeDriver: true,
  },
  
  spring: {
    tension: 300,
    friction: 30,
    useNativeDriver: true,
  },
  
  timing: {
    duration: 700,
    useNativeDriver: true,
  },
};

// Helper functions for dynamic styles
export const createGlassStyle = (opacity: number = 0.05) => ({
  backgroundColor: `rgba(255, 255, 255, ${opacity})`,
  borderWidth: 1,
  borderColor: `rgba(255, 255, 255, ${opacity * 2})`,
});

export const createGradientStyle = (gradientType: keyof typeof gradients) => {
  return {
    colors: gradients[gradientType],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  };
};

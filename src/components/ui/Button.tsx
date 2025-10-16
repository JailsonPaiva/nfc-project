import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, shadows, spacing, borderRadius, typography } from '../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    disabled && styles.disabledButton,
    style,
  ];

  const buttonTextStyle = [
    styles.buttonText,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  const renderButtonContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={variant === 'primary' ? '#ffffff' : '#ffffff'}
          size="small"
        />
      );
    }
    return <Text style={buttonTextStyle}>{title}</Text>;
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={style}
      >
        <LinearGradient
          colors={gradients.primary as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button, styles[`${size}Button`], disabled && styles.disabledButton]}
        >
          {renderButtonContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderButtonContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
  },
  
  // Variants
  primaryButton: {
    ...shadows.glow,
  },
  primaryText: {
    color: colors.primaryForeground,
  },
  
  secondaryButton: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryText: {
    color: colors.textPrimary,
  },
  
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  outlineText: {
    color: colors.foreground,
  },
  
  ghostButton: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: colors.foreground,
  },
  
  // Sizes
  smallButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 36,
  },
  smallText: {
    fontSize: typography.fontSize.sm,
  },
  
  mediumButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 48,
  },
  mediumText: {
    fontSize: typography.fontSize.base,
  },
  
  largeButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    minHeight: 56,
  },
  largeText: {
    fontSize: typography.fontSize.lg,
  },
  
  // States
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.6,
  },
});

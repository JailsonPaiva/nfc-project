import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Ionicons } from '@expo/vector-icons';
import { UserRegistration } from '../types';
import { colors, gradients, shadows, spacing, borderRadius, typography } from '../constants/colors';

interface RegisterScreenProps {
  onBack: () => void;
  onSignUp: (data: UserRegistration) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onBack,
  onSignUp,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: '', color: '#9ca3af' };
    if (password.length < 6) return { strength: 'Weak', color: '#ef4444' };
    if (password.length < 10) return { strength: 'Medium', color: '#f59e0b' };
    return { strength: 'Strong', color: '#10b981' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async () => {
    if (!formData.email.trim() || !formData.name.trim() || !formData.password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (!formData.email.includes('@')) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular API call
      onSignUp({ 
        email: formData.email, 
        name: formData.name, 
        password: formData.password 
      });
    } catch (error) {
      Alert.alert('Erro', 'Falha ao criar conta');
    }
  };

  return (
    <LinearGradient
      colors={gradients.background}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        {/* Background NFC Card */}
        <View style={styles.backgroundCard}>
          <LinearGradient
            colors={['#4a5568', '#9ca3af']}
            style={styles.backgroundCardGradient}
          >
            <Ionicons name="wifi" size={48} color="rgba(255, 255, 255, 0.8)" style={styles.backgroundIcon} />
          </LinearGradient>
        </View>

        <View style={styles.mainContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Get Started Free</Text>
            <Text style={styles.subtitle}>Free Forever. No Credit Card Needed</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email Address</Text>
              <Input
                placeholder="yourname@gmail.com"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={<Ionicons name="mail-outline" size={20} color="#9ca3af" />}
                style={styles.input}
              />
            </View>

            {/* Name Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Your Name</Text>
              <Input
                placeholder="@yourname"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                autoCapitalize="none"
                leftIcon={<Ionicons name="person-outline" size={20} color="#9ca3af" />}
                style={styles.input}
              />
            </View>

            {/* Password Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Password</Text>
              <Input
                placeholder="••••••••"
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry={!showPassword}
                leftIcon={<Ionicons name="key-outline" size={20} color="#9ca3af" />}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                }
                style={styles.input}
              />
              {formData.password && (
                <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                  {passwordStrength.strength}
                </Text>
              )}
            </View>

            {/* Submit Button */}
            <Button
              title="Sign in"
              onPress={handleSubmit}
              size="large"
              style={styles.signUpButton}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or sign up with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Auth */}
            <View style={styles.socialContainer}>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => Alert.alert('Google Sign Up', 'Funcionalidade será implementada')}
              >
                <Ionicons name="logo-google" size={24} color="#4285F4" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => Alert.alert('Apple Sign Up', 'Funcionalidade será implementada')}
              >
                <Ionicons name="logo-apple" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Background decorative elements */}
      <View style={[styles.decorativeElement, styles.topLeft]} />
      <View style={[styles.decorativeElement, styles.bottomRight]} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  mainContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    zIndex: 10,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 24,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  backText: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 8,
  },
  backgroundCard: {
    position: 'absolute',
    top: 32,
    right: 32,
    width: 320,
    height: 460,
    borderRadius: 24,
    transform: [{ rotate: '12deg' }],
    zIndex: 0,
    opacity: 0.3,
  },
  backgroundCardGradient: {
    flex: 1,
    borderRadius: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 24,
  },
  backgroundIcon: {
    marginTop: 24,
    marginLeft: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    zIndex: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#9ca3af',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    zIndex: 10,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 56,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
  },
  signUpButton: {
    width: '100%',
    height: 56,
    marginTop: 8,
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#404040',
  },
  dividerText: {
    color: '#9ca3af',
    fontSize: 14,
    paddingHorizontal: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#404040',
  },
  decorativeElement: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
  },
  topLeft: {
    top: 200,
    left: -16,
  },
  bottomRight: {
    bottom: 100,
    right: -16,
  },
});
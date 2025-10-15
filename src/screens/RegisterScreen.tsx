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
          <Ionicons name="arrow-back" size={24} color="#2B2B2B" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        {/* Mini Cards Decorativos */}
        <View style={styles.miniCard1}>
          <LinearGradient
            colors={gradients.primary}
            style={styles.miniCardGradient}
          >
            <Ionicons name="card" size={18} color="#FFFFFF" />
          </LinearGradient>
        </View>
        
        <View style={styles.miniCard2}>
          <LinearGradient
            colors={gradients.accent}
            style={styles.miniCardGradient}
          >
            <Ionicons name="finger-print" size={18} color="#FFFFFF" />
          </LinearGradient>
        </View>
        
        <View style={styles.miniCard3}>
          <LinearGradient
            colors={gradients.cardDark}
            style={styles.miniCardGradient}
          >
            <Ionicons name="shield-checkmark" size={18} color="#FF7A00" />
          </LinearGradient>
        </View>
        
        <View style={styles.miniCard4}>
          <LinearGradient
            colors={gradients.primary}
            style={styles.miniCardGradient}
          >
            <Ionicons name="wallet" size={16} color="#FFFFFF" />
          </LinearGradient>
        </View>
        
        <View style={styles.miniCard5}>
          <LinearGradient
            colors={gradients.accent}
            style={styles.miniCardGradient}
          >
            <Ionicons name="sync" size={16} color="#FFFFFF" />
          </LinearGradient>
        </View>
        
        <View style={styles.miniCard6}>
          <LinearGradient
            colors={gradients.cardDark}
            style={styles.miniCardGradient}
          >
            <Ionicons name="lock-closed" size={14} color="#FF7A00" />
          </LinearGradient>
        </View>
        
        <View style={styles.miniCard7}>
          <LinearGradient
            colors={gradients.primary}
            style={styles.miniCardGradient}
          >
            <Ionicons name="qr-code" size={14} color="#FFFFFF" />
          </LinearGradient>
        </View>
        
        <View style={styles.miniCard8}>
          <LinearGradient
            colors={gradients.accent}
            style={styles.miniCardGradient}
          >
            <Ionicons name="analytics" size={12} color="#FFFFFF" />
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
                leftIcon={<Ionicons name="mail-outline" size={20} color="#6E6E6E" />}
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
                leftIcon={<Ionicons name="person-outline" size={20} color="#6E6E6E" />}
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
                leftIcon={<Ionicons name="key-outline" size={20} color="#6E6E6E" />}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#6E6E6E"
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
                <Ionicons name="logo-google" size={24} color="#FF7A00" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => Alert.alert('Apple Sign Up', 'Funcionalidade será implementada')}
              >
                <Ionicons name="logo-apple" size={24} color="#004F64" />
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
    color: '#2B2B2B',
    fontSize: 18,
    marginLeft: 8,
  },
  // Camada 1: Cards mais próximos (bem visíveis)
  miniCard1: {
    position: 'absolute',
    top: 100,
    right: 30,
    width: 75,
    height: 95,
    borderRadius: 14,
    transform: [{ rotate: '15deg' }],
    zIndex: 1,
    opacity: 0.88,
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.4,
    shadowRadius: 22,
    elevation: 9,
  },
  miniCard2: {
    position: 'absolute',
    top: 250,
    left: 20,
    width: 68,
    height: 88,
    borderRadius: 14,
    transform: [{ rotate: '-10deg' }],
    zIndex: 1,
    opacity: 0.82,
    shadowColor: '#004F64',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  // Camada 2: Cards em profundidade média
  miniCard3: {
    position: 'absolute',
    top: 420,
    right: 40,
    width: 58,
    height: 78,
    borderRadius: 12,
    transform: [{ rotate: '8deg' }],
    zIndex: -1,
    opacity: 0.48,
    shadowColor: '#2B2B2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 4,
  },
  miniCard4: {
    position: 'absolute',
    bottom: 220,
    left: 35,
    width: 55,
    height: 75,
    borderRadius: 12,
    transform: [{ rotate: '-14deg' }],
    zIndex: -1,
    opacity: 0.52,
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 5,
  },
  miniCard5: {
    position: 'absolute',
    bottom: 100,
    right: 25,
    width: 62,
    height: 82,
    borderRadius: 12,
    transform: [{ rotate: '12deg' }],
    zIndex: -1,
    opacity: 0.46,
    shadowColor: '#004F64',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  // Camada 3: Cards bem ao fundo (desfocados)
  miniCard6: {
    position: 'absolute',
    top: 180,
    left: 15,
    width: 48,
    height: 68,
    borderRadius: 10,
    transform: [{ rotate: '-8deg' }],
    zIndex: -2,
    opacity: 0.16,
    shadowColor: '#2B2B2B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 1,
  },
  miniCard7: {
    position: 'absolute',
    bottom: 350,
    right: 50,
    width: 45,
    height: 65,
    borderRadius: 10,
    transform: [{ rotate: '18deg' }],
    zIndex: -2,
    opacity: 0.14,
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 1,
  },
  miniCard8: {
    position: 'absolute',
    top: 500,
    left: 45,
    width: 40,
    height: 60,
    borderRadius: 8,
    transform: [{ rotate: '-12deg' }],
    zIndex: -2,
    opacity: 0.12,
    shadowColor: '#004F64',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 1,
  },
  miniCardGradient: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
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
    color: '#2B2B2B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6E6E6E',
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
    color: '#6E6E6E',
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
    color: '#6E6E6E',
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
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
import { UserCredentials } from '../types';
import { colors, gradients, shadows, spacing, borderRadius, typography } from '../constants/colors';

interface LoginScreenProps {
  onBack: () => void;
  onSignIn: (credentials: UserCredentials) => void;
  onForgotPassword: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onSignIn,
  onForgotPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular API call
      onSignIn({ username, password });
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer login');
    }
  };

  const handleForgotPasswordPress = () => {
    Alert.alert(
      'Recuperar Senha',
      'Funcionalidade de recuperação de senha será implementada em breve!'
    );
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

        {/* Mini Cards Decorativos - com efeito de profundidade */}
        <View style={styles.miniCard1}>
          <LinearGradient
            colors={gradients.accent}
            style={styles.miniCardGradient}
          >
            <Ionicons name="wifi" size={16} color="#FFFFFF" />
          </LinearGradient>
        </View>
        
        <View style={styles.miniCard2}>
          <LinearGradient
            colors={gradients.primary}
            style={styles.miniCardGradient}
          >
            <Ionicons name="card-outline" size={16} color="#FFFFFF" />
          </LinearGradient>
        </View>
        
        <View style={styles.miniCard3}>
          <LinearGradient
            colors={gradients.cardDark}
            style={styles.miniCardGradient}
          >
            <Ionicons name="flash" size={16} color="#FF7A00" />
          </LinearGradient>
        </View>
        
        <View style={styles.miniCard4}>
          <LinearGradient
            colors={gradients.accent}
            style={styles.miniCardGradient}
          >
            <Ionicons name="swap-horizontal" size={16} color="#FFFFFF" />
          </LinearGradient>
        </View>
        
        <View style={styles.miniCard5}>
          <LinearGradient
            colors={gradients.primary}
            style={styles.miniCardGradient}
          >
            <Ionicons name="finger-print" size={14} color="#FFFFFF" />
          </LinearGradient>
        </View>
        
        <View style={styles.miniCard6}>
          <LinearGradient
            colors={gradients.cardDark}
            style={styles.miniCardGradient}
          >
            <Ionicons name="shield-checkmark" size={14} color="#FF7A00" />
          </LinearGradient>
        </View>
        
        <View style={styles.miniCard7}>
          <LinearGradient
            colors={gradients.accent}
            style={styles.miniCardGradient}
          >
            <Ionicons name="wallet" size={12} color="#FFFFFF" />
          </LinearGradient>
        </View>

        <View style={styles.mainContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>welcome back we missed you</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Username Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Username</Text>
              <Input
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                leftIcon={<Ionicons name="person-outline" size={20} color="#6E6E6E" />}
                style={styles.input}
              />
            </View>

            {/* Password Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Password</Text>
              <Input
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
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
              <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPasswordPress}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <Button
              title="Sign in"
              onPress={handleSubmit}
              size="large"
              style={styles.signInButton}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Auth */}
            <View style={styles.socialContainer}>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => Alert.alert('Google Login', 'Funcionalidade será implementada')}
              >
                <Ionicons name="logo-google" size={24} color="#FF7A00" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => Alert.alert('Apple Login', 'Funcionalidade será implementada')}
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
    top: 80,
    right: 40,
    width: 70,
    height: 90,
    borderRadius: 14,
    transform: [{ rotate: '12deg' }],
    zIndex: 1,
    opacity: 0.85,
    shadowColor: '#004F64',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  miniCard2: {
    position: 'absolute',
    top: 200,
    left: 30,
    width: 75,
    height: 95,
    borderRadius: 14,
    transform: [{ rotate: '-8deg' }],
    zIndex: 1,
    opacity: 0.9,
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.4,
    shadowRadius: 22,
    elevation: 9,
  },
  // Camada 2: Cards em profundidade média
  miniCard3: {
    position: 'absolute',
    bottom: 320,
    right: 20,
    width: 55,
    height: 75,
    borderRadius: 12,
    transform: [{ rotate: '15deg' }],
    zIndex: -1,
    opacity: 0.45,
    shadowColor: '#2B2B2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  miniCard4: {
    position: 'absolute',
    bottom: 200,
    left: 50,
    width: 60,
    height: 80,
    borderRadius: 12,
    transform: [{ rotate: '-12deg' }],
    zIndex: -1,
    opacity: 0.5,
    shadowColor: '#004F64',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 4,
  },
  miniCard5: {
    position: 'absolute',
    top: 350,
    right: 60,
    width: 50,
    height: 70,
    borderRadius: 11,
    transform: [{ rotate: '20deg' }],
    zIndex: -1,
    opacity: 0.42,
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 3,
  },
  // Camada 3: Cards bem ao fundo (desfocados)
  miniCard6: {
    position: 'absolute',
    bottom: 400,
    left: 25,
    width: 45,
    height: 65,
    borderRadius: 10,
    transform: [{ rotate: '-18deg' }],
    zIndex: -2,
    opacity: 0.15,
    shadowColor: '#2B2B2B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 1,
  },
  miniCard7: {
    position: 'absolute',
    top: 150,
    left: 15,
    width: 42,
    height: 62,
    borderRadius: 9,
    transform: [{ rotate: '-5deg' }],
    zIndex: -2,
    opacity: 0.12,
    shadowColor: '#004F64',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
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
    marginBottom: 40,
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
    marginBottom: 24,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#6E6E6E',
    fontSize: 14,
  },
  signInButton: {
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
import React, { useState, useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { FeedScreen } from '../screens/FeedScreen';
import { RootStackParamList, UserCredentials, UserRegistration } from '../types';
import { Alert } from 'react-native';
import { colors, gradients } from '../constants/colors';

const Stack = createStackNavigator<RootStackParamList>();

// Configuração de transição consistente para todas as telas
const screenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: '#FDFBF9' }, // Off-white quente
  gestureEnabled: true,
  gestureDirection: 'horizontal' as const,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
  },
};

// Componente de navegação estática (fora do Stack)
interface StaticNavBarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

const StaticNavBar: React.FC<StaticNavBarProps> = ({ activeScreen, onNavigate }) => {
  return (
    <View style={styles.bottomNav}>
      <View style={styles.navContent}>
        <TouchableOpacity
          onPress={() => onNavigate('Dashboard')}
          style={styles.navButton}
        >
          <Ionicons 
            name="home" 
            size={20} 
            color={activeScreen === 'Dashboard' ? '#FF7A00' : '#A0A0A0'} 
          />
          <Text style={[
            styles.navButtonText,
            activeScreen === 'Dashboard' && styles.navButtonTextActive
          ]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNavigate('Feed')}
          style={styles.navButton}
        >
          <Ionicons 
            name="newspaper" 
            size={20} 
            color={activeScreen === 'Feed' ? '#FF7A00' : '#A0A0A0'} 
          />
          <Text style={[
            styles.navButtonText,
            activeScreen === 'Feed' && styles.navButtonTextActive
          ]}>
            Feed
          </Text>
        </TouchableOpacity>

        <LinearGradient
          colors={gradients.primary}
          style={styles.scanButton}
        >
          <TouchableOpacity style={styles.scanButtonInner}>
            <Ionicons name="scan" size={28} color="#ffffff" />
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity
          onPress={() => onNavigate('Feed')}
          style={styles.navButton}
        >
          <Ionicons 
            name="chatbubble" 
            size={20} 
            color={activeScreen === 'Feed' ? '#FF7A00' : '#A0A0A0'} 
          />
          <Text style={[
            styles.navButtonText,
            activeScreen === 'Feed' && styles.navButtonTextActive
          ]}>
            Message
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNavigate('Feed')}
          style={styles.navButton}
        >
          <Ionicons 
            name="person" 
            size={20} 
            color={activeScreen === 'Feed' ? '#FF7A00' : '#A0A0A0'} 
          />
          <Text style={[
            styles.navButtonText,
            activeScreen === 'Feed' && styles.navButtonTextActive
          ]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('Onboarding');
  const [showNavBar, setShowNavBar] = useState(false);
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

  const handleSignIn = (credentials: UserCredentials, navigation: any) => {
    Alert.alert(
      'Login realizado com sucesso!',
      `Bem-vindo, ${credentials.username}!`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowNavBar(true);
            setCurrentScreen('Dashboard');
            navigation.navigate('Dashboard');
          }
        }
      ]
    );
  };

  const handleSignUp = (data: UserRegistration, navigation: any) => {
    Alert.alert(
      'Registro realizado com sucesso!',
      `Bem-vindo, ${data.name}!`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowNavBar(true);
            setCurrentScreen('Dashboard');
            navigation.navigate('Dashboard');
          }
        }
      ]
    );
  };

  const handleNavigate = (screen: string, navigation: any) => {
    setCurrentScreen(screen);
    navigation.navigate(screen);
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <View style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={screenOptions}
        >
          <Stack.Screen name="Onboarding">
            {({ navigation }) => (
              <OnboardingScreen
                onGetStarted={() => navigation.navigate('Login')}
                onCreateAccount={() => navigation.navigate('Register')}
              />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Login">
            {({ navigation }) => (
              <LoginScreen
                onBack={() => navigation.goBack()}
                onSignIn={(credentials) => handleSignIn(credentials, navigation)}
                onForgotPassword={() => {
                  Alert.alert(
                    'Recuperar Senha',
                    'Funcionalidade de recuperação de senha será implementada em breve!'
                  );
                }}
              />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Register">
            {({ navigation }) => (
              <RegisterScreen
                onBack={() => navigation.goBack()}
                onSignUp={(data) => handleSignUp(data, navigation)}
              />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Dashboard">
            {({ navigation }) => (
              <DashboardScreen onNavigate={(screen) => handleNavigate(screen, navigation)} />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Feed">
            {({ navigation }) => (
              <FeedScreen onNavigate={(screen) => handleNavigate(screen, navigation)} />
            )}
          </Stack.Screen>
        </Stack.Navigator>

        {/* Navegação estática - sempre visível após login */}
        {showNavBar && (
          <StaticNavBar 
            activeScreen={currentScreen} 
            onNavigate={(screen) => {
              if (navigationRef.current) {
                setCurrentScreen(screen);
                navigationRef.current.navigate(screen as any);
              }
            }} 
          />
        )}
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 122, 0, 0.2)',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    position: 'relative',
  },
  scanButton: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginTop: -32,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scanButtonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButton: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    flex: 1,
    maxWidth: 80,
  },
  navButtonText: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  navButtonTextActive: {
    color: '#FF7A00',
  },
});

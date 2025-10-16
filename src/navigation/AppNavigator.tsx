import React, { useState, useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { AccountTypeScreen } from '../screens/AccountTypeScreen';
import { CompleteProfileScreen } from '../screens/CompleteProfileScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { BusinessDashboardScreen } from '../screens/BusinessDashboardScreen';
import { BusinessEventsScreen } from '../screens/BusinessEventsScreen';
import { BusinessReportsScreen } from '../screens/BusinessReportsScreen';
import { FeedScreen } from '../screens/FeedScreen';
import { MenuScreen } from '../screens/MenuScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RootStackParamList, UserCredentials, UserRegistration, AccountType, CompleteProfileData } from '../types';
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
  accountType?: 'individual' | 'business';
}

const StaticNavBar: React.FC<StaticNavBarProps> = ({ activeScreen, onNavigate, accountType }) => {
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
            color={(activeScreen === 'Dashboard' || activeScreen === 'BusinessDashboard') ? '#FF7A00' : '#A0A0A0'} 
          />
          <Text style={[
            styles.navButtonText,
            (activeScreen === 'Dashboard' || activeScreen === 'BusinessDashboard') && styles.navButtonTextActive
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
          onPress={() => onNavigate('Notifications')}
          style={styles.navButton}
        >
          <Ionicons 
            name="chatbubble" 
            size={20} 
            color={activeScreen === 'Notifications' ? '#FF7A00' : '#A0A0A0'}
          />
          <Text style={[
            styles.navButtonText,
            activeScreen === 'Notifications' && styles.navButtonTextActive
          ]}>
            Notificações
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNavigate('Profile')}
          style={styles.navButton}
        >
          <Ionicons 
            name="person" 
            size={20} 
            color={activeScreen === 'Profile' ? '#FF7A00' : '#A0A0A0'}
          />
          <Text style={[
            styles.navButtonText,
            activeScreen === 'Profile' && styles.navButtonTextActive
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
  const [userData, setUserData] = useState<{ name: string; email: string; accountType?: AccountType } | null>(null);
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
    // Salvar dados do usuário e navegar para seleção de tipo
    setUserData({ name: data.name, email: data.email });
    navigation.navigate('AccountType');
  };

  const handleAccountTypeSelection = (accountType: AccountType, navigation: any) => {
    // Atualizar dados do usuário com tipo de conta
    setUserData(prev => prev ? { ...prev, accountType } : null);
    navigation.navigate('CompleteProfile');
  };

  const handleProfileComplete = (profileData: CompleteProfileData, navigation: any) => {
    Alert.alert(
      'Perfil completo!',
      `Bem-vindo ao PassaTap, ${userData?.name}!`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowNavBar(true);
            // Navegar para dashboard baseado no tipo de conta
            const dashboardScreen = profileData.accountType === 'business' ? 'BusinessDashboard' : 'Dashboard';
            setCurrentScreen(dashboardScreen);
            navigation.navigate(dashboardScreen);
          }
        }
      ]
    );
  };

  const handleNavigate = (screen: string, navigation: any) => {
    // Mapear navegação baseada no tipo de conta
    let targetScreen = screen;
    let currentScreenName = screen;
    
    if (userData?.accountType === 'business') {
      switch (screen) {
        case 'Dashboard':
          targetScreen = 'BusinessDashboard';
          currentScreenName = 'BusinessDashboard';
          break;
        case 'Events':
          targetScreen = 'BusinessEvents';
          currentScreenName = 'BusinessEvents';
          break;
        case 'Reports':
          targetScreen = 'BusinessReports';
          currentScreenName = 'BusinessReports';
          break;
        case 'Feed':
          // Para Business, Feed vai para BusinessDashboard (não existe Feed separado)
          targetScreen = 'BusinessDashboard';
          currentScreenName = 'BusinessDashboard';
          break;
        default:
          targetScreen = screen;
          currentScreenName = screen;
      }
    }
    
    setCurrentScreen(currentScreenName);
    navigation.navigate(targetScreen as any);
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
          
          <Stack.Screen name="AccountType">
            {({ navigation }) => (
              <AccountTypeScreen
                onBack={() => navigation.goBack()}
                onSelectType={(type) => handleAccountTypeSelection(type, navigation)}
                userName={userData?.name || ''}
              />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="CompleteProfile">
            {({ navigation }) => (
              <CompleteProfileScreen
                onBack={() => navigation.goBack()}
                onComplete={(data) => handleProfileComplete(data, navigation)}
                accountType={userData?.accountType || 'individual'}
                userName={userData?.name || ''}
              />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Dashboard">
            {({ navigation }) => (
              <DashboardScreen onNavigate={(screen) => handleNavigate(screen, navigation)} />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="BusinessDashboard">
            {({ navigation }) => (
              <BusinessDashboardScreen onNavigate={(screen) => handleNavigate(screen, navigation)} />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="BusinessEvents">
            {({ navigation }) => (
              <BusinessEventsScreen onNavigate={(screen) => handleNavigate(screen, navigation)} />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="BusinessReports">
            {({ navigation }) => (
              <BusinessReportsScreen onNavigate={(screen) => handleNavigate(screen, navigation)} />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Feed">
            {({ navigation }) => (
              <FeedScreen onNavigate={(screen) => handleNavigate(screen, navigation)} />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Menu">
            {({ navigation }) => (
              <MenuScreen onNavigate={(screen) => handleNavigate(screen, navigation)} />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Notifications">
            {({ navigation }) => (
              <NotificationsScreen onNavigate={(screen) => handleNavigate(screen, navigation)} />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Profile">
            {({ navigation }) => (
              <ProfileScreen onNavigate={(screen) => handleNavigate(screen, navigation)} />
            )}
          </Stack.Screen>
        </Stack.Navigator>

        {/* Navegação estática - sempre visível após login */}
        {showNavBar && (
          <StaticNavBar 
            activeScreen={currentScreen} 
            accountType={userData?.accountType}
            onNavigate={(screen) => {
              if (navigationRef.current) {
                handleNavigate(screen, navigationRef.current);
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

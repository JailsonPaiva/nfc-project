import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { FeedScreen } from '../screens/FeedScreen';
import { RootStackParamList, UserCredentials, UserRegistration } from '../types';
import { Alert } from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const handleSignIn = (credentials: UserCredentials, navigation: any) => {
    Alert.alert(
      'Login realizado com sucesso!',
      `Bem-vindo, ${credentials.username}!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Dashboard')
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
          onPress: () => navigation.navigate('Dashboard')
        }
      ]
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#1a1a1a' },
        }}
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
            <DashboardScreen onNavigate={(screen) => navigation.navigate(screen as any)} />
          )}
        </Stack.Screen>
        
        <Stack.Screen name="Feed">
          {({ navigation }) => (
            <FeedScreen onNavigate={(screen) => navigation.navigate(screen as any)} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, shadows, spacing, borderRadius, typography } from '../../../config/colors';
import { AccountType } from '../../../types';

const { width, height } = Dimensions.get('window');

interface AccountTypeScreenProps {
  onBack: () => void;
  onSelectType: (type: AccountType) => void;
  userName: string;
}

export const AccountTypeScreen: React.FC<AccountTypeScreenProps> = ({
  onBack,
  onSelectType,
  userName,
}) => {
  const [selectedType, setSelectedType] = useState<AccountType | null>(null);

  const handleContinue = () => {
    if (!selectedType) {
      Alert.alert('Selecione um tipo', 'Por favor, escolha o tipo de conta que melhor se adequa a você');
      return;
    }
    onSelectType(selectedType);
  };

  return (
    <LinearGradient
      colors={gradients.background as [string, string]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#2B2B2B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.welcomeText}>Olá, {userName}! 👋</Text>
          <Text style={styles.title}>Escolha o tipo de conta</Text>
          <Text style={styles.subtitle}>
            Selecione a opção que melhor descreve como você vai usar o PassaTap
          </Text>
        </View>

        {/* Account Type Options */}
        <View style={styles.optionsContainer}>
          {/* Individual Account */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedType === 'individual' && styles.optionCardSelected
            ]}
            onPress={() => setSelectedType('individual')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={selectedType === 'individual' ? gradients.primary as [string, string] : ['#FFFFFF', '#F4F4F4'] as [string, string]}
              style={styles.optionGradient}
            >
              <View style={styles.optionIcon}>
                <Ionicons 
                  name="person" 
                  size={40} 
                  color={selectedType === 'individual' ? '#FFFFFF' : '#FF7A00'} 
                />
              </View>
              <Text style={[
                styles.optionTitle,
                selectedType === 'individual' && styles.optionTitleSelected
              ]}>
                Conta Individual
              </Text>
              <Text style={[
                styles.optionDescription,
                selectedType === 'individual' && styles.optionDescriptionSelected
              ]}>
                Para pessoas que querem pagar em eventos de forma rápida e prática
              </Text>
              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons 
                    name="checkmark" 
                    size={16} 
                    color={selectedType === 'individual' ? '#FFFFFF' : '#FF7A00'} 
                  />
                  <Text style={[
                    styles.featureText,
                    selectedType === 'individual' && styles.featureTextSelected
                  ]}>
                    Pagamento NFC instantâneo
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons 
                    name="checkmark" 
                    size={16} 
                    color={selectedType === 'individual' ? '#FFFFFF' : '#FF7A00'} 
                  />
                  <Text style={[
                    styles.featureText,
                    selectedType === 'individual' && styles.featureTextSelected
                  ]}>
                    Histórico de pagamentos
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons 
                    name="checkmark" 
                    size={16} 
                    color={selectedType === 'individual' ? '#FFFFFF' : '#FF7A00'} 
                  />
                  <Text style={[
                    styles.featureText,
                    selectedType === 'individual' && styles.featureTextSelected
                  ]}>
                    Participação em eventos
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Business Account */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedType === 'business' && styles.optionCardSelected
            ]}
            onPress={() => setSelectedType('business')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={selectedType === 'business' ? gradients.primary as [string, string] : ['#FFFFFF', '#F4F4F4'] as [string, string]}
              style={styles.optionGradient}
            >
              <View style={styles.optionIcon}>
                <Ionicons 
                  name="business" 
                  size={40} 
                  color={selectedType === 'business' ? '#FFFFFF' : '#FF7A00'} 
                />
              </View>
              <Text style={[
                styles.optionTitle,
                selectedType === 'business' && styles.optionTitleSelected
              ]}>
                Conta Business
              </Text>
              <Text style={[
                styles.optionDescription,
                selectedType === 'business' && styles.optionDescriptionSelected
              ]}>
                Para empresas e organizadores que querem gerenciar eventos e vendas
              </Text>
              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons 
                    name="checkmark" 
                    size={16} 
                    color={selectedType === 'business' ? '#FFFFFF' : '#FF7A00'} 
                  />
                  <Text style={[
                    styles.featureText,
                    selectedType === 'business' && styles.featureTextSelected
                  ]}>
                    Menu virtual personalizado
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons 
                    name="checkmark" 
                    size={16} 
                    color={selectedType === 'business' ? '#FFFFFF' : '#FF7A00'} 
                  />
                  <Text style={[
                    styles.featureText,
                    selectedType === 'business' && styles.featureTextSelected
                  ]}>
                    Cartões personalizados
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons 
                    name="checkmark" 
                    size={16} 
                    color={selectedType === 'business' ? '#FFFFFF' : '#FF7A00'} 
                  />
                  <Text style={[
                    styles.featureText,
                    selectedType === 'business' && styles.featureTextSelected
                  ]}>
                    Dashboard de vendas
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              selectedType && styles.continueButtonActive
            ]}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={selectedType ? gradients.primary as [string, string] : ['#E0E0E0', '#E0E0E0'] as [string, string]}
              style={styles.continueGradient}
            >
              <Text style={[
                styles.continueText,
                selectedType && styles.continueTextActive
              ]}>
                Continuar
              </Text>
              <Ionicons 
                name="arrow-forward" 
                size={20} 
                color={selectedType ? '#FFFFFF' : '#A0A0A0'} 
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Mini Cards Background */}
      <View style={styles.miniCardsContainer}>
        {[...Array(6)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.miniCard,
              {
                top: Math.random() * (height - 200) + 100,
                left: Math.random() * (width - 60),
                transform: [{ rotate: `${Math.random() * 20 - 10}deg` }],
                opacity: 0.1 + Math.random() * 0.2,
                zIndex: index % 3,
              }
            ]}
          />
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: height < 700 ? 20 : 40,
    paddingHorizontal: width < 375 ? 10 : 0,
  },
  welcomeText: {
    fontSize: height < 700 ? 16 : 18,
    color: '#6E6E6E',
    marginBottom: 8,
  },
  title: {
    fontSize: height < 700 ? 24 : 28,
    fontWeight: '800',
    color: '#2B2B2B',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: height < 700 ? 14 : 16,
    color: '#6E6E6E',
    textAlign: 'center',
    lineHeight: height < 700 ? 20 : 24,
    paddingHorizontal: width < 375 ? 10 : 0,
  },
  optionsContainer: {
    gap: height < 700 ? 12 : 20,
    marginBottom: height < 700 ? 20 : 30,
  },
  optionCard: {
    borderRadius: height < 700 ? 16 : 20,
    overflow: 'hidden',
    ...shadows.card,
  },
  optionCardSelected: {
    transform: [{ scale: 1.02 }],
  },
  optionGradient: {
    padding: height < 700 ? 16 : 24,
    alignItems: 'center',
  },
  optionIcon: {
    width: height < 700 ? 60 : 80,
    height: height < 700 ? 60 : 80,
    borderRadius: height < 700 ? 30 : 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height < 700 ? 12 : 16,
  },
  optionTitle: {
    fontSize: height < 700 ? 18 : 22,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 8,
    textAlign: 'center',
  },
  optionTitleSelected: {
    color: '#FFFFFF',
  },
  optionDescription: {
    fontSize: height < 700 ? 12 : 14,
    color: '#6E6E6E',
    textAlign: 'center',
    lineHeight: height < 700 ? 16 : 20,
    marginBottom: height < 700 ? 16 : 20,
    paddingHorizontal: width < 375 ? 10 : 0,
  },
  optionDescriptionSelected: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  featuresList: {
    width: '100%',
    gap: height < 700 ? 8 : 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: height < 700 ? 12 : 14,
    color: '#2B2B2B',
    marginLeft: 8,
    fontWeight: '500',
    flex: 1,
  },
  featureTextSelected: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  continueButtonActive: {
    ...shadows.glow,
  },
  continueGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#A0A0A0',
    marginRight: 8,
  },
  continueTextActive: {
    color: '#FFFFFF',
  },
  miniCardsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  miniCard: {
    position: 'absolute',
    width: 40,
    height: 25,
    backgroundColor: '#FF7A00',
    borderRadius: 4,
    opacity: 0.1,
  },
});

export default AccountTypeScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from '../../../components/forms/Input';
import { Button } from '../../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, shadows, spacing, borderRadius, typography } from '../../../config/colors';
import { AccountType, CompleteProfileData } from '../../../types';

const { width, height } = Dimensions.get('window');

interface CompleteProfileScreenProps {
  onBack: () => void;
  onComplete: (data: CompleteProfileData) => void;
  accountType: AccountType;
  userName: string;
}

const businessAreas = [
  'Restaurantes e Bares',
  'Casas de Show',
  'Festivais e Eventos',
  'Produtora de Eventos',
  'Beach Club',
  'Casa Noturna',
  'Time de Futebol',
  'Outros'
];

export const CompleteProfileScreen: React.FC<CompleteProfileScreenProps> = ({
  onBack,
  onComplete,
  accountType,
  userName,
}) => {
  const [formData, setFormData] = useState<CompleteProfileData>({
    accountType,
    phone: '',
    dateOfBirth: '',
    cpf: '',
    companyName: '',
    cnpj: '',
    businessArea: '',
    website: '',
  });

  const [selectedBusinessArea, setSelectedBusinessArea] = useState('');

  const handleSubmit = () => {
    // Validation
    if (!formData.phone?.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu telefone');
      return;
    }

    if (accountType === 'individual') {
      if (!formData.cpf?.trim()) {
        Alert.alert('Erro', 'Por favor, informe seu CPF');
        return;
      }
    } else {
      if (!formData.companyName?.trim()) {
        Alert.alert('Erro', 'Por favor, informe o nome da empresa');
        return;
      }
      if (!formData.cnpj?.trim()) {
        Alert.alert('Erro', 'Por favor, informe o CNPJ');
        return;
      }
      if (!selectedBusinessArea) {
        Alert.alert('Erro', 'Por favor, selecione a área de atuação');
        return;
      }
    }

    onComplete({
      ...formData,
      businessArea: selectedBusinessArea,
    });
  };

  const updateFormData = (field: keyof CompleteProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.welcomeText}>Quase lá, {userName}! 🎉</Text>
          <Text style={styles.title}>
            {accountType === 'individual' ? 'Complete seu perfil' : 'Complete o perfil da empresa'}
          </Text>
          <Text style={styles.subtitle}>
            {accountType === 'individual' 
              ? 'Precisamos de mais algumas informações para personalizar sua experiência'
              : 'Vamos configurar tudo para que você possa gerenciar seus eventos'
            }
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Common Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Básicas</Text>
            
            <Input
              placeholder="Telefone (WhatsApp)"
              value={formData.phone || ''}
              onChangeText={(value) => updateFormData('phone', value)}
              keyboardType="phone-pad"
              leftIcon="call"
            />

            {accountType === 'individual' && (
              <Input
                placeholder="Data de nascimento (DD/MM/AAAA)"
                value={formData.dateOfBirth || ''}
                onChangeText={(value) => updateFormData('dateOfBirth', value)}
                leftIcon="calendar"
              />
            )}
          </View>

          {/* Individual Fields */}
          {accountType === 'individual' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Documentos</Text>
              
              <Input
                placeholder="CPF"
                value={formData.cpf || ''}
                onChangeText={(value) => updateFormData('cpf', value)}
                keyboardType="numeric"
                leftIcon="card"
              />
            </View>
          )}

          {/* Business Fields */}
          {accountType === 'business' && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações da Empresa</Text>
                
                <Input
                  placeholder="Nome da empresa"
                  value={formData.companyName || ''}
                  onChangeText={(value) => updateFormData('companyName', value)}
                  leftIcon="business"
                />

                <Input
                  placeholder="CNPJ"
                  value={formData.cnpj || ''}
                  onChangeText={(value) => updateFormData('cnpj', value)}
                  keyboardType="numeric"
                  leftIcon="card"
                />

                <Input
                  placeholder="Website (opcional)"
                  value={formData.website || ''}
                  onChangeText={(value) => updateFormData('website', value)}
                  keyboardType="default"
                  leftIcon="globe"
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Área de Atuação</Text>
                <Text style={styles.sectionSubtitle}>
                  Selecione a área que melhor descreve seu negócio
                </Text>
                
                <View style={styles.businessAreasGrid}>
                  {businessAreas.map((area) => (
                    <TouchableOpacity
                      key={area}
                      style={[
                        styles.businessAreaCard,
                        selectedBusinessArea === area && styles.businessAreaCardSelected
                      ]}
                      onPress={() => setSelectedBusinessArea(area)}
                      activeOpacity={0.8}
                    >
                      <Text style={[
                        styles.businessAreaText,
                        selectedBusinessArea === area && styles.businessAreaTextSelected
                      ]}>
                        {area}
                      </Text>
                      {selectedBusinessArea === area && (
                        <Ionicons name="checkmark-circle" size={20} color="#FF7A00" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Finalizar Cadastro"
          onPress={handleSubmit}
          variant="primary"
        />
      </View>

      {/* Mini Cards Background */}
      <View style={styles.miniCardsContainer}>
        {[...Array(4)].map((_, index) => (
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
    marginBottom: height < 700 ? 20 : 30,
    paddingHorizontal: width < 375 ? 10 : 0,
  },
  welcomeText: {
    fontSize: height < 700 ? 16 : 18,
    color: '#6E6E6E',
    marginBottom: 8,
  },
  title: {
    fontSize: height < 700 ? 20 : 24,
    fontWeight: '800',
    color: '#2B2B2B',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: height < 700 ? 12 : 14,
    color: '#6E6E6E',
    textAlign: 'center',
    lineHeight: height < 700 ? 18 : 20,
    paddingHorizontal: width < 375 ? 10 : 0,
  },
  formContainer: {
    marginBottom: 20,
  },
  section: {
    marginBottom: height < 700 ? 20 : 30,
  },
  sectionTitle: {
    fontSize: height < 700 ? 16 : 18,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: height < 700 ? 12 : 16,
  },
  sectionSubtitle: {
    fontSize: height < 700 ? 12 : 14,
    color: '#6E6E6E',
    marginBottom: height < 700 ? 12 : 16,
  },
  businessAreasGrid: {
    gap: height < 700 ? 8 : 12,
  },
  businessAreaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: height < 700 ? 8 : 12,
    padding: height < 700 ? 12 : 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#F4F4F4',
    ...shadows.card,
  },
  businessAreaCardSelected: {
    borderColor: '#FF7A00',
    backgroundColor: '#FFF9F5',
  },
  businessAreaText: {
    fontSize: height < 700 ? 14 : 16,
    color: '#2B2B2B',
    fontWeight: '500',
    flex: 1,
  },
  businessAreaTextSelected: {
    color: '#FF7A00',
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
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

export default CompleteProfileScreen;

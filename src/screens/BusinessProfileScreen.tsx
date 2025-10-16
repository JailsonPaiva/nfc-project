import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, shadows, spacing, borderRadius, typography } from '../constants/colors';

const { width, height } = Dimensions.get('window');

interface BusinessProfileScreenProps {
  onNavigate?: (screen: string) => void;
}

export const BusinessProfileScreen: React.FC<BusinessProfileScreenProps> = ({
  onNavigate,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <LinearGradient
      colors={gradients.background as [string, string]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => onNavigate?.('Dashboard')}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perfil da Empresa</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Company Banner */}
        <View style={styles.companyBanner}>
          <View style={styles.companyLogoContainer}>
            <View style={styles.companyLogo}>
              <Ionicons name="business" size={60} color="#FF7A00" />
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.companyName}>Empresa ABC Ltda</Text>
          <Text style={styles.companyInfo}>CNPJ: 12.345.678/0001-90 | contato@empresa.com</Text>
          <Text style={styles.companyInfo}>+55 11 99999-9999 | São Paulo - SP</Text>
        </View>

        {/* Business Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={gradients.primary as [string, string]}
              style={styles.statGradient}
            >
              <Ionicons name="calendar" size={20} color="#FFFFFF" />
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Eventos Ativos</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#4CAF50', '#45a049']}
              style={styles.statGradient}
            >
              <Ionicons name="trending-up" size={20} color="#FFFFFF" />
              <Text style={styles.statValue}>R$ 4.2K</Text>
              <Text style={styles.statLabel}>Vendas Hoje</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#2196F3', '#1976D2']}
              style={styles.statGradient}
            >
              <Ionicons name="people" size={20} color="#FFFFFF" />
              <Text style={styles.statValue}>290</Text>
              <Text style={styles.statLabel}>Transações</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Business Settings */}
        <View style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Configurações da Empresa</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons name="business" size={20} color="#FF7A00" />
              </View>
              <Text style={styles.settingText}>Informações da Empresa</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6E6E6E" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons name="card" size={20} color="#FF7A00" />
              </View>
              <Text style={styles.settingText}>Cartões Personalizados</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6E6E6E" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons name="restaurant" size={20} color="#FF7A00" />
              </View>
              <Text style={styles.settingText}>Menu Virtual</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6E6E6E" />
          </TouchableOpacity>
        </View>

        {/* Notification Settings */}
        <View style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons name="notifications" size={20} color="#FF7A00" />
              </View>
              <Text style={styles.settingText}>Notificações de Vendas</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E0E0E0', true: '#FF7A00' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons name="mail" size={20} color="#FF7A00" />
              </View>
              <Text style={styles.settingText}>Relatórios por Email</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6E6E6E" />
          </TouchableOpacity>
        </View>

        {/* Support & Help */}
        <View style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Suporte</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons name="help-circle" size={20} color="#FF7A00" />
              </View>
              <Text style={styles.settingText}>Central de Ajuda</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6E6E6E" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons name="chatbubble" size={20} color="#FF7A00" />
              </View>
              <Text style={styles.settingText}>Fale Conosco</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6E6E6E" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons name="document-text" size={20} color="#FF7A00" />
              </View>
              <Text style={styles.settingText}>Termos de Uso</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6E6E6E" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons name="shield-checkmark" size={20} color="#FF7A00" />
              </View>
              <Text style={styles.settingText}>Política de Privacidade</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6E6E6E" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out" size={20} color="#E63946" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    backgroundColor: '#2B2B2B',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -20,
  },
  companyBanner: {
    backgroundColor: '#2B2B2B',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  companyLogoContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  companyLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FF7A00',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2B2B2B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  companyName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  companyInfo: {
    fontSize: 14,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: height < 700 ? 8 : 12,
    marginBottom: height < 700 ? 20 : 30,
  },
  statCard: {
    flex: 1,
    borderRadius: height < 700 ? 12 : 16,
    overflow: 'hidden',
    ...shadows.card,
  },
  statGradient: {
    padding: height < 700 ? 12 : 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: height < 700 ? 16 : 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: height < 700 ? 6 : 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: height < 700 ? 10 : 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    textAlign: 'center',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    ...shadows.card,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#2B2B2B',
    fontWeight: '500',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E63946',
    ...shadows.card,
  },
  logoutText: {
    fontSize: 16,
    color: '#E63946',
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 100,
  },
});

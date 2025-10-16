import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, shadows, spacing, borderRadius, typography } from '../../../config/colors';

const { width, height } = Dimensions.get('window');

interface NotificationsScreenProps {
  onNavigate?: (screen: string) => void;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'payment' | 'transaction' | 'security' | 'promotion';
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: 'Pagamento Aprovado',
    message: 'Seu pagamento de R$ 25,50 foi aprovado com sucesso',
    time: '2 min atrás',
    type: 'payment',
    read: false,
  },
  {
    id: 2,
    title: 'Nova Transação',
    message: 'Você recebeu R$ 150,00 de João Silva',
    time: '1 hora atrás',
    type: 'transaction',
    read: false,
  },
  {
    id: 3,
    title: 'Promoção Especial',
    message: 'Desconto de 20% em restaurantes parceiros hoje!',
    time: '3 horas atrás',
    type: 'promotion',
    read: true,
  },
  {
    id: 4,
    title: 'Segurança',
    message: 'Login detectado de novo dispositivo',
    time: '1 dia atrás',
    type: 'security',
    read: true,
  },
];

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onNavigate,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return 'checkmark-circle';
      case 'transaction':
        return 'swap-horizontal';
      case 'security':
        return 'shield-checkmark';
      case 'promotion':
        return 'gift';
      default:
        return 'notifications';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'payment':
        return '#4CAF50';
      case 'transaction':
        return '#2196F3';
      case 'security':
        return '#FF9800';
      case 'promotion':
        return '#E91E63';
      default:
        return '#FF7A00';
    }
  };

  const renderNotification = (notification: Notification) => (
    <TouchableOpacity
      key={notification.id}
      style={[
        styles.notificationCard,
        !notification.read && styles.unreadNotification
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.notificationContent}>
        <View style={[
          styles.notificationIcon,
          { backgroundColor: getNotificationColor(notification.type) }
        ]}>
          <Ionicons 
            name={getNotificationIcon(notification.type) as any} 
            size={20} 
            color="#FFFFFF" 
          />
        </View>
        
        <View style={styles.notificationText}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationMessage}>{notification.message}</Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
        
        {!notification.read && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

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
            <Ionicons name="arrow-back" size={24} color="#2B2B2B" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Notificações</Text>
            <Text style={styles.headerSubtitle}>Mantenha-se atualizado</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings" size={24} color="#2B2B2B" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Settings Card */}
        <View style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={24} color="#FF7A00" />
              <Text style={styles.settingText}>Notificações</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E0E0E0', true: '#FF7A00' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="volume-high" size={24} color="#FF7A00" />
              <Text style={styles.settingText}>Som</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#E0E0E0', true: '#FF7A00' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="phone-portrait" size={24} color="#FF7A00" />
              <Text style={styles.settingText}>Vibração</Text>
            </View>
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              trackColor={{ false: '#E0E0E0', true: '#FF7A00' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Notifications List */}
        <View style={styles.notificationsCard}>
          <View style={styles.notificationsHeader}>
            <Text style={styles.sectionTitle}>Notificações Recentes</Text>
            <TouchableOpacity>
              <Text style={styles.markAllText}>Marcar todas como lidas</Text>
            </TouchableOpacity>
          </View>
          
          {notifications.map(renderNotification)}
        </View>
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
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2B2B2B',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6E6E6E',
    textAlign: 'center',
    marginTop: 4,
  },
  settingsButton: {
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
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...shadows.card,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: '#2B2B2B',
    marginLeft: 12,
    fontWeight: '500',
  },
  notificationsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...shadows.card,
  },
  notificationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  markAllText: {
    fontSize: 14,
    color: '#FF7A00',
    fontWeight: '600',
  },
  notificationCard: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
  },
  unreadNotification: {
    backgroundColor: '#FFF9F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: -12,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2B2B',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6E6E6E',
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF7A00',
    marginTop: 4,
    marginLeft: 8,
  },
});

export default NotificationsScreen;

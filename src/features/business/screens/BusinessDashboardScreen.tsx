import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, shadows, spacing, borderRadius, typography } from '../../../config/colors';

const { width, height } = Dimensions.get('window');

interface BusinessDashboardScreenProps {
  onNavigate?: (screen: string) => void;
}

const mockSalesData = [
  { id: 1, event: 'Festival de Verão', date: '15/01/2024', sales: 1250, transactions: 89 },
  { id: 2, event: 'Show Rock Night', date: '12/01/2024', sales: 890, transactions: 45 },
  { id: 3, event: 'Festa Eletrônica', date: '10/01/2024', sales: 2100, transactions: 156 },
];

const mockRecentTransactions = [
  { id: 1, customer: 'João Silva', amount: 45.50, time: '14:32', event: 'Festival de Verão' },
  { id: 2, customer: 'Maria Santos', amount: 89.00, time: '14:28', event: 'Show Rock Night' },
  { id: 3, customer: 'Pedro Costa', amount: 23.50, time: '14:25', event: 'Festa Eletrônica' },
  { id: 4, customer: 'Ana Oliveira', amount: 67.80, time: '14:22', event: 'Festival de Verão' },
];

export const BusinessDashboardScreen: React.FC<BusinessDashboardScreenProps> = ({
  onNavigate,
}) => {
  const [activeNav, setActiveNav] = useState("dashboard");

  const handleNavPress = (screen: string) => {
    setActiveNav(screen);
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  const totalSales = mockSalesData.reduce((sum, event) => sum + event.sales, 0);
  const totalTransactions = mockSalesData.reduce((sum, event) => sum + event.transactions, 0);

  return (
    <LinearGradient
      colors={gradients.background as [string, string]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Bem-vindo de volta! 👋</Text>
            <Text style={styles.userName}>Empresa ABC</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color="#FF7A00" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={gradients.primary as [string, string]}
              style={styles.statGradient}
            >
              <Ionicons name="trending-up" size={24} color="#FFFFFF" />
              <Text style={styles.statValue}>R$ {totalSales.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Vendas Hoje</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#4CAF50', '#45a049']}
              style={styles.statGradient}
            >
              <Ionicons name="receipt" size={24} color="#FFFFFF" />
              <Text style={styles.statValue}>{totalTransactions}</Text>
              <Text style={styles.statLabel}>Transações</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#2196F3', '#1976D2']}
              style={styles.statGradient}
            >
              <Ionicons name="calendar" size={24} color="#FFFFFF" />
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Eventos Ativos</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleNavPress('Events')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={gradients.primary as [string, string]}
                style={styles.actionGradient}
              >
                <Ionicons name="calendar" size={24} color="#FFFFFF" />
                <Text style={styles.actionText}>Gerenciar Eventos</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleNavPress('Menu')}
              activeOpacity={0.8}
            >
              <View style={styles.actionSecondary}>
                <Ionicons name="restaurant" size={24} color="#FF7A00" />
                <Text style={styles.actionTextSecondary}>Menu Virtual</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleNavPress('Reports')}
              activeOpacity={0.8}
            >
              <View style={styles.actionSecondary}>
                <Ionicons name="bar-chart" size={24} color="#FF7A00" />
                <Text style={styles.actionTextSecondary}>Relatórios</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => Alert.alert('Em breve', 'Funcionalidade de cartões personalizados em desenvolvimento')}
              activeOpacity={0.8}
            >
              <View style={styles.actionSecondary}>
                <Ionicons name="card" size={24} color="#FF7A00" />
                <Text style={styles.actionTextSecondary}>Cartões</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Events */}
        <View style={styles.eventsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Eventos Recentes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          {mockSalesData.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventName}>{event.event}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
              </View>
              <View style={styles.eventStats}>
                <Text style={styles.eventSales}>R$ {event.sales.toLocaleString()}</Text>
                <Text style={styles.eventTransactions}>{event.transactions} transações</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Event Activity */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Atividade do Evento</Text>
          
          {mockRecentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionIcon}>
                <Ionicons name="person" size={20} color="#FF7A00" />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionCustomer}>{transaction.customer}</Text>
                <Text style={styles.transactionEvent}>{transaction.event}</Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={styles.transactionValue}>R$ {transaction.amount.toFixed(2)}</Text>
                <Text style={styles.transactionTime}>{transaction.time}</Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Bottom spacing para não sobrepor com navegação */}
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
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: height < 700 ? 14 : 16,
    color: '#6E6E6E',
    marginBottom: 4,
  },
  userName: {
    fontSize: height < 700 ? 20 : 24,
    fontWeight: '800',
    color: '#2B2B2B',
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E63946',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
  quickActions: {
    marginBottom: height < 700 ? 20 : 30,
  },
  sectionTitle: {
    fontSize: height < 700 ? 18 : 20,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: height < 700 ? 12 : 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: height < 700 ? 8 : 12,
  },
  actionButton: {
    width: (width - 60) / 2,
    borderRadius: height < 700 ? 12 : 16,
    overflow: 'hidden',
    marginBottom: height < 700 ? 8 : 12,
  },
  actionGradient: {
    padding: height < 700 ? 16 : 20,
    alignItems: 'center',
  },
  actionSecondary: {
    backgroundColor: '#FFFFFF',
    padding: height < 700 ? 16 : 20,
    alignItems: 'center',
    borderRadius: height < 700 ? 12 : 16,
    borderWidth: 2,
    borderColor: '#FF7A00',
    ...shadows.card,
  },
  actionText: {
    fontSize: height < 700 ? 12 : 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: height < 700 ? 6 : 8,
    textAlign: 'center',
  },
  actionTextSecondary: {
    fontSize: height < 700 ? 12 : 14,
    fontWeight: '600',
    color: '#FF7A00',
    marginTop: height < 700 ? 6 : 8,
    textAlign: 'center',
  },
  eventsContainer: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF7A00',
    fontWeight: '600',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.card,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2B2B',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  eventStats: {
    alignItems: 'flex-end',
  },
  eventSales: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF7A00',
    marginBottom: 4,
  },
  eventTransactions: {
    fontSize: 12,
    color: '#6E6E6E',
  },
  transactionsContainer: {
    marginBottom: 30,
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.card,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionCustomer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2B2B',
    marginBottom: 4,
  },
  transactionEvent: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 4,
  },
  transactionTime: {
    fontSize: 12,
    color: '#6E6E6E',
  },
  bottomSpacing: {
    height: 100,
  },
});

export default BusinessDashboardScreen;

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
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, shadows, spacing, borderRadius, typography } from '../constants/colors';

const { width, height } = Dimensions.get('window');

interface BusinessReportsScreenProps {
  onNavigate?: (screen: string) => void;
}

const mockReportData = {
  totalRevenue: 4250,
  totalTransactions: 290,
  averageTicket: 14.66,
  topEvents: [
    { name: 'Festa Eletrônica', revenue: 2100, transactions: 156 },
    { name: 'Festival de Verão', revenue: 1250, transactions: 89 },
    { name: 'Show Rock Night', revenue: 900, transactions: 45 },
  ],
  monthlyData: [
    { month: 'Jan', revenue: 4250, transactions: 290 },
    { month: 'Dez', revenue: 3800, transactions: 245 },
    { month: 'Nov', revenue: 3200, transactions: 198 },
  ],
  paymentMethods: [
    { method: 'NFC', percentage: 75, amount: 3187.50 },
    { method: 'PIX', percentage: 20, amount: 850.00 },
    { method: 'Cartão', percentage: 5, amount: 212.50 },
  ],
};

export const BusinessReportsScreen: React.FC<BusinessReportsScreenProps> = ({
  onNavigate,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const handleExportReport = () => {
    Alert.alert('Exportar Relatório', 'Funcionalidade de exportação será implementada em breve!');
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'week': return 'Esta Semana';
      case 'month': return 'Este Mês';
      case 'year': return 'Este Ano';
      default: return 'Este Mês';
    }
  };

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
            <Text style={styles.headerTitle}>Relatórios</Text>
            <Text style={styles.headerSubtitle}>Análise de vendas e performance</Text>
          </View>
          <TouchableOpacity style={styles.exportButton} onPress={handleExportReport}>
            <Ionicons name="download" size={24} color="#FF7A00" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodContainer}>
          <Text style={styles.sectionTitle}>Período</Text>
          <View style={styles.periodTabs}>
            {[
              { key: 'week', label: 'Semana' },
              { key: 'month', label: 'Mês' },
              { key: 'year', label: 'Ano' }
            ].map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.periodTab,
                  selectedPeriod === period.key && styles.periodTabActive
                ]}
                onPress={() => setSelectedPeriod(period.key as any)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.periodTabText,
                  selectedPeriod === period.key && styles.periodTabTextActive
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsContainer}>
          <Text style={styles.sectionTitle}>Métricas Principais</Text>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <LinearGradient
                colors={gradients.primary as [string, string]}
                style={styles.metricGradient}
              >
                <Ionicons name="trending-up" size={24} color="#FFFFFF" />
                <Text style={styles.metricValue}>R$ {mockReportData.totalRevenue.toLocaleString()}</Text>
                <Text style={styles.metricLabel}>Receita Total</Text>
                <Text style={styles.metricChange}>+12% vs período anterior</Text>
              </LinearGradient>
            </View>

            <View style={styles.metricCard}>
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                style={styles.metricGradient}
              >
                <Ionicons name="receipt" size={24} color="#FFFFFF" />
                <Text style={styles.metricValue}>{mockReportData.totalTransactions}</Text>
                <Text style={styles.metricLabel}>Transações</Text>
                <Text style={styles.metricChange}>+8% vs período anterior</Text>
              </LinearGradient>
            </View>

            <View style={styles.metricCard}>
              <LinearGradient
                colors={['#2196F3', '#1976D2']}
                style={styles.metricGradient}
              >
                <Ionicons name="calculator" size={24} color="#FFFFFF" />
                <Text style={styles.metricValue}>R$ {mockReportData.averageTicket.toFixed(2)}</Text>
                <Text style={styles.metricLabel}>Ticket Médio</Text>
                <Text style={styles.metricChange}>+5% vs período anterior</Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Top Events */}
        <View style={styles.topEventsContainer}>
          <Text style={styles.sectionTitle}>Top Eventos</Text>
          
          {mockReportData.topEvents.map((event, index) => (
            <View key={index} style={styles.eventRankingCard}>
              <View style={styles.rankingPosition}>
                <Text style={styles.rankingNumber}>{index + 1}</Text>
              </View>
              <View style={styles.eventRankingInfo}>
                <Text style={styles.eventRankingName}>{event.name}</Text>
                <Text style={styles.eventRankingDetails}>
                  {event.transactions} transações • R$ {event.revenue.toLocaleString()}
                </Text>
              </View>
              <View style={styles.eventRankingStats}>
                <Text style={styles.eventRankingRevenue}>R$ {event.revenue.toLocaleString()}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentMethodsContainer}>
          <Text style={styles.sectionTitle}>Formas de Pagamento</Text>
          
          {mockReportData.paymentMethods.map((payment, index) => (
            <View key={index} style={styles.paymentMethodCard}>
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodName}>{payment.method}</Text>
                <Text style={styles.paymentMethodPercentage}>{payment.percentage}%</Text>
              </View>
              <View style={styles.paymentMethodBar}>
                <View 
                  style={[
                    styles.paymentMethodProgress,
                    { width: `${payment.percentage}%` }
                  ]} 
                />
              </View>
              <Text style={styles.paymentMethodAmount}>R$ {payment.amount.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        {/* Monthly Trend */}
        <View style={styles.trendContainer}>
          <Text style={styles.sectionTitle}>Tendência Mensal</Text>
          
          <View style={styles.trendChart}>
            {mockReportData.monthlyData.map((month, index) => (
              <View key={index} style={styles.trendBar}>
                <View 
                  style={[
                    styles.trendBarFill,
                    { 
                      height: `${(month.revenue / 5000) * 100}%`,
                      backgroundColor: index === mockReportData.monthlyData.length - 1 ? '#FF7A00' : '#E0E0E0'
                    }
                  ]} 
                />
                <Text style={styles.trendBarLabel}>{month.month}</Text>
                <Text style={styles.trendBarValue}>R$ {month.revenue.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Export Button */}
        <TouchableOpacity
          style={styles.exportReportButton}
          onPress={handleExportReport}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={gradients.primary as [string, string]}
            style={styles.exportReportGradient}
          >
            <Ionicons name="download" size={20} color="#FFFFFF" />
            <Text style={styles.exportReportText}>Exportar Relatório</Text>
          </LinearGradient>
        </TouchableOpacity>
        
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
  exportButton: {
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
  periodContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 16,
  },
  periodTabs: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    padding: 4,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodTabActive: {
    backgroundColor: '#FFFFFF',
    ...shadows.card,
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6E6E6E',
  },
  periodTabTextActive: {
    color: '#FF7A00',
  },
  metricsContainer: {
    marginBottom: 30,
  },
  metricsGrid: {
    gap: 16,
  },
  metricCard: {
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.card,
  },
  metricGradient: {
    padding: 20,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginBottom: 8,
  },
  metricChange: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  topEventsContainer: {
    marginBottom: 30,
  },
  eventRankingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.card,
  },
  rankingPosition: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF7A00',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankingNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  eventRankingInfo: {
    flex: 1,
  },
  eventRankingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2B2B',
    marginBottom: 4,
  },
  eventRankingDetails: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  eventRankingStats: {
    alignItems: 'flex-end',
  },
  eventRankingRevenue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF7A00',
  },
  paymentMethodsContainer: {
    marginBottom: 30,
  },
  paymentMethodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...shadows.card,
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2B2B',
  },
  paymentMethodPercentage: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF7A00',
  },
  paymentMethodBar: {
    height: 8,
    backgroundColor: '#F4F4F4',
    borderRadius: 4,
    marginBottom: 8,
  },
  paymentMethodProgress: {
    height: '100%',
    backgroundColor: '#FF7A00',
    borderRadius: 4,
  },
  paymentMethodAmount: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  trendContainer: {
    marginBottom: 30,
  },
  trendChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    height: 200,
    ...shadows.card,
  },
  trendBar: {
    alignItems: 'center',
    flex: 1,
  },
  trendBarFill: {
    width: 30,
    borderRadius: 4,
    marginBottom: 8,
    minHeight: 20,
  },
  trendBarLabel: {
    fontSize: 12,
    color: '#6E6E6E',
    marginBottom: 4,
  },
  trendBarValue: {
    fontSize: 10,
    color: '#2B2B2B',
    fontWeight: '600',
    textAlign: 'center',
  },
  exportReportButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 100, // Padding para não sobrepor com navegação
    ...shadows.glow,
  },
  exportReportGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  exportReportText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 100,
  },
});

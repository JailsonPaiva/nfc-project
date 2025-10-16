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

interface BusinessEventsScreenProps {
  onNavigate?: (screen: string) => void;
}

const mockEvents = [
  {
    id: 1,
    name: 'Festival de Verão 2024',
    date: '25/01/2024',
    time: '20:00',
    location: 'Parque Ibirapuera',
    status: 'active',
    sales: 1250,
    tickets: 89,
    capacity: 500,
  },
  {
    id: 2,
    name: 'Show Rock Night',
    date: '22/01/2024',
    time: '19:30',
    location: 'Arena Anhembi',
    status: 'upcoming',
    sales: 890,
    tickets: 45,
    capacity: 300,
  },
  {
    id: 3,
    name: 'Festa Eletrônica',
    date: '18/01/2024',
    time: '23:00',
    location: 'D-Edge',
    status: 'completed',
    sales: 2100,
    tickets: 156,
    capacity: 200,
  },
];

export const BusinessEventsScreen: React.FC<BusinessEventsScreenProps> = ({
  onNavigate,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');

  const filteredEvents = mockEvents.filter(event => {
    if (selectedFilter === 'all') return true;
    return event.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'upcoming': return '#FF9800';
      case 'completed': return '#6E6E6E';
      default: return '#6E6E6E';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'upcoming': return 'Em breve';
      case 'completed': return 'Finalizado';
      default: return status;
    }
  };

  const handleCreateEvent = () => {
    Alert.alert('Em desenvolvimento', 'Funcionalidade de criação de eventos será implementada em breve!');
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
            <Text style={styles.headerTitle}>Eventos</Text>
            <Text style={styles.headerSubtitle}>Gerencie seus eventos</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleCreateEvent}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={gradients.primary as [string, string]}
              style={styles.statGradient}
            >
              <Ionicons name="calendar" size={20} color="#FFFFFF" />
              <Text style={styles.statValue}>{mockEvents.length}</Text>
              <Text style={styles.statLabel}>Total de Eventos</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#4CAF50', '#45a049']}
              style={styles.statGradient}
            >
              <Ionicons name="trending-up" size={20} color="#FFFFFF" />
              <Text style={styles.statValue}>
                {mockEvents.reduce((sum, event) => sum + event.sales, 0).toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Vendas Totais</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#2196F3', '#1976D2']}
              style={styles.statGradient}
            >
              <Ionicons name="people" size={20} color="#FFFFFF" />
              <Text style={styles.statValue}>
                {mockEvents.reduce((sum, event) => sum + event.tickets, 0)}
              </Text>
              <Text style={styles.statLabel}>Ingressos Vendidos</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: 'all', label: 'Todos' },
              { key: 'active', label: 'Ativos' },
              { key: 'upcoming', label: 'Em Breve' },
              { key: 'completed', label: 'Finalizados' }
            ].map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterTab,
                  selectedFilter === filter.key && styles.filterTabActive
                ]}
                onPress={() => setSelectedFilter(filter.key as any)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.filterTabText,
                  selectedFilter === filter.key && styles.filterTabTextActive
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Events List */}
        <View style={styles.eventsContainer}>
          {filteredEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
              activeOpacity={0.8}
            >
              <View style={styles.eventHeader}>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <Text style={styles.eventDateTime}>
                    {event.date} às {event.time}
                  </Text>
                  <Text style={styles.eventLocation}>
                    <Ionicons name="location" size={14} color="#6E6E6E" /> {event.location}
                  </Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(event.status) }
                ]}>
                  <Text style={styles.statusText}>{getStatusText(event.status)}</Text>
                </View>
              </View>

              <View style={styles.eventStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statItemValue}>R$ {event.sales.toLocaleString()}</Text>
                  <Text style={styles.statItemLabel}>Vendas</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statItemValue}>{event.tickets}</Text>
                  <Text style={styles.statItemLabel}>Ingressos</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statItemValue}>
                    {Math.round((event.tickets / event.capacity) * 100)}%
                  </Text>
                  <Text style={styles.statItemLabel}>Ocupação</Text>
                </View>
              </View>

              <View style={styles.eventActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="eye" size={16} color="#FF7A00" />
                  <Text style={styles.actionButtonText}>Ver Detalhes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="analytics" size={16} color="#FF7A00" />
                  <Text style={styles.actionButtonText}>Relatórios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share" size={16} color="#FF7A00" />
                  <Text style={styles.actionButtonText}>Compartilhar</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Create Event Button */}
        <TouchableOpacity
          style={styles.createEventButton}
          onPress={handleCreateEvent}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={gradients.primary as [string, string]}
            style={styles.createEventGradient}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.createEventText}>Criar Novo Evento</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF7A00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    ...shadows.card,
  },
  statGradient: {
    padding: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 6,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    textAlign: 'center',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F4F4F4',
  },
  filterTabActive: {
    backgroundColor: '#FF7A00',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6E6E6E',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  eventsContainer: {
    marginBottom: 30,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...shadows.card,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 6,
  },
  eventDateTime: {
    fontSize: 14,
    color: '#6E6E6E',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  eventStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F4F4F4',
  },
  statItem: {
    alignItems: 'center',
  },
  statItemValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF7A00',
    marginBottom: 4,
  },
  statItemLabel: {
    fontSize: 12,
    color: '#6E6E6E',
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#FF7A00',
    fontWeight: '600',
    marginLeft: 4,
  },
  createEventButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 30,
    ...shadows.glow,
  },
  createEventGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  createEventText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, shadows, spacing, borderRadius, typography } from '../../../config/colors';

const { width, height } = Dimensions.get('window');

interface DashboardScreenProps {
  onNavigate?: (screen: string) => void;
}

const transactions = [
  { id: 1, name: "Direct Transfer", subtitle: "Julian", amount: -125.00, color: "#f97316" },
  { id: 2, name: "Netflix", subtitle: "Online", amount: -55.00, color: "#2563eb" },
  { id: 3, name: "Zara Shopping", subtitle: "Online", amount: -327.00, color: "#ec4899" },
  { id: 4, name: "Direct Transfer", subtitle: "Julian", amount: -125.00, color: "#f97316" },
  { id: 5, name: "Netflix", subtitle: "Online", amount: -55.00, color: "#2563eb" },
];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const [currentCard, setCurrentCard] = useState(0);
  const [activeNav, setActiveNav] = useState("home");
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const handleCopyCard = () => {
    Alert.alert('Copiado!', 'My Seed copiado: 616 9477 111');
  };

  const handleNavPress = (screen: string) => {
    setActiveNav(screen);
    if (onNavigate) {
      // Mapear navegação para as rotas corretas
      if (screen === "message" || screen === "profile" || screen === "feed") {
        onNavigate("Feed");
      } else if (screen === "home") {
        onNavigate("Dashboard");
      } else {
        onNavigate(screen);
      }
    }
  };

  const [flipAnim] = useState(new Animated.Value(0));

  const handleFlipCard = (toFront: boolean) => {
    Animated.spring(flipAnim, {
      toValue: toFront ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const frontRotateY = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backRotateY = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [1, 0, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [0, 0, 1],
  });

  return (
    <LinearGradient
      colors={gradients.background as [string, string]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.userName}>Mohammad Imam</Text>
          </View>
          <View style={styles.avatar}>
            <LinearGradient
              colors={['#FF7A00', '#FF7A0080']}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarText}>MI</Text>
            </LinearGradient>
          </View>
        </View>
      </View>

      {/* Card Display */}
      <View style={styles.cardSection}>
        <View style={styles.cardContainer}>
          {/* Front of Card */}
          <Animated.View style={[
            styles.card, 
            styles.cardFront,
            {
              transform: [{ rotateY: frontRotateY }],
              opacity: frontOpacity,
            }
          ]}>
            <LinearGradient
              colors={gradients.card as [string, string]}
              style={[
                styles.cardGradient,
                { alignItems: isCardFlipped ? 'center' : 'stretch' }
              ]}
            >
                {/* Flip Button */}
                <TouchableOpacity
                  onPress={() => handleFlipCard(false)}
                  style={styles.flipButton}
                  activeOpacity={0.7}
                >
                  <Ionicons name="refresh" size={24} color="#6E6E6E" />
                </TouchableOpacity>
                
                {/* Contactless Icon */}
                <View style={styles.contactlessIcon}>
                  <Ionicons name="wifi" size={32} color="#FF7A00" />
                </View>

                {/* Card Content */}
                <View style={styles.cardContent}>
                  <Text style={styles.cardLabel}>My Seed</Text>
                  <View style={styles.cardNumberContainer}>
                    <Text style={styles.cardNumber}>616 9477 111</Text>
                    <TouchableOpacity 
                      onPress={handleCopyCard} 
                      style={styles.copyButton}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="copy-outline" size={16} color="#9ca3af" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.balanceContainer}>
                    <View>
                      <Text style={styles.balanceLabel}>Saldo</Text>
                      <View style={styles.balanceRow}>
                        {showBalance ? (
                          <Text style={styles.balanceAmount}>R$ 20.364.500</Text>
                        ) : (
                          <Text style={styles.balanceAmount}>R$ •••••••</Text>
                        )}
                        <TouchableOpacity
                          onPress={() => setShowBalance(!showBalance)}
                          style={styles.eyeButton}
                          activeOpacity={0.7}
                        >
                          <Ionicons
                            name={showBalance ? 'eye-outline' : 'eye-off-outline'}
                            size={20}
                            color="#9ca3af"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* <TouchableOpacity style={styles.detailButton}>
                      <Text style={styles.detailButtonText}>Detail →</Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>

            {/* Back of Card */}
            <Animated.View style={[
              styles.card, 
              styles.cardBack,
              {
                transform: [{ rotateY: backRotateY }],
                opacity: backOpacity,
              }
            ]}>
            <LinearGradient
              colors={gradients.card as [string, string]}
              style={[
                styles.cardGradient,
                { alignItems: isCardFlipped ? 'stretch' : 'center' }
              ]}
            >
                {/* Flip Back Button */}
                <TouchableOpacity
                  onPress={() => handleFlipCard(true)}
                  style={styles.flipButton}
                  activeOpacity={0.7}
                >
                  <Ionicons name="refresh" size={24} color="#6E6E6E" />
                </TouchableOpacity>

                {/* Contactless Icon */}
                <View style={styles.contactlessIcon}>
                  <Ionicons name="wifi" size={32} color="#FF7A00" />
                </View>

                {/* QR Code */}
                <View style={styles.qrContainer}>
                  <View style={styles.qrCode}>
                    <Ionicons name="qr-code" size={80} color="#000000" />
                  </View>
                </View>

                {/* <View style={styles.qrInfo}>
                  <Text style={styles.qrLabel}>Scan to Pay</Text>
                  <Text style={styles.qrNumber}>616 9477 111</Text>
                </View> */}

                {/* Card Details */}
                <View style={styles.cardDetails}>
                  <View>
                    <Text style={styles.cardDetailLabel}>Valid Thru</Text>
                    <Text style={styles.cardDetailValue}>12/28</Text>
                  </View>
                  <View style={styles.cvvContainer}>
                    <Text style={styles.cardDetailLabel}>CVV</Text>
                    <Text style={styles.cardDetailValue}>***</Text>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => onNavigate?.('Menu')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={gradients.primary as [string, string]}
            style={styles.quickActionGradient}
          >
            <Ionicons name="restaurant" size={24} color="#FFFFFF" />
            <Text style={styles.quickActionText}>Cardápio Digital</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickActionButton}
          activeOpacity={0.8}
        >
          <View style={styles.quickActionSecondary}>
            <Ionicons name="scan" size={24} color="#FF7A00" />
            <Text style={styles.quickActionTextSecondary}>Pagar NFC</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Transactions Section */}
      <ScrollView style={styles.transactionsSection} showsVerticalScrollIndicator={false}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Transaction</Text>
          <TouchableOpacity style={styles.historyButton}>
            <Ionicons name="time-outline" size={16} color="#9ca3af" />
            <Text style={styles.historyButtonText}>History</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.todayLabel}>Today</Text>

        <View style={styles.transactionsList}>
          {transactions.map((transaction) => (
            <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
              <View style={[styles.transactionIcon, { backgroundColor: transaction.color }]}>
                <View style={styles.transactionIconInner} />
              </View>

              <View style={styles.transactionInfo}>
                <Text style={styles.transactionName}>{transaction.name}</Text>
                <Text style={styles.transactionSubtitle}>{transaction.subtitle}</Text>
              </View>

              <Text style={[
                styles.transactionAmount,
                transaction.amount < 0 ? styles.transactionAmountNegative : styles.transactionAmountPositive
              ]}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 14,
    color: '#6E6E6E',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B2B2B',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(96, 165, 250, 0.5)',
    overflow: 'hidden',
  },
  avatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  cardSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  cardContainer: {
    position: 'relative',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: 200,
    borderRadius: 24,
    position: 'absolute',
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  cardFront: {
    // Front card styles
  },
  cardBack: {
    // Back card styles
  },
  cardGradient: {
    flex: 1,
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: '#FF7A00',
  },
  flipButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDecoration: {
    position: 'absolute',
    top: -48,
    left: -48,
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  contactlessIcon: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  cardContent: {
    marginTop: 32,
    flex: 1,
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontSize: 14,
    color: '#6E6E6E',
    marginBottom: 8,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  cardNumber: {
    fontSize: 18,
    fontFamily: 'monospace',
    color: '#2B2B2B',
    letterSpacing: 1,
  },
  copyButton: {
    padding: 8,
    borderRadius: 4,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  balanceLabel: {
    fontSize: 12,
    color: '#6E6E6E',
    marginBottom: 4,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2B2B2B',
  },
  eyeButton: {
    padding: 8,
    borderRadius: 8,
  },
  detailButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  detailButtonText: {
    color: '#FF7A00',
    fontSize: 14,
    fontWeight: '500',
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    maxHeight: 200,
    width: 200,
  },
  qrCode: {
    maxWidth: 140,
    height: 140,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
  },
  qrText: {
    fontSize: 12,
    color: '#000000',
    fontWeight: 'bold',
  },
  qrInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  qrLabel: {
    fontSize: 14,
    color: '#6E6E6E',
    marginBottom: 4,
  },
  qrNumber: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#6E6E6E',
  },
  cardDetails: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDetailLabel: {
    fontSize: 12,
    color: '#6E6E6E',
    marginBottom: 4,
  },
  cardDetailValue: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#6E6E6E',
  },
  cvvContainer: {
    alignItems: 'flex-end',
  },
  qrCodeFicticio: {
    position: 'absolute',
    top: 16,
    right: 60,
    width: 48,
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 4,
  },
  transactionsSection: {
    flex: 1,
    paddingHorizontal: 24,
  },
  transactionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B2B2B',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  historyButtonText: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  todayLabel: {
    fontSize: 16,
    color: '#6E6E6E',
    marginBottom: 16,
  },
  transactionsList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transactionIconInner: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  transactionInfo: {
    flex: 1,
    minWidth: 0,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2B2B',
    marginBottom: 4,
  },
  transactionSubtitle: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionAmountNegative: {
    color: '#ef4444',
  },
  transactionAmountPositive: {
    color: '#FF7A00',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    height: 80,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  quickActionSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 122, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 122, 0, 0.3)',
    paddingHorizontal: 16,
    gap: 8,
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionTextSecondary: {
    color: '#FF7A00',
    fontSize: 14,
    fontWeight: '600',
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, shadows, spacing, borderRadius, typography } from '../../../config/colors';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  onGetStarted: () => void;
  onCreateAccount: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onGetStarted,
  onCreateAccount,
}) => {
  const [cardAnimations] = React.useState({
    backgroundCard: new Animated.Value(0),
    middleCard: new Animated.Value(0),
    frontCard: new Animated.Value(0),
  });

  React.useEffect(() => {
    // Animar os cartões com delays diferentes
    const animateCards = () => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(cardAnimations.backgroundCard, {
              toValue: 1,
              duration: 3000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(cardAnimations.backgroundCard, {
              toValue: 0,
              duration: 3000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(cardAnimations.middleCard, {
              toValue: 1,
              duration: 3000,
              easing: Easing.inOut(Easing.sin),
              delay: 500,
              useNativeDriver: true,
            }),
            Animated.timing(cardAnimations.middleCard, {
              toValue: 0,
              duration: 3000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(cardAnimations.frontCard, {
              toValue: 1,
              duration: 3000,
              easing: Easing.inOut(Easing.sin),
              delay: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(cardAnimations.frontCard, {
              toValue: 0,
              duration: 3000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };

    animateCards();
  }, []);

  const backgroundCardTransform = [
    {
      rotate: cardAnimations.backgroundCard.interpolate({
        inputRange: [0, 1],
        outputRange: ['-12deg', '-8deg'],
      }),
    },
    {
      translateY: cardAnimations.backgroundCard.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
      }),
    },
  ];

  const middleCardTransform = [
    {
      rotate: cardAnimations.middleCard.interpolate({
        inputRange: [0, 1],
        outputRange: ['-6deg', '-4deg'],
      }),
    },
    {
      translateY: cardAnimations.middleCard.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -8],
      }),
    },
  ];

  const frontCardTransform = [
    {
      rotate: cardAnimations.frontCard.interpolate({
        inputRange: [0, 1],
        outputRange: ['3deg', '5deg'],
      }),
    },
    {
      translateY: cardAnimations.frontCard.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -12],
      }),
    },
  ];

  return (
    <LinearGradient
      colors={gradients.background as [string, string]}
      style={styles.container}
    >
      <View style={styles.mainContainer}>
        {/* NFC Cards Visual */}
        <View style={styles.cardsContainer}>
          {/* Background Card - Azul Petróleo */}
          <Animated.View
            style={[
              styles.card,
              styles.backgroundCard,
              { transform: backgroundCardTransform },
            ]}
          >
            <LinearGradient
              colors={gradients.accent as [string, string]}
              style={styles.cardGradient}
            >
              <Ionicons name="wifi" size={32} color="#FFFFFF" style={styles.cardIcon} />
            </LinearGradient>
          </Animated.View>
          
          {/* Middle Card - Cinza Escuro */}
          <Animated.View
            style={[
              styles.card,
              styles.middleCard,
              { transform: middleCardTransform },
            ]}
          >
            <LinearGradient
              colors={gradients.cardDark as [string, string]}
              style={styles.cardGradient}
            >
              <Ionicons name="wifi" size={32} color="#FF7A00" style={styles.cardIcon} />
            </LinearGradient>
          </Animated.View>
          
          {/* Front Card - Laranja */}
          <Animated.View
            style={[
              styles.card,
              styles.frontCard,
              { transform: frontCardTransform },
            ]}
          >
            <LinearGradient
              colors={gradients.primary as [string, string]}
              style={styles.frontCardGradient}
            >
              <Ionicons name="wifi" size={32} color="#FFFFFF" style={styles.cardIcon} />
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.1)', 'transparent']}
                style={styles.overlayGradient}
              />
            </LinearGradient>
          </Animated.View>
          
          {/* Dotted Line Decoration */}
          <View style={styles.dottedLine} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>
            Investment And{'\n'}Manage Money Easily
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button
              title="Get Started"
              onPress={onGetStarted}
              size="large"
              style={styles.getStartedButton}
            />
            
            <TouchableOpacity onPress={onCreateAccount} style={styles.createAccountButton}>
              <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  mainContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  cardsContainer: {
    width: '100%',
    height: 400,
    marginBottom: 48,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: 256,
    height: 384,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  backgroundCard: {
    left: 32,
    top: 32,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  middleCard: {
    left: 48,
    top: 16,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 7,
  },
  frontCard: {
    zIndex: 20,
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 24,
  },
  frontCardGradient: {
    flex: 1,
    borderRadius: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 24,
    position: 'relative',
  },
  overlayGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
  },
  cardIcon: {
    marginTop: 24,
    marginLeft: 24,
  },
  dottedLine: {
    position: 'absolute',
    bottom: -32,
    left: '50%',
    marginLeft: -96,
    width: 192,
    height: 96,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#FF7A00',
    borderRadius: 96,
    opacity: 0.5,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2B2B2B',
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  getStartedButton: {
    width: '100%',
    height: 56,
    marginBottom: 16,
  },
  createAccountButton: {
    width: '100%',
    paddingVertical: 12,
  },
  createAccountText: {
    color: '#9ca3af',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OnboardingScreen;
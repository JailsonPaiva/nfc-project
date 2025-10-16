import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, shadows, spacing, borderRadius, typography } from '../../../config/colors';

const { width, height } = Dimensions.get('window');

interface FeedScreenProps {
  onNavigate?: (screen: string) => void;
}

const topEvents = [
  { 
    id: 1, 
    title: "GRIS Conference", 
    location: "Centro Cultural", 
    time: "18:00", 
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop" 
  },
  { 
    id: 2, 
    title: "Tech Summit 2024", 
    location: "Downtown Hall", 
    time: "14:00", 
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop" 
  },
];

const allEvents = [
  {
    id: 1,
    user: { name: "joao", avatar: "", verified: true },
    location: "Localização",
    title: "LAGOA FESTA DA JUVENTUDE",
    date: "31 MAI | 02 JUN",
    description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s....",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop",
    liked: false
  },
  {
    id: 2,
    user: { name: "Luisa", avatar: "", verified: true },
    location: "Localização",
    title: "Festival de Inverno",
    date: "15 JUL | 18 JUL",
    description: "Experience the best winter festival with amazing performances, food, and entertainment for the whole family....",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop",
    liked: false
  },
];

export const FeedScreen: React.FC<FeedScreenProps> = ({
  onNavigate,
}) => {
  const [activeNav, setActiveNav] = useState("home");
  const [currentTopEvent, setCurrentTopEvent] = useState(0);
  const [likedEvents, setLikedEvents] = useState<number[]>([]);

  const handleLike = (eventId: number) => {
    setLikedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
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

  const nextEvent = () => {
    setCurrentTopEvent((prev) => (prev + 1) % topEvents.length);
  };

  const prevEvent = () => {
    setCurrentTopEvent((prev) => (prev - 1 + topEvents.length) % topEvents.length);
  };

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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Top Events Section */}
        <View style={styles.topEventsSection}>
          <Text style={styles.sectionTitle}>Top Events</Text>
          
          <View style={styles.topEventContainer}>
            <TouchableOpacity style={styles.topEventCard}>
              <Image 
                source={{ uri: topEvents[currentTopEvent].image }}
                style={styles.topEventImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
                style={styles.topEventGradient}
              />
              
              <View style={styles.topEventContent}>
                <View style={styles.topEventInfo}>
                  <Text style={styles.topEventTitle}>
                    {topEvents[currentTopEvent].title}
                  </Text>
                  <View style={styles.topEventLocation}>
                    <Ionicons name="location-outline" size={16} color="rgba(255,255,255,0.9)" />
                    <Text style={styles.topEventLocationText}>
                      {topEvents[currentTopEvent].location}
                    </Text>
                  </View>
                </View>
                <View style={styles.timeBadge}>
                  <Text style={styles.timeBadgeText}>
                    {topEvents[currentTopEvent].time}
                  </Text>
                </View>
              </View>

              {/* Navigation Arrows */}
              <TouchableOpacity
                onPress={prevEvent}
                style={styles.navArrowLeft}
              >
                <Ionicons name="chevron-back" size={20} color="#2B2B2B" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={nextEvent}
                style={styles.navArrowRight}
              >
                <Ionicons name="chevron-forward" size={20} color="#2B2B2B" />
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Pagination Dots */}
            <View style={styles.paginationDots}>
              {topEvents.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setCurrentTopEvent(index)}
                  style={[
                    styles.paginationDot,
                    currentTopEvent === index && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* All Events Section */}
        <View style={styles.allEventsSection}>
          <Text style={styles.sectionTitle}>All Events</Text>

          <View style={styles.allEventsList}>
            {allEvents.map((event, index) => (
              <TouchableOpacity 
                key={event.id} 
                style={styles.eventCard}
                onPress={() => Alert.alert('Evento', `Ver detalhes do ${event.title}`)}
              >
                {/* User Info */}
                <View style={styles.eventUserInfo}>
                  <View style={styles.eventAvatar}>
                    <LinearGradient
                      colors={['#FF7A00', '#FF7A0080']}
                      style={styles.eventAvatarGradient}
                    >
                      <Text style={styles.eventAvatarText}>
                        {event.user.name.substring(0, 2).toUpperCase()}
                      </Text>
                    </LinearGradient>
                  </View>
                  <View style={styles.eventUserDetails}>
                    <View style={styles.eventUserNameRow}>
                      <Text style={styles.eventUserName}>{event.user.name}</Text>
                      {event.user.verified && (
                        <View style={styles.verifiedBadge}>
                          <Text style={styles.verifiedBadgeText}>✓</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.eventUserLocation}>{event.location}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleLike(event.id)}
                    style={styles.likeButton}
                  >
                    <Ionicons 
                      name={likedEvents.includes(event.id) ? "heart" : "heart-outline"}
                      size={20} 
                      color={likedEvents.includes(event.id) ? "#ef4444" : "#9ca3af"} 
                    />
                  </TouchableOpacity>
                </View>

                {/* Event Image */}
                <View style={styles.eventImageContainer}>
                  <Image 
                    source={{ uri: event.image }}
                    style={styles.eventImage}
                    resizeMode="cover"
                  />
                </View>

                {/* Event Info */}
                <View style={styles.eventInfo}>
                  <View style={styles.eventTitleRow}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDate}>{event.date}</Text>
                  </View>
                  
                  <Text style={styles.eventDescription} numberOfLines={3}>
                    {event.description}
                  </Text>

                  <TouchableOpacity style={styles.verMaisButton}>
                    <Text style={styles.verMaisButtonText}>ver mais</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    color: '#9ca3af',
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
  scrollView: {
    flex: 1,
  },
  topEventsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B2B2B',
    marginBottom: 16,
  },
  topEventContainer: {
    position: 'relative',
  },
  topEventCard: {
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  topEventImage: {
    width: '100%',
    height: 192,
  },
  topEventGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topEventContent: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  topEventInfo: {
    flex: 1,
  },
  topEventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B2B2B',
    marginBottom: 4,
  },
  topEventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topEventLocationText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  timeBadge: {
    backgroundColor: 'rgba(96, 165, 250, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  timeBadgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  navArrowLeft: {
    position: 'absolute',
    left: 16,
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  navArrowRight: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#404040',
  },
  paginationDotActive: {
    width: 32,
    backgroundColor: '#FF7A00',
  },
  allEventsSection: {
    paddingHorizontal: 24,
  },
  allEventsList: {
    gap: 24,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 2,
    borderColor: '#FF7A00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  eventUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  eventAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(96, 165, 250, 0.3)',
    overflow: 'hidden',
  },
  eventAvatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventAvatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  eventUserDetails: {
    flex: 1,
  },
  eventUserNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  eventUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2B2B',
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF7A00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedBadgeText: {
    fontSize: 10,
    color: '#1a1a1a',
  },
  eventUserLocation: {
    fontSize: 12,
    color: '#9ca3af',
  },
  likeButton: {
    padding: 8,
    borderRadius: 20,
  },
  eventImageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  eventImage: {
    width: '100%',
    height: 192,
  },
  eventInfo: {
    gap: 12,
  },
  eventTitleRow: {
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B2B2B',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#FF7A00',
    fontWeight: '600',
  },
  eventDescription: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 20,
  },
  verMaisButton: {
    backgroundColor: '#FF7A00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  verMaisButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});

export default FeedScreen;

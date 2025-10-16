import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, shadows, spacing, borderRadius, typography } from '../../../config/colors';

const { width, height } = Dimensions.get('window');

interface BusinessMenuScreenProps {
  onNavigate?: (screen: string) => void;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

const categories = ['Todos', 'Bebidas', 'Comidas', 'Sobremesas', 'Promoções'];

const mockMenuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Hambúrguer Clássico',
    description: 'Pão, carne, queijo, alface, tomate',
    price: 25.90,
    category: 'Comidas',
    available: true,
  },
  {
    id: 2,
    name: 'Coca-Cola 350ml',
    description: 'Refrigerante gelado',
    price: 8.50,
    category: 'Bebidas',
    available: true,
  },
  {
    id: 3,
    name: 'Pudim de Leite',
    description: 'Sobremesa caseira com calda',
    price: 12.00,
    category: 'Sobremesas',
    available: false,
  },
  {
    id: 4,
    name: 'Pizza Margherita',
    description: 'Mussarela, tomate, manjericão',
    price: 35.00,
    category: 'Comidas',
    available: true,
  },
  {
    id: 5,
    name: 'Suco de Laranja',
    description: 'Suco natural 300ml',
    price: 10.00,
    category: 'Bebidas',
    available: true,
  },
];

export const BusinessMenuScreen: React.FC<BusinessMenuScreenProps> = ({
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredItems = selectedCategory === 'Todos' 
    ? mockMenuItems 
    : mockMenuItems.filter(item => item.category === selectedCategory);

  const handleAddProduct = () => {
    Alert.alert('Em desenvolvimento', 'Funcionalidade de adicionar produto será implementada em breve!');
  };

  const handleEditProduct = (item: MenuItem) => {
    Alert.alert('Editar Produto', `Editar: ${item.name}`);
  };

  const toggleAvailability = (item: MenuItem) => {
    Alert.alert('Disponibilidade', `Alterar disponibilidade de: ${item.name}`);
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={[
      styles.menuItemCard,
      !item.available && styles.menuItemUnavailable
    ]}>
      <View style={styles.menuItemContent}>
        <View>
          <View style={styles.menuItemHeader}>
            <Text style={[
              styles.menuItemName,
              !item.available && styles.menuItemNameUnavailable
            ]}>
              {item.name}
            </Text>
            <View style={styles.menuItemActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => toggleAvailability(item)}
              >
                <Ionicons 
                  name={item.available ? "eye" : "eye-off"} 
                  size={16} 
                  color={item.available ? "#4CAF50" : "#E63946"} 
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEditProduct(item)}
              >
                <Ionicons name="create" size={16} color="#FF7A00" />
              </TouchableOpacity>
            </View>
          </View>
          
          <Text style={[
            styles.menuItemDescription,
            !item.available && styles.menuItemDescriptionUnavailable
          ]}>
            {item.description}
          </Text>
          
          <View style={styles.menuItemFooter}>
            <Text style={[
              styles.menuItemPrice,
              !item.available && styles.menuItemPriceUnavailable
            ]}>
              R$ {item.price.toFixed(2)}
            </Text>
            <Text style={styles.menuItemCategory}>{item.category}</Text>
          </View>
        </View>
      </View>
    </View>
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
            <Text style={styles.headerTitle}>Menu Virtual</Text>
            <Text style={styles.headerSubtitle}>Gerencie seus produtos</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={gradients.primary as [string, string]}
              style={styles.statGradient}
            >
              <Ionicons name="restaurant" size={20} color="#FFFFFF" />
              <Text style={styles.statValue}>{mockMenuItems.length}</Text>
              <Text style={styles.statLabel}>Total de Produtos</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#4CAF50', '#45a049']}
              style={styles.statGradient}
            >
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.statValue}>
                {mockMenuItems.filter(item => item.available).length}
              </Text>
              <Text style={styles.statLabel}>Disponíveis</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#2196F3', '#1976D2']}
              style={styles.statGradient}
            >
              <Ionicons name="trending-up" size={20} color="#FFFFFF" />
              <Text style={styles.statValue}>
                R$ {mockMenuItems.reduce((sum, item) => sum + item.price, 0).toFixed(0)}
              </Text>
              <Text style={styles.statLabel}>Valor Médio</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Add Product Button */}
        <TouchableOpacity
          style={styles.addProductButton}
          onPress={handleAddProduct}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={gradients.primary as [string, string]}
            style={styles.addProductGradient}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addProductText}>Adicionar Novo Produto</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <FlatList
            data={filteredItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
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
  categoryContainer: {
    marginBottom: 20,
  },
  categoryContent: {
    paddingHorizontal: 0,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F4F4F4',
  },
  categoryButtonActive: {
    backgroundColor: '#FF7A00',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6E6E6E',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  addProductButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    ...shadows.glow,
  },
  addProductGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  addProductText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  menuContainer: {
    marginBottom: 100, // Padding para não sobrepor com navegação
  },
  menuItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    ...shadows.card,
  },
  menuItemUnavailable: {
    opacity: 0.6,
  },
  menuItemContent: {
    padding: 16,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2B2B',
    flex: 1,
    marginRight: 12,
  },
  menuItemNameUnavailable: {
    color: '#6E6E6E',
  },
  menuItemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#6E6E6E',
    marginBottom: 12,
    lineHeight: 20,
  },
  menuItemDescriptionUnavailable: {
    color: '#A0A0A0',
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF7A00',
  },
  menuItemPriceUnavailable: {
    color: '#6E6E6E',
  },
  menuItemCategory: {
    fontSize: 12,
    color: '#6E6E6E',
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});

export default BusinessMenuScreen;

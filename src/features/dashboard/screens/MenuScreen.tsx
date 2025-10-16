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

interface MenuScreenProps {
  onNavigate?: (screen: string) => void;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  // Bebidas
  {
    id: 1,
    name: "Café Expresso",
    description: "Café tradicional brasileiro",
    price: 4.50,
    category: "Bebidas"
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Café com leite vaporizado e espuma",
    price: 6.90,
    category: "Bebidas"
  },
  {
    id: 3,
    name: "Suco Natural",
    description: "Suco de laranja, maçã ou uva",
    price: 8.50,
    category: "Bebidas"
  },
  {
    id: 4,
    name: "Água",
    description: "Água mineral 500ml",
    price: 2.50,
    category: "Bebidas"
  },
  
  // Lanches
  {
    id: 5,
    name: "Sanduíche Natural",
    description: "Pão integral, alface, tomate, queijo",
    price: 12.90,
    category: "Lanches"
  },
  {
    id: 6,
    name: "Salada Caesar",
    description: "Alface, croutons, queijo parmesão",
    price: 15.90,
    category: "Lanches"
  },
  {
    id: 7,
    name: "Wrap de Frango",
    description: "Tortilha, frango grelhado, vegetais",
    price: 14.50,
    category: "Lanches"
  },
  
  // Doces
  {
    id: 8,
    name: "Brigadeiro",
    description: "Brigadeiro tradicional",
    price: 3.50,
    category: "Doces"
  },
  {
    id: 9,
    name: "Brownie",
    description: "Brownie de chocolate com sorvete",
    price: 9.90,
    category: "Doces"
  },
  {
    id: 10,
    name: "Torta de Limão",
    description: "Torta de limão com merengue",
    price: 7.50,
    category: "Doces"
  }
];

export const MenuScreen: React.FC<MenuScreenProps> = ({
  onNavigate,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Bebidas', 'Lanches', 'Doces'];

  const filteredItems = selectedCategory === 'Todos' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter(cartItem => cartItem.id !== itemId);
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePayment = () => {
    if (cart.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione itens ao carrinho antes de finalizar o pedido.');
      return;
    }

    Alert.alert(
      'Aproxime o cartão',
      `Total: R$ ${getTotalPrice().toFixed(2)}\n\nAproxime seu cartão NFC para efetuar o pagamento.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar Pagamento',
          onPress: () => {
            // Aqui seria implementada a lógica de pagamento NFC
            Alert.alert(
              'Pagamento realizado!',
              'Pagamento processado com sucesso.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setCart([]);
                    if (onNavigate) {
                      onNavigate('Dashboard');
                    }
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => addToCart(item)}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemInfo}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
          <Text style={styles.menuItemPrice}>R$ {item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FF7A00" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.cartItemControls}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => removeFromCart(item.id)}
        >
          <Ionicons name="remove" size={16} color="#FF7A00" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => addToCart(item)}
        >
          <Ionicons name="add" size={16} color="#FF7A00" />
        </TouchableOpacity>
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
            <Text style={styles.headerTitle}>Cardápio Digital</Text>
            <Text style={styles.headerSubtitle}>Escolha seus itens</Text>
          </View>
          <View style={styles.cartIconContainer}>
            <Ionicons name="cart" size={24} color="#FF7A00" />
            {getTotalItems() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
              </View>
            )}
          </View>
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

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <FlatList
          data={filteredItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuList}
        />
      </View>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <View style={styles.cartSummary}>
          <View style={styles.cartHeader}>
            <Text style={styles.cartTitle}>Carrinho ({getTotalItems()} itens)</Text>
            <TouchableOpacity
              onPress={() => setCart([])}
              style={styles.clearCartButton}
            >
              <Ionicons name="trash-outline" size={16} color="#E63946" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.cartItems} showsVerticalScrollIndicator={false}>
            {cart.map((item) => (
              <View key={item.id}>
                {renderCartItem({ item })}
              </View>
            ))}
          </ScrollView>

          <View style={styles.cartTotal}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>R$ {getTotalPrice().toFixed(2)}</Text>
          </View>

          <Button
            title="Pagar com NFC"
            onPress={handlePayment}
            style={styles.paymentButton}
          />
        </View>
      )}
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
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B2B2B',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6E6E6E',
    textAlign: 'center',
    marginTop: 4,
  },
  cartIconContainer: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#E63946',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    
  },
  categoryContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
    // marginHorizontal: 24,
    paddingVertical: 2,
    maxHeight: 50,
  },
  categoryContent: {
    paddingRight: 24,
    alignItems: 'center',

  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 122, 0, 0.2)',
    marginRight: 12,

  },
  categoryButtonActive: {
    backgroundColor: '#FF7A00',
    borderColor: '#FF7A00',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#6E6E6E',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 4,

  },
  menuList: {
    paddingBottom: 20,

  },
  menuItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2B2B',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#6E6E6E',
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF7A00',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 122, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  cartSummary: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 122, 0, 0.2)',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  cartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B2B2B',
  },
  clearCartButton: {
    padding: 8,
  },
  cartItems: {
    maxHeight: 120,
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2B2B2B',
    marginBottom: 2,
  },
  cartItemPrice: {
    fontSize: 12,
    color: '#6E6E6E',
  },
  cartItemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 122, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B2B2B',
    minWidth: 20,
    textAlign: 'center',
  },
  cartTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B2B2B',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7A00',
  },
  paymentButton: {
    ...shadows.glow,
  },
});

export default MenuScreen;

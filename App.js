import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Alert,
  Image
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Menu Data
const MENU_DATA = [
  {
    id: 1,
    name: 'Paket Nasi Box Ekonomis',
    price: 25000,
    category: 'paket',
    description: 'Nasi putih, ayam goreng, sayur, sambal, kerupuk',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Paket Nasi Box Standar',
    price: 35000,
    category: 'paket',
    description: 'Nasi putih, ayam bakar, 2 sayur, sambal, kerupuk, buah',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Paket Nasi Box Premium',
    price: 50000,
    category: 'paket',
    description: 'Nasi, rendang/ayam rica, 2 sayur, sambal, kerupuk, buah, dessert',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Ayam Goreng Kremes',
    price: 18000,
    category: 'makanan',
    description: 'Ayam goreng renyah dengan kremes gurih',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Rendang Daging',
    price: 28000,
    category: 'makanan',
    description: 'Rendang daging sapi empuk bumbu tradisional',
    image: 'https://images.unsplash.com/photo-1595777216528-071e0127ccbf?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Es Teh Manis',
    price: 5000,
    category: 'minuman',
    description: 'Es teh manis segar',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
  },
  {
    id: 7,
    name: 'Es Jeruk',
    price: 8000,
    category: 'minuman',
    description: 'Es jeruk peras segar',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop'
  },
  {
    id: 8,
    name: 'Risoles Mayo',
    price: 5000,
    category: 'snack',
    description: 'Risoles isi ragout ayam dengan mayo',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
  }
];

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate loading time for splash screen
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => 
        c.id === item.id ? {...c, quantity: c.quantity + 1} : c
      ));
    } else {
      setCart([...cart, {...item, quantity: 1}]);
    }
    Alert.alert('Berhasil', 'Item ditambahkan ke keranjang');
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + change;
        return newQty > 0 ? {...item, quantity: newQty} : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    Alert.alert(
      'Hapus Item',
      'Apakah Anda yakin ingin menghapus item ini?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', onPress: () => setCart(cart.filter(item => item.id !== id)) }
      ]
    );
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const formatRupiah = (number) => {
    return 'Rp ' + number.toLocaleString('id-ID');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Keranjang Kosong', 'Silakan tambahkan item terlebih dahulu');
      return;
    }
    setCheckoutModal(true);
  };

  const confirmOrder = () => {
    const ordNum = 'ORD-' + Date.now();
    setOrderNumber(ordNum);
    setCheckoutModal(false);
    setSuccessModal(true);
    setCart([]);
  };

  const closeSuccessModal = () => {
    setSuccessModal(false);
    setActiveTab('home');
  };

  const filteredMenu = MENU_DATA.filter(item => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (!appReady) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍽️ FoodExpress</Text>
        <TouchableOpacity 
          onPress={() => setActiveTab('cart')} 
          style={styles.cartButton}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          {getTotalItems() > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{getTotalItems()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'home' && styles.activeTab]}
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'menu' && styles.activeTab]}
          onPress={() => setActiveTab('menu')}
        >
          <Text style={[styles.tabText, activeTab === 'menu' && styles.activeTabText]}>
            Menu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'cart' && styles.activeTab]}
          onPress={() => setActiveTab('cart')}
        >
          <Text style={[styles.tabText, activeTab === 'cart' && styles.activeTabText]}>
            Cart ({getTotalItems()})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'home' && (
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Pesan Makanan Favorit Anda</Text>
            <Text style={styles.heroSubtitle}>
              Catering terbaik dengan kualitas premium dan pengiriman cepat
            </Text>
            <TouchableOpacity 
              style={styles.heroButton}
              onPress={() => setActiveTab('menu')}
            >
              <Text style={styles.heroButtonText}>Lihat Menu</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'menu' && (
          <View style={styles.menuSection}>
            <TextInput
              style={styles.searchInput}
              placeholder="Cari menu..."
              value={searchText}
              onChangeText={setSearchText}
            />

            {/* Category Filter */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}
            >
              {['all', 'paket', 'makanan', 'minuman', 'snack'].map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryBtn,
                    selectedCategory === cat && styles.categoryBtnActive
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={[
                    styles.categoryBtnText,
                    selectedCategory === cat && styles.categoryBtnTextActive
                  ]}>
                    {cat === 'all' ? 'Semua' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <FlatList
              data={filteredMenu}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.menuRow}
              renderItem={({item}) => (
                <View style={styles.menuCard}>
                  <Image 
                    source={{uri: item.image}} 
                    style={styles.menuImage}
                  />
                  <View style={styles.menuInfo}>
                    <Text style={styles.menuName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={styles.menuDesc} numberOfLines={2}>
                      {item.description}
                    </Text>
                    <Text style={styles.menuPrice}>
                      {formatRupiah(item.price)}
                    </Text>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => addToCart(item)}
                    >
                      <Text style={styles.addButtonText}>+ Keranjang</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        )}

        {activeTab === 'cart' && (
          <View style={styles.cartSection}>
            {cart.length === 0 ? (
              <View style={styles.emptyCart}>
                <Text style={styles.emptyIcon}>🛒</Text>
                <Text style={styles.emptyText}>Keranjang kosong</Text>
                <TouchableOpacity 
                  style={styles.shopButton}
                  onPress={() => setActiveTab('menu')}
                >
                  <Text style={styles.shopButtonText}>Mulai Belanja</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {cart.map(item => (
                  <View key={item.id} style={styles.cartItem}>
                    <Image 
                      source={{uri: item.image}} 
                      style={styles.cartImage}
                    />
                    <View style={styles.cartInfo}>
                      <Text style={styles.cartName}>{item.name}</Text>
                      <Text style={styles.cartPrice}>
                        {formatRupiah(item.price)}
                      </Text>
                      <View style={styles.qtyControls}>
                        <TouchableOpacity 
                          onPress={() => updateQuantity(item.id, -1)}
                          style={styles.qtyBtn}
                        >
                          <Text style={styles.qtyBtnText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{item.quantity}</Text>
                        <TouchableOpacity 
                          onPress={() => updateQuantity(item.id, 1)}
                          style={styles.qtyBtn}
                        >
                          <Text style={styles.qtyBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TouchableOpacity 
                      onPress={() => removeFromCart(item.id)}
                      style={styles.removeBtn}
                    >
                      <Text style={styles.removeBtnText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={styles.cartTotal}>
                  <Text style={styles.totalLabel}>Total:</Text>
                  <Text style={styles.totalValue}>
                    {formatRupiah(getTotal())}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.checkoutButton}
                  onPress={handleCheckout}
                >
                  <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </ScrollView>

      {/* Checkout Modal */}
      <Modal visible={checkoutModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Konfirmasi Pesanan</Text>
            <TouchableOpacity onPress={() => setCheckoutModal(false)}>
              <Text style={styles.closeModal}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalBody}>
            <Text style={styles.modalSection}>Ringkasan Pesanan:</Text>
            {cart.map(item => (
              <View key={item.id} style={styles.summaryRow}>
                <Text>{item.name} ({item.quantity}x)</Text>
                <Text>{formatRupiah(item.price * item.quantity)}</Text>
              </View>
            ))}
            <View style={styles.summaryTotal}>
              <Text style={styles.summaryTotalLabel}>Total:</Text>
              <Text style={styles.summaryTotalValue}>
                {formatRupiah(getTotal())}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmOrder}
            >
              <Text style={styles.confirmButtonText}>Konfirmasi Pesanan</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={successModal} animationType="fade" transparent>
        <View style={styles.successOverlay}>
          <View style={styles.successModal}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successTitle}>Pesanan Berhasil!</Text>
            <Text style={styles.successMessage}>
              Terima kasih atas pesanan Anda
            </Text>
            <Text style={styles.successOrder}>No. Pesanan: {orderNumber}</Text>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={closeSuccessModal}
            >
              <Text style={styles.doneButtonText}>Selesai</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    backgroundColor: '#ff6b6b',
    padding: 15,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  cartButton: { position: 'relative' },
  cartIcon: { fontSize: 28 },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ffd93d',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: { fontSize: 12, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', backgroundColor: 'white', padding: 10 },
  tab: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 5
  },
  activeTab: { backgroundColor: '#ff6b6b' },
  tabText: { textAlign: 'center', fontWeight: '600', color: '#666' },
  activeTabText: { color: 'white' },
  content: { flex: 1 },
  hero: { 
    padding: 40, 
    alignItems: 'center', 
    backgroundColor: '#ff6b6b',
    minHeight: 300,
    justifyContent: 'center'
  },
  heroTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: 'white', 
    textAlign: 'center',
    marginBottom: 15
  },
  heroSubtitle: { 
    fontSize: 16, 
    color: 'white', 
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20
  },
  heroButton: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25
  },
  heroButtonText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: 'bold'
  },
  menuSection: { padding: 15 },
  searchInput: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  categoryScroll: { marginBottom: 15 },
  categoryBtn: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#ff6b6b'
  },
  categoryBtnActive: { backgroundColor: '#ff6b6b' },
  categoryBtnText: { color: '#ff6b6b', fontWeight: '600' },
  categoryBtnTextActive: { color: 'white' },
  menuRow: { justifyContent: 'space-between' },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    width: '48%',
    overflow: 'hidden'
  },
  menuImage: { width: '100%', height: 120 },
  menuInfo: { padding: 10 },
  menuName: { fontSize: 14, fontWeight: '600', marginBottom: 5 },
  menuDesc: { fontSize: 11, color: '#666', marginBottom: 5 },
  menuPrice: { fontSize: 14, color: '#ff6b6b', fontWeight: 'bold', marginBottom: 8 },
  addButton: {
    backgroundColor: '#ff6b6b',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center'
  },
  addButtonText: { color: 'white', fontSize: 12, fontWeight: '600' },
  cartSection: { padding: 20 },
  emptyCart: { alignItems: 'center', paddingTop: 80 },
  emptyIcon: { fontSize: 80, marginBottom: 20 },
  emptyText: { fontSize: 18, color: '#999', marginBottom: 30 },
  shopButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25
  },
  shopButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  cartItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cartImage: { width: 60, height: 60, borderRadius: 10, marginRight: 15 },
  cartInfo: { flex: 1 },
  cartName: { fontSize: 14, fontWeight: '600', marginBottom: 5 },
  cartPrice: { color: '#ff6b6b', fontWeight: 'bold', marginBottom: 8 },
  qtyControls: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  qtyBtnText: { fontSize: 18, fontWeight: 'bold' },
  qtyText: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' },
  removeBtn: { padding: 10 },
  removeBtnText: { fontSize: 24 },
  cartTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15
  },
  totalLabel: { fontSize: 20, fontWeight: 'bold' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#ff6b6b' },
  checkoutButton: {
    backgroundColor: '#ff6b6b',
    padding: 15,
    borderRadius: 10
  },
  checkoutText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  modalContainer: { flex: 1, backgroundColor: 'white' },
  modalHeader: {
    backgroundColor: '#ff6b6b',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  closeModal: { fontSize: 28, color: 'white' },
  modalBody: { padding: 20 },
  modalSection: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    marginTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#ddd'
  },
  summaryTotalLabel: { fontSize: 20, fontWeight: 'bold' },
  summaryTotalValue: { fontSize: 20, fontWeight: 'bold', color: '#ff6b6b' },
  confirmButton: {
    backgroundColor: '#ff6b6b',
    padding: 15,
    borderRadius: 10,
    marginTop: 30
  },
  confirmButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  successModal: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 40,
    width: '85%',
    alignItems: 'center'
  },
  successIcon: { fontSize: 80, marginBottom: 20 },
  successTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  successMessage: { fontSize: 16, color: '#666', marginBottom: 20 },
  successOrder: { 
    fontSize: 16, 
    color: '#ff6b6b', 
    fontWeight: 'bold',
    marginBottom: 30
  },
  doneButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25
  },
  doneButtonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});
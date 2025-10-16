// Menu Data
const menuData = [
    {
        id: 1,
        name: 'Paket Nasi Box Ekonomis',
        category: 'paket',
        price: 25000,
        description: 'Nasi putih, ayam goreng, sayur, sambal, kerupuk',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        name: 'Paket Nasi Box Standar',
        category: 'paket',
        price: 35000,
        description: 'Nasi putih, ayam bakar, 2 sayur, sambal, kerupuk, buah',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        name: 'Paket Nasi Box Premium',
        category: 'paket',
        price: 50000,
        description: 'Nasi putih, rendang/ayam rica, 2 sayur, sambal, kerupuk, buah, dessert',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        name: 'Paket Prasmanan 50 Pax',
        category: 'paket',
        price: 2500000,
        description: 'Menu komplit untuk 50 orang: Nasi, 3 lauk, 3 sayur, buah, minuman',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        name: 'Paket Snack Box Meeting',
        category: 'paket',
        price: 30000,
        description: 'Sandwich, risoles, sus, kue basah, buah potong, air mineral',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop'
    },
    {
        id: 6,
        name: 'Nasi Putih',
        category: 'makanan',
        price: 5000,
        description: 'Nasi putih pulen premium',
        image: 'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=400&h=300&fit=crop'
    },
    {
        id: 7,
        name: 'Ayam Goreng Kremes',
        category: 'makanan',
        price: 18000,
        description: 'Ayam goreng renyah dengan kremes gurih',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop'
    },
    {
        id: 8,
        name: 'Rendang Daging',
        category: 'makanan',
        price: 28000,
        description: 'Rendang daging sapi empuk bumbu tradisional',
        image: 'https://images.unsplash.com/photo-1595777216528-071e0127ccbf?w=400&h=300&fit=crop'
    },
    {
        id: 9,
        name: 'Ikan Bakar',
        category: 'makanan',
        price: 25000,
        description: 'Ikan segar bakar dengan bumbu kecap',
        image: 'https://images.unsplash.com/photo-1580959375944-1ab5ae4fc5bb?w=400&h=300&fit=crop'
    },
    {
        id: 10,
        name: 'Sayur Asem',
        category: 'makanan',
        price: 8000,
        description: 'Sayur asem segar dengan labu, kacang panjang',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop'
    },
    {
        id: 11,
        name: 'Capcay',
        category: 'makanan',
        price: 12000,
        description: 'Capcay sayuran segar dengan bakso',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop'
    },
    {
        id: 12,
        name: 'Es Teh Manis',
        category: 'minuman',
        price: 5000,
        description: 'Es teh manis segar',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
    },
    {
        id: 13,
        name: 'Es Jeruk',
        category: 'minuman',
        price: 8000,
        description: 'Es jeruk peras segar',
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop'
    },
    {
        id: 14,
        name: 'Air Mineral',
        category: 'minuman',
        price: 3000,
        description: 'Air mineral kemasan 600ml',
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop'
    },
    {
        id: 15,
        name: 'Jus Buah',
        category: 'minuman',
        price: 12000,
        description: 'Jus buah segar pilihan (alpukat/mangga/jambu)',
        image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop'
    },
    {
        id: 16,
        name: 'Risoles Mayo',
        category: 'snack',
        price: 5000,
        description: 'Risoles isi ragout ayam dengan mayo',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
    },
    {
        id: 17,
        name: 'Lemper Ayam',
        category: 'snack',
        price: 4000,
        description: 'Lemper ketan isi ayam suwir',
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop'
    },
    {
        id: 18,
        name: 'Pastel Goreng',
        category: 'snack',
        price: 4500,
        description: 'Pastel goreng isi sayuran',
        image: 'https://images.unsplash.com/photo-1601314002592-357d6f2d5c5d?w=400&h=300&fit=crop'
    },
    {
        id: 19,
        name: 'Kue Sus',
        category: 'snack',
        price: 6000,
        description: 'Kue sus isi vla vanila',
        image: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=400&h=300&fit=crop'
    },
    {
        id: 20,
        name: 'Brownies Coklat',
        category: 'snack',
        price: 7000,
        description: 'Brownies coklat lembut premium',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop'
    }
];

// Cart State
let cart = [];
let currentCategory = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayMenu();
    updateCartDisplay();
    
    // Set minimum date for delivery
    const today = new Date();
    today.setDate(today.getDate() + 1); // Minimum next day
    document.getElementById('deliveryDate').min = today.toISOString().split('T')[0];
});

// Display Menu
function displayMenu(filterText = '') {
    const menuGrid = document.getElementById('menuGrid');
    let filteredMenu = menuData;

    // Filter by category
    if (currentCategory !== 'all') {
        filteredMenu = filteredMenu.filter(item => item.category === currentCategory);
    }

    // Filter by search text
    if (filterText) {
        filteredMenu = filteredMenu.filter(item => 
            item.name.toLowerCase().includes(filterText.toLowerCase()) ||
            item.description.toLowerCase().includes(filterText.toLowerCase())
        );
    }

    menuGrid.innerHTML = '';

    if (filteredMenu.length === 0) {
        menuGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <div class="empty-state-icon">🔍</div>
                <h3>Menu tidak ditemukan</h3>
                <p>Coba kata kunci lain atau lihat kategori lainnya</p>
            </div>
        `;
        return;
    }

    filteredMenu.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <div class="menu-image">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="menu-info">
                <div class="menu-name">${item.name}</div>
                <div class="menu-desc">${item.description}</div>
                <div class="menu-footer">
                    <div class="menu-price">${formatRupiah(item.price)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                        + Keranjang
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// Filter by Category
function filterCategory(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Display filtered menu
    displayMenu(document.getElementById('searchInput').value);
}

// Search Menu
function searchMenu() {
    const searchText = document.getElementById('searchInput').value;
    displayMenu(searchText);
}

// Add to Cart
function addToCart(itemId) {
    const item = menuData.find(m => m.id === itemId);
    if (!item) return;

    const existingItem = cart.find(c => c.id === itemId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCartDisplay();
    
    // Show notification
    showNotification('✅ Item ditambahkan ke keranjang!');
}

// Update Cart Display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const cartTotal = document.getElementById('cartTotal');

    // Update badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛒</div>
                <p>Keranjang belanja kosong</p>
            </div>
        `;
        cartTotal.textContent = formatRupiah(0);
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatRupiah(item.price)}</div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">🗑️</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = formatRupiah(total);
}

// Update Quantity
function updateQuantity(itemId, change) {
    const item = cart.find(c => c.id === itemId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCartDisplay();
    }
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(c => c.id !== itemId);
    updateCartDisplay();
    showNotification('🗑️ Item dihapus dari keranjang');
}

// Toggle Cart
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
}

// Show Checkout
function showCheckout() {
    if (cart.length === 0) {
        alert('Keranjang belanja masih kosong!');
        return;
    }

    const modal = document.getElementById('checkoutModal');
    const orderSummary = document.getElementById('orderSummary');

    // Generate order summary
    let summaryHTML = '<h3>Ringkasan Pesanan</h3>';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        summaryHTML += `
            <div class="summary-row">
                <span>${item.name} (${item.quantity}x)</span>
                <span>${formatRupiah(itemTotal)}</span>
            </div>
        `;
    });

    const deliveryFee = 10000;
    const total = subtotal + deliveryFee;

    summaryHTML += `
        <div class="summary-row">
            <span>Subtotal</span>
            <span>${formatRupiah(subtotal)}</span>
        </div>
        <div class="summary-row">
            <span>Biaya Pengiriman</span>
            <span>${formatRupiah(deliveryFee)}</span>
        </div>
        <div class="summary-row summary-total">
            <span>Total</span>
            <span>${formatRupiah(total)}</span>
        </div>
    `;

    orderSummary.innerHTML = summaryHTML;
    modal.classList.add('active');
    toggleCart(); // Close cart sidebar
}

// Close Checkout
function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('active');
    document.getElementById('checkoutForm').reset();
}

// Handle Checkout Form Submit
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const orderData = {
        orderNumber: 'ORD-' + Date.now(),
        customerName: document.getElementById('customerName').value,
        customerPhone: document.getElementById('customerPhone').value,
        customerEmail: document.getElementById('customerEmail').value,
        deliveryAddress: document.getElementById('deliveryAddress').value,
        deliveryDate: document.getElementById('deliveryDate').value,
        deliveryTime: document.getElementById('deliveryTime').value,
        paymentMethod: document.getElementById('paymentMethod').value,
        orderNotes: document.getElementById('orderNotes').value,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 10000,
        createdAt: new Date().toISOString()
    };

    // Save to local storage (simulating database)
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Show success modal
    document.getElementById('orderNumber').textContent = 'No. Pesanan: ' + orderData.orderNumber;
    document.getElementById('checkoutModal').classList.remove('active');
    document.getElementById('successModal').classList.add('active');

    // Clear cart
    cart = [];
    updateCartDisplay();
    document.getElementById('checkoutForm').reset();
});

// Close Success Modal
function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Format Rupiah
function formatRupiah(number) {
    return 'Rp ' + number.toLocaleString('id-ID');
}

// Section Navigation
function showSection(section) {
    if (section === 'menu') {
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
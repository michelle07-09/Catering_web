// ============================================
// FOODEXPRESS CATERING - MAIN JAVASCRIPT
// ============================================

// Data Menu Catering
const API_BASE_URL = 'https://dc1ca9d034eb3b59279f25e290791b39.onrender.com';
const menuData = [
    {
        id: 1,
        name: 'Paket Nasi Box Ayam',
        category: 'nasi-box',
        price: 25000,
        description: 'Nasi putih, ayam goreng/bakar, sayur, sambal, kerupuk',
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        name: 'Paket Nasi Box Ikan',
        category: 'nasi-box',
        price: 28000,
        description: 'Nasi putih, ikan goreng/bakar, sayur, sambal, kerupuk',
        image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        name: 'Paket Nasi Box Daging',
        category: 'nasi-box',
        price: 35000,
        description: 'Nasi putih, rendang/empal, sayur, sambal, kerupuk',
        image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        name: 'Paket Tumpeng Mini',
        category: 'tumpeng',
        price: 150000,
        description: 'Nasi kuning, ayam goreng, telur, urap, serundeng (untuk 5 orang)',
        image: 'https://images.unsplash.com/photo-1596040033229-a0b44e04c4a1?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        name: 'Paket Tumpeng Sedang',
        category: 'tumpeng',
        price: 300000,
        description: 'Nasi kuning, ayam goreng, telur, urap, serundeng (untuk 10 orang)',
        image: 'https://images.unsplash.com/photo-1596040033229-a0b44e04c4a1?w=400&h=300&fit=crop'
    },
    {
        id: 6,
        name: 'Paket Prasmanan 50 Pax',
        category: 'prasmanan',
        price: 1250000,
        description: '3 lauk, 2 sayur, buah, nasi putih & kuning, kerupuk (50 orang)',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop'
    },
    {
        id: 7,
        name: 'Paket Prasmanan 100 Pax',
        category: 'prasmanan',
        price: 2300000,
        description: '4 lauk, 2 sayur, buah, nasi putih & kuning, kerupuk (100 orang)',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop'
    },
    {
        id: 8,
        name: 'Paket Snack Box A',
        category: 'snack',
        price: 15000,
        description: 'Risoles, lemper, sus, kue basah, air mineral',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'
    },
    {
        id: 9,
        name: 'Paket Snack Box B',
        category: 'snack',
        price: 20000,
        description: 'Pastel, kroket, tahu isi, kue basah, juice',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'
    },
    {
        id: 10,
        name: 'Paket Coffee Break',
        category: 'snack',
        price: 25000,
        description: 'Kue kering, roti, buah potong, kopi/teh',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'
    },
    {
        id: 11,
        name: 'Nasi Kuning Ulang Tahun',
        category: 'tumpeng',
        price: 200000,
        description: 'Nasi kuning box 20 pax, ayam goreng, telur, urap',
        image: 'https://images.unsplash.com/photo-1596040033229-a0b44e04c4a1?w=400&h=300&fit=crop'
    },
    {
        id: 12,
        name: 'Paket Nasi Box Premium',
        category: 'nasi-box',
        price: 45000,
        description: 'Nasi putih, ayam bakar madu, sayur, sambal, buah, kerupuk, air mineral',
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop'
    }
];

// ============================================
// STATE MANAGEMENT
// ============================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'semua';

// ============================================
// USER AUTHENTICATION
// ============================================
function checkAuth() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return null;
    }
    
    return loggedInUser;
}

function displayUserInfo() {
    const user = checkAuth();
    if (user) {
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = user.name;
        }
    }
}

function handleLogout() {
    if (confirm('Yakin ingin logout?')) {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('cart');
        window.location.href = 'login.html';
    }
}

// ============================================
// MENU DISPLAY
// ============================================
function displayMenu(category = 'semua') {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;
    
    currentCategory = category;
    
    const filteredMenu = category === 'semua' 
        ? menuData 
        : menuData.filter(item => item.category === category);
    
    if (filteredMenu.length === 0) {
        menuGrid.innerHTML = '<div class="empty-state"><h3>Tidak ada menu di kategori ini</h3></div>';
        return;
    }
    
    menuGrid.innerHTML = filteredMenu.map(item => `
        <div class="menu-card" data-id="${item.id}">
            <div class="menu-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="menu-info">
                <div class="menu-name">${item.name}</div>
                <div class="menu-desc">${item.description}</div>
                <div class="menu-footer">
                    <div class="menu-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                        🛒 Pesan
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function searchMenu() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    const menuGrid = document.getElementById('menuGrid');
    
    if (searchTerm === '') {
        displayMenu(currentCategory);
        return;
    }
    
    const filteredMenu = menuData.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );
    
    if (filteredMenu.length === 0) {
        menuGrid.innerHTML = '<div class="empty-state"><h3>Menu tidak ditemukan</h3><p>Coba kata kunci lain</p></div>';
        return;
    }
    
    menuGrid.innerHTML = filteredMenu.map(item => `
        <div class="menu-card">
            <div class="menu-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="menu-info">
                <div class="menu-name">${item.name}</div>
                <div class="menu-desc">${item.description}</div>
                <div class="menu-footer">
                    <div class="menu-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                        🛒 Pesan
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// CATEGORY FILTER
// ============================================
function setupCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            displayMenu(category);
        });
    });
}

// ============================================
// CART MANAGEMENT
// ============================================
function addToCart(itemId) {
    const item = menuData.find(m => m.id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(c => c.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showNotification('success', 'Ditambahkan!', `${item.name} ditambahkan ke keranjang`);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartUI();
}

function updateQuantity(itemId, change) {
    const item = cart.find(c => c.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    updateCartBadge();
    updateCartSidebar();
}

function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    if (!cartBadge) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
}

function updateCartSidebar() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (!cartItemsContainer || !cartTotalElement) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-state"><h3>Keranjang Kosong</h3><p>Belum ada pesanan</p></div>';
        cartTotalElement.textContent = 'Rp 0';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">🗑️</button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
    }
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
    }
}

// ============================================
// CHECKOUT
// ============================================
function openCheckoutModal() {
    if (cart.length === 0) {
        showNotification('error', 'Keranjang Kosong', 'Tambahkan menu terlebih dahulu');
        return;
    }
    
    const modal = document.getElementById('checkoutModal');
    if (!modal) return;
    
    const user = checkAuth();
    if (!user) return;
    
    // Pre-fill form dengan data user
    document.getElementById('customerName').value = user.name;
    document.getElementById('customerPhone').value = user.phone || '';
    document.getElementById('customerEmail').value = user.email;
    
    // Display order summary
    updateOrderSummary();
    
    modal.classList.add('active');
    closeCart();
}

function updateOrderSummary() {
    const summaryContainer = document.getElementById('orderSummaryItems');
    if (!summaryContainer) return;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 15000;
    const total = subtotal + deliveryFee;
    
    summaryContainer.innerHTML = `
        ${cart.map(item => `
            <div class="summary-row">
                <span>${item.name} (x${item.quantity})</span>
                <span>Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</span>
            </div>
        `).join('')}
        <div class="summary-row">
            <span>Subtotal</span>
            <span>Rp ${subtotal.toLocaleString('id-ID')}</span>
        </div>
        <div class="summary-row">
            <span>Biaya Pengiriman</span>
            <span>Rp ${deliveryFee.toLocaleString('id-ID')}</span>
        </div>
        <div class="summary-row summary-total">
            <span>Total</span>
            <span>Rp ${total.toLocaleString('id-ID')}</span>
        </div>
    `;
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function processCheckout(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        customerName: form.customerName.value.trim(),
        customerPhone: form.customerPhone.value.trim(),
        customerEmail: form.customerEmail.value.trim(),
        deliveryAddress: form.deliveryAddress.value.trim(),
        deliveryDate: form.deliveryDate.value,
        deliveryTime: form.deliveryTime.value,
        notes: form.notes.value.trim(),
        paymentMethod: form.paymentMethod.value
    };
    
    // Validation
    if (!formData.customerName || !formData.customerPhone || !formData.deliveryAddress || 
        !formData.deliveryDate || !formData.deliveryTime || !formData.paymentMethod) {
        showNotification('error', 'Data Tidak Lengkap', 'Mohon lengkapi semua field yang wajib diisi');
        return;
    }
    
    // Generate order number
    const orderNumber = 'FE' + Date.now();
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 15000;
    const total = subtotal + deliveryFee;
    
    // Create order object
    const order = {
        orderNumber,
        ...formData,
        items: cart,
        subtotal,
        deliveryFee,
        total,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Show success message
    showOrderSuccess(orderNumber);
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();
    
    // Reset form
    form.reset();
}

function showOrderSuccess(orderNumber) {
    const modal = document.getElementById('checkoutModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <div class="success-message">
            <div class="success-icon">✅</div>
            <h2>Pesanan Berhasil!</h2>
            <p class="order-number">Nomor Pesanan: ${orderNumber}</p>
            <p>Terima kasih atas pesanan Anda. Kami akan segera menghubungi Anda untuk konfirmasi.</p>
            <p style="margin-top: 20px; color: #666;">
                Silakan lakukan pembayaran melalui metode yang Anda pilih. 
                Tim kami akan mengirimkan detail pembayaran via WhatsApp.
            </p>
            <button class="btn btn-primary" onclick="closeCheckoutModal()" style="margin-top: 30px; width: auto; padding: 15px 50px;">
                Tutup
            </button>
        </div>
    `;
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(type, title, message) {
    const notifContainer = document.getElementById('notification');
    if (!notifContainer) {
        // Create notification container if not exists
        const notif = document.createElement('div');
        notif.id = 'notification';
        notif.className = 'notification';
        notif.innerHTML = `
            <div class="notification-title" id="notifTitle"></div>
            <div class="notification-message" id="notifMessage"></div>
        `;
        document.body.appendChild(notif);
    }
    
    const notif = document.getElementById('notification');
    const notifTitle = document.getElementById('notifTitle');
    const notifMessage = document.getElementById('notifMessage');
    
    notif.className = `notification ${type} show`;
    notifTitle.textContent = title;
    notifMessage.textContent = message;
    
    setTimeout(() => {
        notif.classList.remove('show');
    }, 3500);
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    displayUserInfo();
    
    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Display initial menu
    displayMenu('semua');
    
    // Setup category filter
    setupCategoryFilter();
    
    // Setup search
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', searchMenu);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchMenu();
            }
        });
    }
    
    // Setup cart
    const cartIcon = document.getElementById('cartIcon');
    const closeCartBtn = document.getElementById('closeCart');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCart);
    }
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }
    
    // Setup checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutForm = document.getElementById('checkoutForm');
    const cancelCheckoutBtn = document.getElementById('cancelCheckout');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckoutModal);
    }
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', processCheckout);
    }
    
    if (cancelCheckoutBtn) {
        cancelCheckoutBtn.addEventListener('click', closeCheckoutModal);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCheckoutModal();
            }
        });
    }
    
    // Update cart UI
    updateCartUI();
    
    // Set minimum date for delivery (tomorrow)
    const deliveryDateInput = document.getElementById('deliveryDate');
    if (deliveryDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        deliveryDateInput.min = tomorrow.toISOString().split('T')[0];
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================
function formatCurrency(amount) {
    return `Rp ${amount.toLocaleString('id-ID')}`;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// ============================================
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.toggleCart = toggleCart;
window.closeCart = closeCart;
window.openCheckoutModal = openCheckoutModal;
window.closeCheckoutModal = closeCheckoutModal;
window.handleLogout = handleLogout;
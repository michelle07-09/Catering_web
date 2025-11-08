// ================================================
// ADMIN PANEL JAVASCRIPT - FoodExpress
// ================================================

const API_URL = window.location.origin + '/api';

// Global state
let currentOrders = [];
let currentUsers = [];
let currentMenu = [];
let editingMenuId = null;

// ================================================
// AUTHENTICATION & INITIALIZATION
// ================================================

function checkAdminAuth() {
    const loggedInAdmin = JSON.parse(localStorage.getItem('loggedInAdmin'));
    
    if (!loggedInAdmin) {
        window.location.href = 'admin-login.html';
        return null;
    }
    
    // Check if user is admin
    if (loggedInAdmin.role !== 'admin') {
        alert('Access denied! Admin only.');
        window.location.href = 'admin-login.html';
        return null;
    }
    
    return loggedInAdmin;
}

function displayAdminInfo() {
    const admin = checkAdminAuth();
    if (admin) {
        const adminNameElement = document.getElementById('adminName');
        if (adminNameElement) {
            adminNameElement.textContent = admin.name;
        }
    }
}

function handleLogout() {
    if (confirm('Yakin ingin logout?')) {
        localStorage.removeItem('loggedInAdmin');
        window.location.href = 'admin-login.html';
    }
}

// ================================================
// NAVIGATION
// ================================================

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    const section = document.getElementById(sectionName + 'Section');
    if (section) {
        section.classList.add('active');
    }
    
    // Add active class to clicked nav item
    event.target.classList.add('active');
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'orders': 'Order Management',
        'menu': 'Menu Management',
        'users': 'User Management',
        'reports': 'Reports & Analytics'
    };
    document.getElementById('pageTitle').textContent = titles[sectionName] || sectionName;
    
    // Load data for section
    switch(sectionName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'menu':
            loadMenu();
            break;
        case 'users':
            loadUsers();
            break;
        case 'reports':
            loadReports();
            break;
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// ================================================
// DASHBOARD
// ================================================

async function loadDashboardData() {
    try {
        // Load stats
        await loadStats();
        
        // Load recent orders
        await loadRecentOrders();
        
        // Load popular menu
        await loadPopularMenu();
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showNotification('Error loading dashboard data', 'error');
    }
}

async function loadStats() {
    try {
        // Get orders
        const ordersResponse = await fetch(`${API_URL}/orders`);
        const ordersData = await ordersResponse.json();
        const orders = ordersData.data || [];
        
        // Get users
        const usersResponse = await fetch(`${API_URL}/users`);
        const usersData = await usersResponse.json();
        const users = usersData.data || [];
        
        // Calculate stats
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(o => o.status === 'pending').length;
        const totalUsers = users.length;
        const totalRevenue = orders
            .filter(o => o.status === 'completed')
            .reduce((sum, o) => sum + (o.total || 0), 0);
        
        // Update UI
        document.getElementById('totalOrders').textContent = totalOrders;
        document.getElementById('pendingOrders').textContent = pendingOrders;
        document.getElementById('totalUsers').textContent = totalUsers;
        document.getElementById('totalRevenue').textContent = formatCurrency(totalRevenue);
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

async function loadRecentOrders() {
    try {
        const response = await fetch(`${API_URL}/orders`);
        const data = await response.json();
        const orders = data.data || [];
        
        // Get 5 most recent orders
        const recentOrders = orders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);
        
        const container = document.getElementById('recentOrders');
        
        if (recentOrders.length === 0) {
            container.innerHTML = '<p style="text-align:center;color:#999;">No recent orders</p>';
            return;
        }
        
        container.innerHTML = recentOrders.map(order => `
            <div class="list-item">
                <div class="list-item-info">
                    <h4>${order.orderNumber}</h4>
                    <p>${order.customerName} - ${formatDate(order.createdAt)}</p>
                </div>
                <div class="list-item-value">
                    ${formatCurrency(order.total)}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading recent orders:', error);
    }
}

async function loadPopularMenu() {
    try {
        const ordersResponse = await fetch(`${API_URL}/orders`);
        const ordersData = await ordersResponse.json();
        const orders = ordersData.data || [];
        
        // Count menu items
        const menuCount = {};
        orders.forEach(order => {
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    if (menuCount[item.name]) {
                        menuCount[item.name] += item.quantity;
                    } else {
                        menuCount[item.name] = item.quantity;
                    }
                });
            }
        });
        
        // Sort and get top 5
        const popularMenu = Object.entries(menuCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        const container = document.getElementById('popularMenu');
        
        if (popularMenu.length === 0) {
            container.innerHTML = '<p style="text-align:center;color:#999;">No data available</p>';
            return;
        }
        
        container.innerHTML = popularMenu.map(([name, count]) => `
            <div class="list-item">
                <div class="list-item-info">
                    <h4>${name}</h4>
                </div>
                <div class="list-item-value">
                    ${count} orders
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading popular menu:', error);
    }
}

// ================================================
// ORDERS MANAGEMENT
// ================================================

async function loadOrders() {
    try {
        const response = await fetch(`${API_URL}/orders`);
        const data = await response.json();
        currentOrders = data.data || [];
        
        displayOrders(currentOrders);
    } catch (error) {
        console.error('Error loading orders:', error);
        showNotification('Error loading orders', 'error');
    }
}

function displayOrders(orders) {
    const tbody = document.getElementById('ordersTableBody');
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#999;">No orders found</td></tr>';
        return;
    }
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td><strong>${order.orderNumber}</strong></td>
            <td>${order.customerName}</td>
            <td>${formatDate(order.createdAt)}</td>
            <td>${order.items ? order.items.length : 0} items</td>
            <td><strong>${formatCurrency(order.total)}</strong></td>
            <td>
                <select class="status-badge status-${order.status}" onchange="updateOrderStatus('${order.orderNumber}', this.value)">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                    <option value="delivery" ${order.status === 'delivery' ? 'selected' : ''}>Delivery</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewOrderDetail('${order.orderNumber}')">
                    👁️ View
                </button>
            </td>
        </tr>
    `).join('');
}

function filterOrders() {
    const filterValue = document.getElementById('orderStatusFilter').value;
    
    if (filterValue === 'all') {
        displayOrders(currentOrders);
    } else {
        const filtered = currentOrders.filter(order => order.status === filterValue);
        displayOrders(filtered);
    }
}

async function updateOrderStatus(orderNumber, newStatus) {
    try {
        const response = await fetch(`${API_URL}/orders/${orderNumber}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Order status updated successfully', 'success');
            await loadOrders();
            await loadStats(); // Refresh stats
        } else {
            showNotification(data.message || 'Failed to update status', 'error');
        }
    } catch (error) {
        console.error('Error updating order status:', error);
        showNotification('Error updating order status', 'error');
    }
}

function viewOrderDetail(orderNumber) {
    const order = currentOrders.find(o => o.orderNumber === orderNumber);
    
    if (!order) {
        showNotification('Order not found', 'error');
        return;
    }
    
    const modalBody = document.getElementById('orderModalBody');
    modalBody.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h3>Order: ${order.orderNumber}</h3>
            <p><strong>Status:</strong> <span class="status-badge status-${order.status}">${order.status}</span></p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h4>Customer Information</h4>
            <p><strong>Name:</strong> ${order.customerName}</p>
            <p><strong>Phone:</strong> ${order.customerPhone}</p>
            <p><strong>Email:</strong> ${order.customerEmail || '-'}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h4>Delivery Information</h4>
            <p><strong>Address:</strong> ${order.deliveryAddress}</p>
            <p><strong>Date:</strong> ${order.deliveryDate}</p>
            <p><strong>Time:</strong> ${order.deliveryTime}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h4>Order Items</h4>
            ${order.items ? order.items.map(item => `
                <div style="padding: 10px; background: #f8f9fa; margin-bottom: 10px; border-radius: 8px;">
                    <strong>${item.name}</strong><br>
                    ${item.quantity} x ${formatCurrency(item.price)} = ${formatCurrency(item.price * item.quantity)}
                </div>
            `).join('') : '<p>No items</p>'}
        </div>
        
        <div style="padding: 15px; background: #f8f9fa; border-radius: 8px;">
            <p><strong>Subtotal:</strong> ${formatCurrency(order.subtotal)}</p>
            <p><strong>Delivery Fee:</strong> ${formatCurrency(order.deliveryFee || 0)}</p>
            <h3><strong>Total:</strong> ${formatCurrency(order.total)}</h3>
        </div>
        
        ${order.notes ? `
            <div style="margin-top: 20px;">
                <h4>Notes</h4>
                <p style="padding: 10px; background: #fff3cd; border-radius: 8px;">${order.notes}</p>
            </div>
        ` : ''}
    `;
    
    document.getElementById('orderModal').classList.add('active');
}

function closeOrderModal() {
    document.getElementById('orderModal').classList.remove('active');
}

// ================================================
// MENU MANAGEMENT
// ================================================

async function loadMenu() {
    try {
        // Load from API
        const response = await fetch(`${API_URL}/menu`);
        const data = await response.json();
        let menuFromAPI = data.data || [];
        
        // Load from localStorage (custom admin menu)
        const menuFromStorage = JSON.parse(localStorage.getItem('adminMenu')) || [];
        
        // Merge both (localStorage takes priority for duplicates)
        const mergedMenu = [...menuFromAPI];
        menuFromStorage.forEach(storageItem => {
            const exists = mergedMenu.find(m => m.id === storageItem.id);
            if (!exists) {
                mergedMenu.push(storageItem);
            } else {
                // Replace with localStorage version
                const index = mergedMenu.findIndex(m => m.id === storageItem.id);
                mergedMenu[index] = storageItem;
            }
        });
        
        currentMenu = mergedMenu;
        displayMenu(currentMenu);
    } catch (error) {
        console.error('Error loading menu:', error);
        showNotification('Error loading menu', 'error');
    }
}

function displayMenu(menu) {
    const container = document.getElementById('menuGrid');
    
    if (menu.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;grid-column:1/-1;">No menu items found</p>';
        return;
    }
    
    container.innerHTML = menu.map(item => `
        <div class="menu-card">
            <div class="menu-card-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            </div>
            <div class="menu-card-content">
                <span class="menu-card-category">${getCategoryName(item.category)}</span>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-card-price">${formatCurrency(item.price)}</div>
                <div class="menu-card-actions">
                    <button class="btn btn-sm btn-primary" onclick="editMenu(${item.id})">
                        ✏️ Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteMenu(${item.id})">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const names = {
        'nasi-box': 'Nasi Box',
        'tumpeng': 'Tumpeng',
        'prasmanan': 'Prasmanan',
        'snack': 'Snack'
    };
    return names[category] || category;
}

function showAddMenuModal() {
    editingMenuId = null;
    document.getElementById('menuModalTitle').textContent = 'Add New Menu';
    document.getElementById('menuForm').reset();
    document.getElementById('menuId').value = '';
    document.getElementById('menuModal').classList.add('active');
}

function editMenu(menuId) {
    const menu = currentMenu.find(m => m.id === menuId);
    
    if (!menu) {
        showNotification('Menu not found', 'error');
        return;
    }
    
    editingMenuId = menuId;
    document.getElementById('menuModalTitle').textContent = 'Edit Menu';
    document.getElementById('menuId').value = menu.id;
    document.getElementById('menuName').value = menu.name;
    document.getElementById('menuCategory').value = menu.category;
    document.getElementById('menuPrice').value = menu.price;
    document.getElementById('menuDescription').value = menu.description;
    document.getElementById('menuImage').value = menu.image;
    
    document.getElementById('menuModal').classList.add('active');
}

async function handleMenuSubmit(event) {
    event.preventDefault();
    
    const menuData = {
        name: document.getElementById('menuName').value,
        category: document.getElementById('menuCategory').value,
        price: parseInt(document.getElementById('menuPrice').value),
        description: document.getElementById('menuDescription').value,
        image: document.getElementById('menuImage').value
    };
    
    try {
        let response;
        
        if (editingMenuId) {
            // Update existing menu via API
            response = await fetch(`${API_URL}/menu/${editingMenuId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(menuData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                showNotification('Menu updated successfully', 'success');
            } else {
                // Fallback to localStorage
                const menuFromStorage = JSON.parse(localStorage.getItem('adminMenu')) || [];
                const index = menuFromStorage.findIndex(m => m.id === editingMenuId);
                
                if (index !== -1) {
                    menuFromStorage[index] = { ...menuData, id: editingMenuId };
                } else {
                    const currentIndex = currentMenu.findIndex(m => m.id === editingMenuId);
                    if (currentIndex !== -1) {
                        currentMenu[currentIndex] = { ...menuData, id: editingMenuId };
                    }
                    menuFromStorage.push({ ...menuData, id: editingMenuId });
                }
                
                localStorage.setItem('adminMenu', JSON.stringify(menuFromStorage));
                showNotification('Menu updated (saved locally)', 'success');
            }
        } else {
            // Add new menu via API
            response = await fetch(`${API_URL}/menu`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(menuData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                showNotification('Menu added successfully', 'success');
            } else {
                // Fallback to localStorage
                const menuFromStorage = JSON.parse(localStorage.getItem('adminMenu')) || [];
                const newMenu = { ...menuData, id: Date.now() };
                menuFromStorage.push(newMenu);
                localStorage.setItem('adminMenu', JSON.stringify(menuFromStorage));
                showNotification('Menu added (saved locally)', 'success');
            }
        }
        
        await loadMenu();
        closeMenuModal();
    } catch (error) {
        console.error('Error saving menu:', error);
        
        // Fallback to localStorage
        const menuFromStorage = JSON.parse(localStorage.getItem('adminMenu')) || [];
        
        if (editingMenuId) {
            const index = menuFromStorage.findIndex(m => m.id === editingMenuId);
            if (index !== -1) {
                menuFromStorage[index] = { ...menuData, id: editingMenuId };
            } else {
                menuFromStorage.push({ ...menuData, id: editingMenuId });
            }
        } else {
            menuFromStorage.push({ ...menuData, id: Date.now() });
        }
        
        localStorage.setItem('adminMenu', JSON.stringify(menuFromStorage));
        showNotification('Menu saved locally', 'warning');
        
        await loadMenu();
        closeMenuModal();
    }
}

async function deleteMenu(menuId) {
    if (!confirm('Are you sure you want to delete this menu item?')) {
        return;
    }
    
    try {
        // Try to delete via API first
        const response = await fetch(`${API_URL}/menu/${menuId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Menu deleted successfully', 'success');
        } else {
            // Fallback to localStorage
            const menuFromStorage = JSON.parse(localStorage.getItem('adminMenu')) || [];
            const updatedMenu = menuFromStorage.filter(m => m.id !== menuId);
            localStorage.setItem('adminMenu', JSON.stringify(updatedMenu));
            showNotification('Menu deleted (from local storage)', 'success');
        }
        
        // Remove from currentMenu
        currentMenu = currentMenu.filter(m => m.id !== menuId);
        
        displayMenu(currentMenu);
        await loadMenu(); // Reload to sync
    } catch (error) {
        console.error('Error deleting menu:', error);
        
        // Fallback to localStorage
        const menuFromStorage = JSON.parse(localStorage.getItem('adminMenu')) || [];
        const updatedMenu = menuFromStorage.filter(m => m.id !== menuId);
        localStorage.setItem('adminMenu', JSON.stringify(updatedMenu));
        
        currentMenu = currentMenu.filter(m => m.id !== menuId);
        displayMenu(currentMenu);
        
        showNotification('Menu deleted (from local storage)', 'warning');
    }
}

function closeMenuModal() {
    document.getElementById('menuModal').classList.remove('active');
    editingMenuId = null;
}

// ================================================
// USER MANAGEMENT
// ================================================

async function loadUsers() {
    try {
        // Load from localStorage (since we use JSON files)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        currentUsers = users;
        
        displayUsers(users);
    } catch (error) {
        console.error('Error loading users:', error);
        showNotification('Error loading users', 'error');
    }
}

function displayUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#999;">No users found</td></tr>';
        return;
    }
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id || '-'}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${formatDate(user.createdAt)}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.email}')">
                    🗑️ Delete
                </button>
            </td>
        </tr>
    `).join('');
}

function searchUsers() {
    const query = document.getElementById('userSearch').value.toLowerCase();
    
    if (query === '') {
        displayUsers(currentUsers);
        return;
    }
    
    const filtered = currentUsers.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.includes(query)
    );
    
    displayUsers(filtered);
}

function deleteUser(email) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }
    
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        showNotification('User deleted successfully', 'success');
        loadUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
        showNotification('Error deleting user', 'error');
    }
}

// ================================================
// REPORTS
// ================================================

async function loadReports() {
    try {
        await loadCategoryRevenue();
        await loadStatusDistribution();
    } catch (error) {
        console.error('Error loading reports:', error);
        showNotification('Error loading reports', 'error');
    }
}

async function loadCategoryRevenue() {
    try {
        const ordersResponse = await fetch(`${API_URL}/orders`);
        const ordersData = await ordersResponse.json();
        const orders = ordersData.data || [];
        
        // Calculate revenue by category
        const categoryRevenue = {};
        
        orders.forEach(order => {
            if (order.items && order.status === 'completed') {
                order.items.forEach(item => {
                    const category = item.category || 'other';
                    if (categoryRevenue[category]) {
                        categoryRevenue[category] += item.price * item.quantity;
                    } else {
                        categoryRevenue[category] = item.price * item.quantity;
                    }
                });
            }
        });
        
        const container = document.getElementById('categoryChart');
        const total = Object.values(categoryRevenue).reduce((sum, val) => sum + val, 0);
        
        if (total === 0) {
            container.innerHTML = '<p style="color:#999;">No data available</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="chart-bar" style="width:100%;">
                ${Object.entries(categoryRevenue).map(([category, revenue]) => {
                    const percentage = ((revenue / total) * 100).toFixed(1);
                    return `
                        <div class="chart-bar-item">
                            <div class="chart-bar-label">${getCategoryName(category)}</div>
                            <div class="chart-bar-track">
                                <div class="chart-bar-fill" style="width: ${percentage}%"></div>
                            </div>
                            <div class="chart-bar-value">${formatCurrency(revenue)}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    } catch (error) {
        console.error('Error loading category revenue:', error);
    }
}

async function loadStatusDistribution() {
    try {
        const response = await fetch(`${API_URL}/orders`);
        const data = await response.json();
        const orders = data.data || [];
        
        // Count by status
        const statusCount = {};
        orders.forEach(order => {
            const status = order.status || 'unknown';
            statusCount[status] = (statusCount[status] || 0) + 1;
        });
        
        const container = document.getElementById('statusChart');
        const total = orders.length;
        
        if (total === 0) {
            container.innerHTML = '<p style="color:#999;">No data available</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="chart-bar" style="width:100%;">
                ${Object.entries(statusCount).map(([status, count]) => {
                    const percentage = ((count / total) * 100).toFixed(1);
                    return `
                        <div class="chart-bar-item">
                            <div class="chart-bar-label">${status}</div>
                            <div class="chart-bar-track">
                                <div class="chart-bar-fill" style="width: ${percentage}%"></div>
                            </div>
                            <div class="chart-bar-value">${count} (${percentage}%)</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    } catch (error) {
        console.error('Error loading status distribution:', error);
    }
}

// ================================================
// UTILITY FUNCTIONS
// ================================================

function formatCurrency(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notificationMessage');
    
    notification.className = `notification ${type} show`;
    messageElement.textContent = message;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3500);
}

// ================================================
// INITIALIZE ON PAGE LOAD
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    displayAdminInfo();
    
    // Load initial data
    loadDashboardData();
    
    // Load menu from localStorage and merge with API
    try {
        const savedMenu = JSON.parse(localStorage.getItem('adminMenu')) || [];
        if (savedMenu.length > 0) {
            currentMenu = [...currentMenu, ...savedMenu];
        }
    } catch (error) {
        console.error('Error loading saved menu:', error);
    }
    
    // Close modals when clicking outside
    window.onclick = function(event) {
        const orderModal = document.getElementById('orderModal');
        const menuModal = document.getElementById('menuModal');
        
        if (event.target === orderModal) {
            closeOrderModal();
        }
        if (event.target === menuModal) {
            closeMenuModal();
        }
    };
});
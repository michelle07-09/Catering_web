const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Database files (JSON-based untuk simplicity)
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const MENU_FILE = path.join(DATA_DIR, 'menu.json');

// Initialize data directory
async function initializeDataDir() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        
        // Initialize users file
        try {
            await fs.access(USERS_FILE);
        } catch {
            await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2));
        }
        
        // Initialize orders file
        try {
            await fs.access(ORDERS_FILE);
        } catch {
            await fs.writeFile(ORDERS_FILE, JSON.stringify([], null, 2));
        }
        
        // Initialize menu file with default data
        try {
            await fs.access(MENU_FILE);
        } catch {
            const defaultMenu = [
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
                }
            ];
            await fs.writeFile(MENU_FILE, JSON.stringify(defaultMenu, null, 2));
        }
        
        console.log('✅ Data directory initialized');
    } catch (error) {
        console.error('❌ Error initializing data directory:', error);
    }
}

// Helper functions for reading/writing JSON files
async function readJSON(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return [];
    }
}

async function writeJSON(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error writing ${filePath}:`, error);
        return false;
    }
}

// ============================================
// MIDDLEWARE
// ============================================

// Simple auth middleware (for demo - use JWT in production)
function requireAuth(req, res, next) {
    // In production, verify JWT token from header
    // For now, we rely on client-side authentication
    next();
}

// Admin-only middleware
function requireAdmin(req, res, next) {
    // In production, verify JWT token and check role
    // For now, we rely on client-side authentication
    next();
}

// ============================================
// API ROUTES
// ============================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'FoodExpress API is running' });
});

// ============================================
// MENU ROUTES
// ============================================

// Get all menu items
app.get('/api/menu', async (req, res) => {
    try {
        const menu = await readJSON(MENU_FILE);
        res.json({ success: true, data: menu });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching menu' });
    }
});

// Get menu by category
app.get('/api/menu/category/:category', async (req, res) => {
    try {
        const menu = await readJSON(MENU_FILE);
        const filtered = menu.filter(item => item.category === req.params.category);
        res.json({ success: true, data: filtered });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching menu' });
    }
});

// Get single menu item
app.get('/api/menu/:id', async (req, res) => {
    try {
        const menu = await readJSON(MENU_FILE);
        const item = menu.find(m => m.id === parseInt(req.params.id));
        
        if (!item) {
            return res.status(404).json({ success: false, message: 'Menu not found' });
        }
        
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching menu item' });
    }
});

// Add new menu item (ADMIN)
app.post('/api/menu', async (req, res) => {
    try {
        const { name, category, price, description, image } = req.body;
        
        // Validation
        if (!name || !category || !price || !description) {
            return res.status(400).json({ 
                success: false, 
                message: 'Semua field wajib diisi' 
            });
        }
        
        const menu = await readJSON(MENU_FILE);
        
        // Generate new ID
        const newId = menu.length > 0 ? Math.max(...menu.map(m => m.id)) + 1 : 1;
        
        const newMenuItem = {
            id: newId,
            name,
            category,
            price: parseInt(price),
            description,
            image: image || 'https://via.placeholder.com/400x300?text=No+Image'
        };
        
        menu.push(newMenuItem);
        await writeJSON(MENU_FILE, menu);
        
        res.status(201).json({ 
            success: true, 
            message: 'Menu berhasil ditambahkan',
            data: newMenuItem
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding menu item' });
    }
});

// Update menu item (ADMIN)
app.put('/api/menu/:id', async (req, res) => {
    try {
        const { name, category, price, description, image } = req.body;
        const menuId = parseInt(req.params.id);
        
        const menu = await readJSON(MENU_FILE);
        const menuIndex = menu.findIndex(m => m.id === menuId);
        
        if (menuIndex === -1) {
            return res.status(404).json({ 
                success: false, 
                message: 'Menu tidak ditemukan' 
            });
        }
        
        // Update menu item
        menu[menuIndex] = {
            ...menu[menuIndex],
            name: name || menu[menuIndex].name,
            category: category || menu[menuIndex].category,
            price: price ? parseInt(price) : menu[menuIndex].price,
            description: description || menu[menuIndex].description,
            image: image || menu[menuIndex].image
        };
        
        await writeJSON(MENU_FILE, menu);
        
        res.json({ 
            success: true, 
            message: 'Menu berhasil diupdate',
            data: menu[menuIndex]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating menu item' });
    }
});

// Delete menu item (ADMIN)
app.delete('/api/menu/:id', async (req, res) => {
    try {
        const menuId = parseInt(req.params.id);
        
        const menu = await readJSON(MENU_FILE);
        const menuIndex = menu.findIndex(m => m.id === menuId);
        
        if (menuIndex === -1) {
            return res.status(404).json({ 
                success: false, 
                message: 'Menu tidak ditemukan' 
            });
        }
        
        // Remove menu item
        const deletedItem = menu.splice(menuIndex, 1)[0];
        await writeJSON(MENU_FILE, menu);
        
        res.json({ 
            success: true, 
            message: 'Menu berhasil dihapus',
            data: deletedItem
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting menu item' });
    }
});

// Search menu
app.get('/api/menu/search/:query', async (req, res) => {
    try {
        const menu = await readJSON(MENU_FILE);
        const query = req.params.query.toLowerCase();
        const filtered = menu.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)
        );
        res.json({ success: true, data: filtered });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error searching menu' });
    }
});

// ============================================
// USER ROUTES
// ============================================

// Register user (customer)
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;
        
        // Validation
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Semua field wajib diisi' 
            });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Format email tidak valid' 
            });
        }
        
        // Password length validation
        if (password.length < 6) {
            return res.status(400).json({ 
                success: false, 
                message: 'Password minimal 6 karakter' 
            });
        }
        
        const users = await readJSON(USERS_FILE);
        
        // Check if email already exists
        if (users.some(u => u.email === email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email sudah terdaftar' 
            });
        }
        
        // Create new user
        const newUser = {
            id: users.length + 1,
            name,
            email,
            phone,
            password, // In production, use bcrypt to hash password
            role: role || 'user', // Default to 'user' if not specified
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        await writeJSON(USERS_FILE, users);
        
        // Don't send password back
        const { password: _, ...userWithoutPassword } = newUser;
        
        res.status(201).json({ 
            success: true, 
            message: 'Registrasi berhasil',
            data: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering user' });
    }
});

// Get all users (ADMIN)
app.get('/api/users', async (req, res) => {
    try {
        const users = await readJSON(USERS_FILE);
        
        // Remove passwords from response
        const usersWithoutPasswords = users.map(({ password, ...user }) => user);
        
        res.json({ 
            success: true, 
            data: usersWithoutPasswords
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email dan password wajib diisi' 
            });
        }
        
        const users = await readJSON(USERS_FILE);
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Email atau password salah' 
            });
        }
        
        // Check role if specified
        if (role && user.role !== role) {
            return res.status(403).json({ 
                success: false, 
                message: `Access denied! ${role === 'admin' ? 'Admin' : 'User'} only.` 
            });
        }
        
        // Don't send password back
        const { password: _, ...userWithoutPassword } = user;
        
        res.json({ 
            success: true, 
            message: 'Login berhasil',
            data: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error logging in' });
    }
});

// Register admin (with admin code verification)
app.post('/api/auth/admin/register', async (req, res) => {
    try {
        const { name, email, phone, password, adminCode } = req.body;
        
        // Validation
        if (!name || !email || !phone || !password || !adminCode) {
            return res.status(400).json({ 
                success: false, 
                message: 'Semua field wajib diisi' 
            });
        }
        
        // Verify admin code
        const ADMIN_CODE = process.env.ADMIN_CODE || 'ADMIN2025';
        if (adminCode !== ADMIN_CODE) {
            return res.status(403).json({ 
                success: false, 
                message: 'Kode admin salah!' 
            });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Format email tidak valid' 
            });
        }
        
        // Password length validation
        if (password.length < 6) {
            return res.status(400).json({ 
                success: false, 
                message: 'Password minimal 6 karakter' 
            });
        }
        
        const users = await readJSON(USERS_FILE);
        
        // Check if email already exists
        if (users.some(u => u.email === email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email sudah terdaftar' 
            });
        }
        
        // Create new admin
        const newAdmin = {
            id: users.length + 1,
            name,
            email,
            phone,
            password, // In production, use bcrypt
            role: 'admin', // Set role as admin
            createdAt: new Date().toISOString()
        };
        
        users.push(newAdmin);
        await writeJSON(USERS_FILE, users);
        
        // Don't send password back
        const { password: _, ...adminWithoutPassword } = newAdmin;
        
        res.status(201).json({ 
            success: true, 
            message: 'Registrasi admin berhasil',
            data: adminWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering admin' });
    }
});

// Admin login
app.post('/api/auth/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email dan password wajib diisi' 
            });
        }
        
        const users = await readJSON(USERS_FILE);
        const admin = users.find(u => 
            u.email === email && 
            u.password === password && 
            u.role === 'admin'
        );
        
        if (!admin) {
            return res.status(401).json({ 
                success: false, 
                message: 'Email/password salah atau Anda bukan admin!' 
            });
        }
        
        // Don't send password back
        const { password: _, ...adminWithoutPassword } = admin;
        
        res.json({ 
            success: true, 
            message: 'Login admin berhasil',
            data: adminWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error logging in as admin' });
    }
});

// Verify admin code (optional endpoint)
app.post('/api/auth/admin/verify-code', async (req, res) => {
    try {
        const { code } = req.body;
        
        if (!code) {
            return res.status(400).json({ 
                success: false, 
                message: 'Kode wajib diisi' 
            });
        }
        
        const ADMIN_CODE = process.env.ADMIN_CODE || 'ADMIN2025';
        
        if (code === ADMIN_CODE) {
            res.json({ 
                success: true, 
                message: 'Kode admin valid' 
            });
        } else {
            res.status(403).json({ 
                success: false, 
                message: 'Kode admin salah' 
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error verifying code' });
    }
});

// ============================================
// ORDER ROUTES
// ============================================

// Create order
app.post('/api/orders', async (req, res) => {
    try {
        const orderData = req.body;
        
        // Validation
        if (!orderData.customerName || !orderData.customerPhone || 
            !orderData.deliveryAddress || !orderData.items || 
            orderData.items.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Data pesanan tidak lengkap' 
            });
        }
        
        const orders = await readJSON(ORDERS_FILE);
        
        // Generate order number
        const orderNumber = 'FE' + Date.now();
        
        const newOrder = {
            id: orders.length + 1,
            orderNumber,
            ...orderData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        
        orders.push(newOrder);
        await writeJSON(ORDERS_FILE, orders);
        
        res.status(201).json({ 
            success: true, 
            message: 'Pesanan berhasil dibuat',
            data: newOrder
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating order' });
    }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await readJSON(ORDERS_FILE);
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
});

// Get order by order number
app.get('/api/orders/:orderNumber', async (req, res) => {
    try {
        const orders = await readJSON(ORDERS_FILE);
        const order = orders.find(o => o.orderNumber === req.params.orderNumber);
        
        if (!order) {
            return res.status(404).json({ 
                success: false, 
                message: 'Pesanan tidak ditemukan' 
            });
        }
        
        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching order' });
    }
});

// Update order status
app.patch('/api/orders/:orderNumber/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!status) {
            return res.status(400).json({ 
                success: false, 
                message: 'Status wajib diisi' 
            });
        }
        
        const orders = await readJSON(ORDERS_FILE);
        const orderIndex = orders.findIndex(o => o.orderNumber === req.params.orderNumber);
        
        if (orderIndex === -1) {
            return res.status(404).json({ 
                success: false, 
                message: 'Pesanan tidak ditemukan' 
            });
        }
        
        orders[orderIndex].status = status;
        orders[orderIndex].updatedAt = new Date().toISOString();
        
        await writeJSON(ORDERS_FILE, orders);
        
        res.json({ 
            success: true, 
            message: 'Status pesanan berhasil diupdate',
            data: orders[orderIndex]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating order status' });
    }
});

// ============================================
// SERVE FRONTEND
// ============================================

// Serve frontend pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Endpoint not found' 
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
});

// ============================================
// START SERVER
// ============================================

async function startServer() {
    await initializeDataDir();
    
    app.listen(PORT, () => {
        console.log('');
        console.log('🍽️  FoodExpress Catering API');
        console.log('================================');
        console.log(`✅ Server running on http://localhost:${PORT}`);
        console.log(`✅ API endpoint: http://localhost:${PORT}/api`);
        console.log(`✅ Frontend: http://localhost:${PORT}`);
        console.log('================================');
        console.log('');
    });
}

startServer();

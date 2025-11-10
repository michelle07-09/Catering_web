// =======================================================================
// === BAGIAN INISIALISASI DAN MIDDELEWARE (ANTI-ERROR) ===
// =======================================================================

const express = require('express');
const cors = require('cors');
const app = express(); 

// Variabel Domain Frontend Anda (Netlify) untuk CORS
const frontendDomain = 'https://musical-lokum-072f1c.netlify.app';

const corsOptions = {
  origin: frontendDomain,
  optionsSuccessStatus: 200 
};

// Terapkan Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Gunakan port dari Render (process.env.PORT) atau port cadangan
const PORT = process.env.PORT || 3000; 

// =======================================================================
// === KODE ROUTE API ASLI (TEMPATKAN KODE ANDA DI SINI) ===
// =======================================================================

// --- ROUTE DASAR (Fixes "Cannot GET /") ---
app.get('/', (req, res) => {
    res.send('FoodExpress API is running successfully and CORS is configured!');
});

// ❗ TEMPELKAN SEMUA KODE ROUTE (app.get, app.post, dll.) ASLI ANDA DI BAWAH INI

// Contoh Route Login/Menu:
/*
app.post('/api/login', (req, res) => {
    // Logic login Anda
});

app.get('/api/menu', (req, res) => {
    // Logic mendapatkan menu
});
*/

// JANGAN SAMPAI ADA BARIS const express = require('express'); YANG TERBAWA DI SINI!

// =======================================================================
// === BAGIAN LISTEN SERVER (AKHIR FILE) ===
// =======================================================================

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
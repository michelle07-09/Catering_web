// =======================================================================
// === BAGIAN INI ANTI-ERROR (PASTIKAN TIDAK ADA DUPLIKASI DI SINI) ===
// =======================================================================

const express = require('express');
const cors = require('cors'); 
// Definisi app HANYA SATU KALI
const app = express(); 

// 1. URL Frontend Anda di Netlify (UNTUK CORS ORIGIN)
const frontendDomain = 'https://musical-lokum-072f1c.netlify.app';

// Konfigurasi CORS
const corsOptions = {
  // Hanya izinkan domain Netlify ini
  origin: frontendDomain,
  optionsSuccessStatus: 200 
};

// Terapkan Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Gunakan port dari Render (process.env.PORT) atau port cadangan 3000
const PORT = process.env.PORT || 3000; 

// =======================================================================
// === TEMPATKAN SEMUA KODE ROUTE (API LOGIC) ANDA DI BAWAH GARIS INI ===
// =======================================================================

// ❗ TEMPELKAN SEMUA KODE ROUTE (app.get, app.post, app.put, dll.) ASLI ANDA DI SINI
// 
// CONTOH:
// app.get('/api/menu', (req, res) => {
//     // Logic untuk mendapatkan daftar menu
//     res.json(menu);
// });
//
// app.post('/api/login', (req, res) => {
//     // Logic untuk proses login
//     // ...
// });

// JANGAN SAMPAI ADA BARIS const express = require('express'); YANG TERBAWA DI SINI!

// =======================================================================
// === BAGIAN INI UNTUK MENJALANKAN SERVER (PASTIKAN DI AKHIR FILE) ===
// =======================================================================

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});

// =======================================================================
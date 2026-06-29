# DigiDesa Ngentak (Poncosari, Bantul)

Portal digital kependudukan dan monografi Dusun Ngentak, Kalurahan Poncosari, Srandakan, Bantul, D.I. Yogyakarta. Web ini dirancang secara khusus untuk mempermudah akses informasi monografi wilayah secara terbuka sekaligus melindungi data pribadi sensitif warga.

## 🌟 Fitur Utama

1. **Halaman Monografi Terbuka (Viewer Publik)**:
   - Statistik Kependudukan (Total Warga, Laki-laki, Perempuan, RT, dan UMKM).
   - Diagram Distribusi Kelompok Usia & Proporsi Gender (Render dinamis menggunakan HTML & CSS murni).
   - Kabar Kegiatan & Warta Dusun.
2. **Katalog UMKM Dusun**:
   - Showcase produk lokal (Kuliner, Kerajinan, Jasa, Pertanian).
   - Fitur Filter Kategori & Pencarian Teks dinamis.
   - Tombol integrasi **Hubungi WhatsApp** langsung ke pemilik usaha.
3. **Portal Admin Keamanan Tinggi (Simulasi)**:
   - Login admin terproteksi.
   - **Tabel Basis Data Kependudukan**: Menampilkan biodata lengkap serta nomor **NIK (Nomor Induk Kependudukan)** warga yang disembunyikan dari publik.
   - **CRUD Warga & UMKM**: Tambah, ubah, dan hapus data warga atau promosi UMKM secara instan.
   - **Sinkronisasi Dinamis**: Grafik dan statistik monografi di halaman depan berubah otomatis ketika admin memperbarui basis data.
   - **Penyimpanan Lokal (localStorage)**: Menjaga perubahan data tetap tersimpan secara aman di browser saat direfresh.
4. **Ekspor Data Offline**:
   - Fitur unduh basis data kependudukan ke format **CSV** (ramah Excel) dan format **JSON** untuk keperluan backup desa.

---

## 🛠️ Teknologi & Jalankan Project

### Teknologi
- **HTML5** & **CSS3** (Desain responsif, modern, bertema *emerald/dark*, glassmorphism).
- **Vanilla JavaScript ES6+** (Tanpa framework/library berat untuk menjamin performa super cepat dan kemampuan dijalankan offline).
- **FontAwesome Icons** (CDN).
- **Google Fonts** (Plus Jakarta Sans).

### Cara Menjalankan Project Secara Lokal
Karena proyek ini dibuat menggunakan teknologi *zero-dependency* (tanpa dependensi berat), Anda tidak perlu melakukan instalasi `npm install` atau konfigurasi database server rumit.

1. Buka folder proyek di Text Editor / VS Code Anda.
2. Klik dua kali pada file **`index.html`** untuk membukanya secara langsung di browser apa saja.
3. *Rekomendasi*: Klik kanan pada `index.html` di VS Code lalu pilih **Open with Live Server** untuk mendapatkan pengalaman pembaruan halaman otomatis saat coding.

---

## 🔑 Kredensial Demo Admin
Untuk mengakses fitur pengelolaan data kependudukan dan NIK:
- **Username**: `admin`
- **Password**: `admin123`

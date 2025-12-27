# 🧪 Testing Guide - Perpustakaan Digital

Panduan untuk menguji semua fitur aplikasi perpustakaan digital sebelum publikasi.

## 🔐 Akun Demo untuk Testing

Untuk mempermudah testing, gunakan akun demo yang sudah disediakan:

**Admin Demo:**
- Email: `admin@perpustakaandigital.com`
- Password: `Demo123!Admin`
- Role: Admin (memiliki badge khusus)

**Pembaca Demo:**
- Email: `pembaca@perpustakaandigital.com`
- Password: `Demo123!Pembaca`
- Role: Reader (pembaca standar)

**Cara Membuat Akun Demo:** Lihat [DEMO_ACCOUNTS.md](./DEMO_ACCOUNTS.md) untuk instruksi lengkap.

---

## ✅ Checklist Testing

### 1. Autentikasi - Signup (Email & Password)

**Test Case: Signup dengan Email Baru**
- [ ] Klik "Daftar" di halaman login
- [ ] Isi form:
  - Nama: "Test User"
  - Email: "testuser@example.com"
  - Password: "password123"
  - Confirm Password: "password123"
- [ ] Klik "Daftar"
- [ ] **Expected**: Toast success "Akun berhasil dibuat! Selamat datang, Test User!"
- [ ] **Expected**: Redirect ke halaman perpustakaan
- [ ] **Expected**: Nama "Test User" muncul di header

**Test Case: Signup dengan Email yang Sudah Ada**
- [ ] Logout
- [ ] Coba signup lagi dengan email yang sama
- [ ] **Expected**: Toast error "Email sudah terdaftar. Silakan login atau gunakan email lain."

**Test Case: Password Tidak Cocok**
- [ ] Isi form signup dengan password berbeda di confirm
- [ ] **Expected**: Alert "Password tidak cocok!"

**Test Case: Password Terlalu Pendek**
- [ ] Isi password dengan < 6 karakter
- [ ] **Expected**: Alert "Password harus minimal 6 karakter!"

---

### 2. Autentikasi - Login (Email & Password)

**Test Case: Login dengan Akun Valid**
- [ ] Logout dari aplikasi
- [ ] Di halaman login, isi:
  - Email: akun yang sudah dibuat
  - Password: password yang benar
- [ ] Klik "Masuk"
- [ ] **Expected**: Loading spinner muncul
- [ ] **Expected**: Toast success "Selamat datang, [Nama]!"
- [ ] **Expected**: Redirect ke perpustakaan

**Test Case: Login dengan Password Salah**
- [ ] Isi email benar, password salah
- [ ] Klik "Masuk"
- [ ] **Expected**: Toast error "Login gagal. Periksa email dan password Anda."

**Test Case: Login dengan Email Tidak Terdaftar**
- [ ] Isi email yang belum pernah signup
- [ ] **Expected**: Toast error dengan pesan kesalahan

---

### 3. Autentikasi - Google OAuth (Opsional)

⚠️ **Catatan**: Fitur ini memerlukan konfigurasi Google OAuth di Supabase terlebih dahulu.

**Test Case: Google Login Belum Dikonfigurasi**
- [ ] Klik "Login dengan Google"
- [ ] **Expected**: Toast error dengan instruksi setup

**Test Case: Google Login Sudah Dikonfigurasi**
- [ ] Setup Google OAuth di Supabase (ikuti SETUP_GOOGLE_AUTH.md)
- [ ] Klik "Login dengan Google"
- [ ] **Expected**: Redirect ke halaman Google
- [ ] Pilih akun Google
- [ ] **Expected**: Redirect kembali ke aplikasi
- [ ] **Expected**: User ter-login dengan nama dari Google

---

### 4. Session Management

**Test Case: Session Persistence**
- [ ] Login dengan akun valid
- [ ] Refresh halaman (F5)
- [ ] **Expected**: User tetap login
- [ ] **Expected**: Tidak diminta login ulang

**Test Case: Logout**
- [ ] Klik avatar/profile di header
- [ ] Klik "Logout"
- [ ] **Expected**: Toast "Berhasil logout"
- [ ] **Expected**: Redirect ke halaman login
- [ ] Refresh halaman
- [ ] **Expected**: Tetap di halaman login (tidak auto-login)

---

### 5. Halaman Perpustakaan

**Test Case: Welcome Banner**
- [ ] Login berhasil
- [ ] **Expected**: Banner "Selamat Datang, [Nama]! 👋"
- [ ] **Expected**: Tombol "Jelajahi Koleksi" terlihat jelas
- [ ] **Expected**: Tombol "Sedang Dibaca" terlihat jelas (sama style dengan Jelajahi)

**Test Case: Search Bar**
- [ ] Ketik "Pride" di search bar
- [ ] **Expected**: (Untuk implementasi future - saat ini visual only)

**Test Case: Category Navigation**
- [ ] Klik setiap kategori (Trending, Populer, Fiksi, dll)
- [ ] **Expected**: Badge menunjukkan jumlah buku
- [ ] **Expected**: Kategori aktif memiliki gradient indigo-purple

**Test Case: Book Cards**
- [ ] Scroll ke grid buku
- [ ] **Expected**: Cover image muncul untuk setiap buku
- [ ] **Expected**: Rating bintang terlihat
- [ ] **Expected**: Tombol "Baca Buku" ada di setiap card
- [ ] Hover pada card
- [ ] **Expected**: Shadow meningkat, image zoom

**Test Case: Favorite Toggle**
- [ ] Klik icon heart di book card
- [ ] **Expected**: Heart berubah merah (filled)
- [ ] **Expected**: Toast "[Judul Buku] ditambahkan ke favorit"
- [ ] Klik lagi
- [ ] **Expected**: Heart kembali outline
- [ ] **Expected**: Toast "[Judul Buku] dihapus dari favorit"

**Test Case: Stats Cards**
- [ ] Scroll ke bawah
- [ ] **Expected**: 4 stats cards terlihat
- [ ] **Expected**: Total Buku: 1,247
- [ ] **Expected**: Kategori: 5
- [ ] **Expected**: Pembaca Aktif: 1,892
- [ ] **Expected**: Akses: 24/7

---

### 6. Jelajahi Koleksi Page

**Test Case: Navigate to Collection**
- [ ] Klik "Jelajahi Koleksi" di banner
- [ ] **Expected**: Pindah ke halaman collection
- [ ] **Expected**: Semua 1,247+ buku terlihat (dengan pagination/scroll)

**Test Case: Search Function**
- [ ] Ketik "Alice" di search bar
- [ ] **Expected**: Hasil filter menampilkan buku Alice in Wonderland

**Test Case: Category Filter**
- [ ] Klik filter kategori "Fiksi"
- [ ] **Expected**: Hanya buku fiksi yang muncul

**Test Case: Back to Home**
- [ ] Klik logo/nama perpustakaan di header
- [ ] **Expected**: Kembali ke home page

---

### 7. Sedang Dibaca Page

**Test Case: Navigate to Reading Now**
- [ ] Klik "Sedang Dibaca" di banner
- [ ] **Expected**: Pindah ke halaman reading now
- [ ] **Expected**: List buku yang sedang dibaca

**Test Case: Progress Tracking**
- [ ] Lihat progress bar per buku
- [ ] **Expected**: Progress percentage terlihat

---

### 8. Book Reader Page

**Test Case: Open Book**
- [ ] Dari home/collection, klik "Baca Buku"
- [ ] **Expected**: Pindah ke reader page
- [ ] **Expected**: Cover buku besar terlihat
- [ ] **Expected**: Informasi buku (judul, penulis, tahun, rating)
- [ ] **Expected**: Preview konten buku

**Test Case: Add to Reading**
- [ ] Klik "Tambah ke Sedang Dibaca"
- [ ] **Expected**: Toast success
- [ ] Navigate ke "Sedang Dibaca"
- [ ] **Expected**: Buku muncul di list

---

### 9. Profile & Settings

**Test Case: View Profile**
- [ ] Klik avatar di header
- [ ] Klik "Profil"
- [ ] **Expected**: Profil page terbuka
- [ ] **Expected**: Nama dan email terlihat
- [ ] **Expected**: Member since date terlihat
- [ ] **Expected**: Books read count terlihat

**Test Case: Role Badge - Admin**
- [ ] Login dengan akun admin (`admin@perpustakaandigital.com`)
- [ ] Navigate ke halaman profil
- [ ] **Expected**: Badge "Member Aktif" terlihat
- [ ] **Expected**: Badge "Admin" dengan icon Shield terlihat
- [ ] **Expected**: Badge admin memiliki gradient amber-orange

**Test Case: Role Badge - Reader**
- [ ] Login dengan akun pembaca (`pembaca@perpustakaandigital.com`)
- [ ] Navigate ke halaman profil
- [ ] **Expected**: Badge "Member Aktif" terlihat
- [ ] **Expected**: Tidak ada badge "Admin"

**Test Case: Edit Profile**
- [ ] Klik "Edit Profil"
- [ ] Ubah nama
- [ ] Klik "Save"
- [ ] **Expected**: Toast "Profil berhasil diperbarui"
- [ ] **Expected**: Nama di header berubah

**Test Case: Settings**
- [ ] Navigate ke Settings
- [ ] **Expected**: Settings options terlihat

---

### 10. Responsive Design

**Test Case: Mobile View**
- [ ] Resize browser ke lebar < 768px
- [ ] **Expected**: Layout berubah ke mobile-friendly
- [ ] **Expected**: Navigation burger menu muncul
- [ ] **Expected**: Cards stack vertically

**Test Case: Tablet View**
- [ ] Resize ke lebar 768px - 1024px
- [ ] **Expected**: Grid menyesuaikan (2 columns)

**Test Case: Desktop View**
- [ ] Resize ke lebar > 1024px
- [ ] **Expected**: Grid 3 columns
- [ ] **Expected**: Split screen login terlihat bagus

---

### 11. Performance & Loading

**Test Case: Initial Load**
- [ ] Clear cache
- [ ] Buka aplikasi
- [ ] **Expected**: Loading spinner muncul saat check session
- [ ] **Expected**: < 2 detik untuk load
- [ ] **Expected**: Images load progressively

**Test Case: Navigation Speed**
- [ ] Navigate antar halaman
- [ ] **Expected**: Instant page transitions
- [ ] **Expected**: No loading delays

---

### 12. Error Handling

**Test Case: Network Error Simulation**
- [ ] Matikan internet
- [ ] Coba login
- [ ] **Expected**: Toast error "Network error during sign in"
- [ ] Nyalakan internet kembali
- [ ] **Expected**: Bisa login normal

**Test Case: Session Expiry**
- [ ] (Advanced) Manually expire session token
- [ ] **Expected**: Auto redirect to login
- [ ] **Expected**: Toast notification

---

## 🐛 Known Issues & Limitations

Catat masalah yang ditemukan di sini:

1. ⚠️ **Email Auto-Confirmed**: Email tidak perlu verifikasi karena email server belum dikonfigurasi
2. ⚠️ **Static Book Data**: Buku dari file statis, bukan database
3. ⚠️ **Google OAuth**: Perlu setup manual di Supabase
4. ⚠️ **Image Fallback**: Beberapa cover buku mungkin gagal load
5. ⚠️ **Password Reset**: Belum diimplementasikan

---

## 📊 Test Results Template

Isi setelah testing:

**Tested By**: _________________
**Date**: _________________
**Browser**: _________________
**Device**: _________________

### Summary
- ✅ Total Tests Passed: ___/___
- ❌ Total Tests Failed: ___/___
- ⚠️ Issues Found: ___

### Critical Issues:
1. 
2. 
3. 

### Minor Issues:
1. 
2. 
3. 

### Notes:


---

**Selamat Testing! 🚀**
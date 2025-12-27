# 🔐 Akun Demo Perpustakaan Digital

Dokumen ini berisi informasi tentang akun demo yang tersedia untuk testing dan demonstrasi aplikasi perpustakaan digital.

## 📋 Daftar Akun Demo

### 1. Admin Demo
- **Email**: `admin@perpustakaandigital.com`
- **Password**: `Demo123!Admin`
- **Role**: Admin
- **Fitur Khusus**:
  - Badge "Admin" di profil
  - Statistik buku dibaca: 50 buku
  - Akses penuh ke semua fitur perpustakaan

### 2. Pembaca Demo
- **Email**: `pembaca@perpustakaandigital.com`
- **Password**: `Demo123!Pembaca`
- **Role**: Reader (Pembaca)
- **Fitur**:
  - Akun pembaca standar
  - Statistik buku dibaca: 15 buku
  - Akses ke fitur perpustakaan untuk pembaca

---

## 🚀 Cara Membuat Akun Demo

### Metode 1: Menggunakan Endpoint Seed (Otomatis)

Akun demo dapat dibuat secara otomatis dengan memanggil endpoint seed:

```bash
# Ganti YOUR_PROJECT_ID dengan project ID Supabase Anda
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-dd63e494/seed-demo-accounts \
  -H "Content-Type: application/json"
```

Endpoint ini akan:
- Membuat kedua akun demo jika belum ada
- Mengembalikan status untuk setiap akun (created/already_exists/error)
- Secara otomatis mengatur role dan data awal

**Response contoh:**
```json
{
  "success": true,
  "results": [
    {
      "email": "admin@perpustakaandigital.com",
      "status": "created",
      "role": "admin",
      "message": "Demo account created successfully"
    },
    {
      "email": "pembaca@perpustakaandigital.com",
      "status": "created",
      "role": "reader",
      "message": "Demo account created successfully"
    }
  ],
  "message": "Demo account seeding completed"
}
```

### Metode 2: Manual via Aplikasi

1. Buka aplikasi perpustakaan digital
2. Klik "Buat Akun Baru" di halaman login
3. Isi form dengan kredensial yang diinginkan:
   - Nama lengkap
   - Email
   - Password (minimal 6 karakter)
4. Klik "Daftar"

**Catatan**: Akun yang dibuat secara manual akan memiliki role "reader" secara default.

---

## 🎯 Cara Menggunakan Akun Demo

### Login dengan Akun Demo

1. Buka aplikasi perpustakaan digital
2. Masukkan email dan password dari salah satu akun demo di atas
3. Klik "Masuk"
4. Anda akan diarahkan ke halaman perpustakaan

### Menguji Fitur dengan Role Berbeda

**Sebagai Admin:**
- Login menggunakan akun admin
- Perhatikan badge "Admin" di halaman profil
- Eksplorasi semua fitur perpustakaan

**Sebagai Pembaca:**
- Login menggunakan akun pembaca
- Gunakan fitur-fitur standar perpustakaan
- Bandingkan dengan pengalaman admin

---

## 🔒 Keamanan Akun Demo

### Best Practices

1. **Jangan gunakan akun demo untuk data produksi**
   - Akun demo adalah untuk testing dan demonstrasi saja
   - Gunakan kredensial dummy atau data test

2. **Ganti password di production**
   - Password demo mudah ditebak
   - Untuk environment production, ganti password atau hapus akun demo

3. **Hapus akun demo setelah testing**
   ```bash
   # Hapus melalui Supabase Dashboard:
   # 1. Buka Supabase Dashboard
   # 2. Pilih project Anda
   # 3. Ke Authentication > Users
   # 4. Cari dan hapus user dengan email demo
   ```

### Environment Setup

Untuk environment yang berbeda:

**Development:**
- Gunakan akun demo dengan bebas
- Endpoint seed dapat dipanggil berkali-kali

**Staging:**
- Buat akun demo khusus staging jika diperlukan
- Gunakan password yang berbeda

**Production:**
- HAPUS atau NONAKTIFKAN endpoint seed-demo-accounts
- Hapus akun demo atau ganti dengan password yang kuat
- Gunakan akun real untuk testing

---

## 🛠️ Troubleshooting

### Akun Demo Tidak Bisa Login

**Kemungkinan Penyebab:**
1. Akun belum dibuat - jalankan endpoint seed
2. Password salah - pastikan menggunakan password yang benar
3. Email confirmation diperlukan - akun demo sudah dikonfirmasi otomatis

**Solusi:**
```bash
# Cek apakah akun ada di Supabase Dashboard
# Authentication > Users

# Jika tidak ada, jalankan endpoint seed lagi
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-dd63e494/seed-demo-accounts
```

### Akun Demo Sudah Ada (Error "already_exists")

Ini normal jika endpoint seed dipanggil lebih dari sekali. Akun demo tidak akan dibuat ulang.

### Role Tidak Muncul

1. Logout dari aplikasi
2. Login kembali
3. Periksa halaman profil untuk badge role

Jika masih tidak muncul:
- Pastikan server sudah di-deploy dengan kode terbaru
- Clear browser cache dan cookies
- Periksa browser console untuk error

---

## 📝 Data Akun Demo

### User Data Structure

```typescript
interface DemoUser {
  name: string;           // Nama lengkap
  email: string;          // Email unik
  password: string;       // Password (hashed di database)
  role: 'admin' | 'reader';  // Role user
  booksRead: number;      // Jumlah buku yang telah dibaca
  memberSince: string;    // Tanggal bergabung (ISO string)
  avatar: string;         // URL avatar (kosong untuk demo)
}
```

### Admin Demo Data
```json
{
  "name": "Admin Demo",
  "email": "admin@perpustakaandigital.com",
  "role": "admin",
  "booksRead": 50,
  "memberSince": "2025-12-26T...",
  "avatar": ""
}
```

### Pembaca Demo Data
```json
{
  "name": "Pembaca Demo",
  "email": "pembaca@perpustakaandigital.com",
  "role": "reader",
  "booksRead": 15,
  "memberSince": "2025-12-26T...",
  "avatar": ""
}
```

---

## 🔄 Reset Akun Demo

Untuk mereset akun demo ke kondisi awal:

1. **Hapus akun dari Supabase Dashboard**
   - Authentication > Users
   - Hapus user dengan email demo

2. **Jalankan endpoint seed lagi**
   ```bash
   curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-dd63e494/seed-demo-accounts
   ```

3. **Akun demo akan dibuat dengan data default**

---

## 📚 Resources

- [Main README](./README.md) - Dokumentasi utama aplikasi
- [Testing Guide](./TESTING_GUIDE.md) - Panduan testing aplikasi
- [Production Ready Checklist](./PRODUCTION_READY.md) - Checklist sebelum production
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Panduan deploy aplikasi

---

## ⚠️ Catatan Penting

1. **Akun demo bersifat publik** - Jangan simpan data sensitif
2. **Password mudah ditebak** - Hanya untuk demonstrasi
3. **Data dapat diubah oleh siapa saja** - Yang memiliki akses ke aplikasi
4. **Tidak untuk production use** - Hanya untuk testing dan demo

---

## 📞 Support

Jika mengalami masalah dengan akun demo:

1. Periksa dokumentasi di atas
2. Cek troubleshooting section
3. Review server logs di Supabase Dashboard
4. Pastikan semua environment variables sudah diset dengan benar

---

**Last Updated**: December 26, 2025

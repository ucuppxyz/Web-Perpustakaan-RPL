# 🚀 Quick Start - Akun Demo

Panduan cepat untuk langsung mencoba aplikasi perpustakaan digital menggunakan akun demo.

## 📝 Langkah Cepat

### 1️⃣ Buat Akun Demo (Sekali Saja)

Jalankan perintah ini untuk membuat akun demo secara otomatis:

```bash
# Ganti YOUR_PROJECT_ID dengan project ID Supabase Anda
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-dd63e494/seed-demo-accounts
```

**Output yang diharapkan:**
```json
{
  "success": true,
  "results": [
    {
      "email": "admin@perpustakaandigital.com",
      "status": "created",
      "role": "admin"
    },
    {
      "email": "pembaca@perpustakaandigital.com",
      "status": "created",
      "role": "reader"
    }
  ]
}
```

### 2️⃣ Login dengan Akun Demo

Buka aplikasi perpustakaan digital dan gunakan salah satu kredensial berikut:

#### 🔑 Akun Admin
```
Email: admin@perpustakaandigital.com
Password: Demo123!Admin
```

**Fitur Admin:**
- ✅ Badge "Admin" di profil
- ✅ 50 buku sudah dibaca
- ✅ Akses penuh ke semua fitur

#### 📚 Akun Pembaca
```
Email: pembaca@perpustakaandigital.com
Password: Demo123!Pembaca
```

**Fitur Pembaca:**
- ✅ Akun pembaca standar
- ✅ 15 buku sudah dibaca
- ✅ Pengalaman user normal

---

## 🎯 Apa yang Bisa Dicoba?

### Dengan Akun Admin

1. **Login** → Gunakan kredensial admin
2. **Lihat Badge Admin** → Pergi ke Profil, lihat badge "Admin" berwarna gold
3. **Eksplorasi Perpustakaan** → 1,247+ buku tersedia
4. **Tambah Favorit** → Klik icon ❤️ pada buku
5. **Baca Buku** → Klik "Baca Buku" untuk preview
6. **Cek Statistik** → Lihat "50 Buku Dibaca" di profil

### Dengan Akun Pembaca

1. **Login** → Gunakan kredensial pembaca
2. **Browse Koleksi** → Jelajahi 1,247+ buku
3. **Kategori Buku** → Filter by Fiksi, Sains, Sejarah, dll
4. **Search Buku** → Cari buku favorit
5. **Reading List** → Tambah buku ke "Sedang Dibaca"
6. **Lihat Progress** → Track progres membaca

---

## 🔄 Bandingkan Pengalaman

**Langkah-langkah:**

1. **Login sebagai Admin** → Catat pengalaman dan fitur yang terlihat
2. **Logout**
3. **Login sebagai Pembaca** → Bandingkan tampilan dan fitur
4. **Perhatikan perbedaan**:
   - Badge di profil (Admin memiliki badge khusus)
   - Jumlah buku yang sudah dibaca
   - (Future: Fitur-fitur eksklusif admin)

---

## ⚡ Tips Pro

### Gunakan Dua Browser/Tab

```
Browser 1 → Login sebagai Admin
Browser 2 → Login sebagai Pembaca
```

Dengan cara ini Anda bisa:
- Melihat perbedaan langsung
- Tidak perlu logout/login berkali-kali
- Testing fitur collaboration (jika ada)

### Reset Akun Demo

Jika ingin reset ke kondisi awal:

```bash
# 1. Hapus akun demo dari Supabase Dashboard
#    → Authentication > Users > Hapus user demo

# 2. Jalankan seed lagi
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-dd63e494/seed-demo-accounts
```

---

## 🛡️ Keamanan

### ⚠️ PENTING

1. **Jangan simpan data penting** di akun demo
2. **Password mudah ditebak** - hanya untuk demo
3. **Siapa saja bisa akses** akun demo jika tahu kredensialnya
4. **Untuk testing only** - bukan untuk production

### 🔒 Untuk Production

Sebelum go live:

1. ✅ **Hapus** atau **ganti password** akun demo
2. ✅ **Nonaktifkan** endpoint seed-demo-accounts
3. ✅ **Buat** akun admin real dengan password kuat
4. ✅ **Setup** proper role management & permissions

---

## 📚 Dokumentasi Lengkap

Untuk informasi lebih detail:

- **[DEMO_ACCOUNTS.md](./DEMO_ACCOUNTS.md)** - Dokumentasi lengkap akun demo
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Panduan testing aplikasi
- **[README.md](./README.md)** - Dokumentasi utama aplikasi

---

## ❓ FAQ

### Q: Akun demo tidak bisa login?

**A:** Pastikan akun sudah dibuat dengan menjalankan endpoint seed terlebih dahulu.

### Q: Bagaimana cara mengubah password demo?

**A:** Login ke Supabase Dashboard → Authentication → Users → Edit user → Reset password.

### Q: Bisa buat akun demo dengan email custom?

**A:** Ya, edit file `/supabase/functions/server/index.tsx` dan tambahkan akun baru di array `demoAccounts`.

### Q: Akun demo hilang?

**A:** Kemungkinan terhapus manual. Jalankan endpoint seed lagi untuk membuat ulang.

### Q: Error "already_exists" saat seed?

**A:** Normal. Artinya akun demo sudah ada. Gunakan kredensial yang ada untuk login.

---

## 🎉 Selamat Mencoba!

Jangan ragu untuk eksplorasi semua fitur perpustakaan digital. Akun demo dibuat khusus untuk Anda mencoba aplikasi tanpa batasan!

**Happy Reading! 📚✨**

---

**Last Updated**: December 26, 2025

# 📚 Perpustakaan Digital

Aplikasi perpustakaan digital modern dengan autentikasi pengguna yang aman, koleksi 1,247+ buku klasik, dan antarmuka yang indah.

## ✨ Fitur Utama

### 🔐 Autentikasi & Keamanan
- **Signup & Login** dengan email dan password
- **Google OAuth** - masuk cepat dengan akun Google
- **Session Management** - tetap login setelah refresh
- **Keamanan tingkat produksi** dengan Supabase Auth
- **Password hashing** dengan bcrypt
- Hanya akun terdaftar yang bisa mengakses perpustakaan

### 📖 Perpustakaan Digital
- **1,247+ buku klasik** dari berbagai kategori
- **5 kategori buku**: Fiksi, Sains, Sejarah, Teknologi, Anak
- **Pencarian & filter canggih** untuk menemukan buku
- **Book reader** dengan preview konten buku
- **Favorit & Sedang Dibaca** untuk tracking personal

### 🎨 Desain & UX
- **Split-screen login page** dengan carousel visual perpustakaan
- **Animasi smooth** dengan Motion (Framer Motion)
- **Responsive design** - berfungsi di desktop & mobile
- **Modern UI** dengan Tailwind CSS dan shadcn/ui
- **Dark gradients** dan glassmorphism effects

## 🚀 Teknologi

### Frontend
- **React** - UI framework
- **TypeScript** - type safety
- **Tailwind CSS** - styling
- **shadcn/ui** - komponen UI
- **Motion (Framer Motion)** - animasi
- **Lucide React** - icons
- **Sonner** - toast notifications

### Backend & Database
- **Supabase** - Backend as a Service
- **Supabase Auth** - autentikasi pengguna
- **PostgreSQL** - database relasional
- **Supabase Edge Functions** - serverless API
- **Hono** - web framework untuk edge functions
- **KV Store** - key-value storage untuk data pengguna

## 📋 Setup & Deployment

### Prerequisites
- Akun Supabase (gratis di supabase.com)
- Node.js 18+ (jika ingin develop lokal)

### 🔐 Akun Demo
Untuk testing dan demonstrasi, tersedia akun demo yang sudah disiapkan:
👉 **[DEMO_ACCOUNTS.md](./DEMO_ACCOUNTS.md)** (Dokumentasi Lengkap)
👉 **[QUICK_START_DEMO.md](./QUICK_START_DEMO.md)** (Panduan Cepat)

**Quick Access:**
- **Admin**: `admin@perpustakaandigital.com` / `Demo123!Admin`
- **Pembaca**: `pembaca@perpustakaandigital.com` / `Demo123!Pembaca`

### Konfigurasi Google OAuth (Opsional)
Untuk mengaktifkan login dengan Google, ikuti panduan lengkap di:
👉 **[SETUP_GOOGLE_AUTH.md](./SETUP_GOOGLE_AUTH.md)**

Ringkasan:
1. Buka Supabase Dashboard → Authentication → Providers
2. Aktifkan Google provider
3. Ikuti panduan: https://supabase.com/docs/guides/auth/social-login/auth-google
4. Tambahkan Google Client ID dan Client Secret

### Environment Variables
Aplikasi ini sudah terkonfigurasi dengan Supabase. Variabel environment yang digunakan:
- `SUPABASE_URL` - URL project Supabase
- `SUPABASE_ANON_KEY` - Public anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (server-side only)

### Deployment
Aplikasi ini sudah siap untuk dipublikasikan! Sudah ter-deploy di Figma Make dengan koneksi ke Supabase.

Untuk deployment ke platform lain:
1. **Vercel** - push ke GitHub dan connect ke Vercel
2. **Netlify** - drag & drop build folder
3. **CloudFlare Pages** - connect GitHub repository

## 🗄️ Struktur Database

### Supabase Auth Tables (Auto-generated)
- `auth.users` - data pengguna dasar
- `auth.sessions` - session management

### KV Store (Custom)
- `user:{userId}` - profil pengguna extended
  ```json
  {
    "name": "Nama User",
    "email": "user@email.com",
    "memberSince": "2024-11-04T...",
    "booksRead": 0,
    "avatar": "",
    "role": "reader"
  }
  ```

## 🛡️ Keamanan

### Implementasi Keamanan
- ✅ Password di-hash dengan bcrypt (handled by Supabase)
- ✅ JWT tokens untuk autentikasi API
- ✅ HTTPS untuk semua komunikasi
- ✅ CORS configured untuk API endpoints
- ✅ Service role key TIDAK exposed ke frontend
- ✅ Row Level Security (RLS) di Supabase

### Best Practices
- Tokens disimpan di memory, bukan localStorage (lebih aman)
- Semua API calls menggunakan Authorization headers
- Error messages tidak expose informasi sensitif
- Session auto-refresh untuk UX yang smooth

## 📱 Halaman & Fitur

### Login Page
- Split-screen design dengan visual carousel
- Form login dengan email & password
- Tombol "Login dengan Google"
- Link ke halaman signup
- Animasi floating books di background

### Library Home
- Welcome banner dengan nama pengguna
- Search bar untuk cari buku
- Category navigation (Trending, Populer, dll)
- Grid buku dengan cover images
- Stats cards (Total Buku, Kategori, Pembaca, Akses)

### Jelajahi Koleksi
- Semua 1,247+ buku dalam satu halaman
- Advanced search & filter
- Filter by kategori
- Sort by rating, tahun, judul

### Sedang Dibaca
- Daftar buku yang sedang dibaca
- Progress tracking per buku
- Quick access untuk melanjutkan membaca

### Book Reader
- Preview konten buku
- Tombol "Tambah ke Sedang Dibaca"
- Informasi lengkap buku (penulis, tahun, rating)

### Profile & Settings
- Edit profil pengguna
- Upload avatar (placeholder)
- Stats membaca personal
- Logout button

## 👥 Credits

**Dibuat dengan penuh dedikasi oleh:**
- **Kelompok 7**
- **Kelas 1B**
- **Program Studi Teknik Informatika**
- **Universitas Harkat Negeri**

## 📝 Catatan Penting

### Production Readiness
Aplikasi ini sudah siap untuk demo dan prototype, namun untuk production skala besar, pertimbangkan:

1. **Email Verification**
   - Saat ini email auto-confirmed
   - Untuk produksi, setup email server di Supabase

2. **Rate Limiting**
   - Tambahkan rate limiting di API endpoints
   - Prevent brute force attacks

3. **Data Privacy**
   - Review GDPR compliance jika target user di EU
   - Tambahkan Terms of Service & Privacy Policy

4. **Monitoring & Analytics**
   - Setup error tracking (Sentry)
   - Add analytics (Google Analytics, Mixpanel)

5. **Performance**
   - Implement image CDN untuk cover buku
   - Add caching untuk data yang sering diakses
   - Consider pagination untuk list buku yang panjang

### Known Limitations
- Email belum ter-verify (auto-confirmed)
- Image fallback untuk cover buku yang missing
- Data buku adalah static data (tidak dari database)
- Password reset belum diimplementasikan

## 🔧 Maintenance

### Update Dependencies
```bash
npm update
```

### Check Supabase Status
- Dashboard: https://supabase.com/dashboard
- Status page: https://status.supabase.com

### Backup Data
- Supabase auto-backup untuk paid plans
- Export user data via Supabase Dashboard

## 📞 Support

Untuk pertanyaan atau bantuan:
1. Cek dokumentasi Supabase: https://supabase.com/docs
2. Review error logs di Supabase Dashboard
3. Check browser console untuk frontend errors

---

**Selamat menggunakan Perpustakaan Digital! 📚✨**
# Setup Google OAuth untuk Perpustakaan Digital

Aplikasi perpustakaan digital Anda sekarang sudah terintegrasi dengan **Supabase Authentication**. Untuk mengaktifkan login dengan Google, ikuti langkah-langkah berikut:

## Langkah Setup Google OAuth

1. **Buka Dashboard Supabase**
   - Kunjungi: https://supabase.com/dashboard
   - Login dengan akun Anda
   - Pilih project perpustakaan digital Anda

2. **Aktifkan Google Provider**
   - Di sidebar kiri, klik **Authentication**
   - Pilih tab **Providers**
   - Cari **Google** dalam daftar provider
   - Toggle switch untuk mengaktifkan Google

3. **Dapatkan Google OAuth Credentials**
   - Ikuti panduan lengkap di: https://supabase.com/docs/guides/auth/social-login/auth-google
   - Anda perlu membuat OAuth credentials di Google Cloud Console
   - Salin **Client ID** dan **Client Secret**

4. **Masukkan Credentials ke Supabase**
   - Kembali ke Supabase Dashboard → Authentication → Providers → Google
   - Paste **Client ID** dan **Client Secret** dari Google
   - Klik **Save**

5. **Setup Redirect URL**
   - Di Google Cloud Console, tambahkan authorized redirect URI:
   - `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
   - Ganti `YOUR_PROJECT_ID` dengan project ID Supabase Anda

## Setelah Setup

Setelah mengikuti langkah-langkah di atas, fitur "Login dengan Google" akan berfungsi dengan sempurna!

## Fitur Autentikasi yang Tersedia

✅ **Signup dengan Email & Password** - Pengguna baru dapat membuat akun
✅ **Login dengan Email & Password** - Pengguna terdaftar dapat masuk
✅ **Login dengan Google OAuth** - Masuk cepat menggunakan akun Google
✅ **Session Management** - Pengguna tetap login bahkan setelah refresh halaman
✅ **Secure Password Storage** - Password di-hash dengan aman di server
✅ **Protected Routes** - Hanya pengguna terdaftar yang bisa mengakses perpustakaan

## Keamanan

- Password pengguna di-hash dengan Supabase Auth (bcrypt)
- Access tokens digunakan untuk autentikasi API
- Email auto-confirmed (karena email server belum dikonfigurasi)
- Data pengguna tersimpan aman di Supabase

## Troubleshooting

Jika mengalami error "provider is not enabled":
- Pastikan Google provider sudah diaktifkan di Supabase Dashboard
- Pastikan Client ID dan Client Secret sudah diisi
- Pastikan Redirect URL sudah ditambahkan di Google Cloud Console

---

**Dibuat dengan penuh dedikasi oleh Kelompok 7 - Kelas 1B, Program Studi Teknik Informatika • Universitas Harkat Negeri**

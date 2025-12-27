# 🚀 Deployment Guide - Perpustakaan Digital

Panduan lengkap untuk mempublikasikan aplikasi perpustakaan digital Anda ke internet.

## 📋 Pre-Deployment Checklist

Sebelum deploy, pastikan:

- [x] ✅ Aplikasi sudah terhubung dengan Supabase
- [x] ✅ Backend server sudah berjalan (Edge Functions)
- [x] ✅ Autentikasi sudah berfungsi (email/password)
- [ ] ✅ Google OAuth sudah dikonfigurasi (opsional, lihat SETUP_GOOGLE_AUTH.md)
- [ ] ✅ Testing selesai (lihat TESTING_GUIDE.md)
- [ ] ✅ README.md sudah up-to-date

## 🎯 Aplikasi Ini Sudah Siap Deploy!

**Good News!** 🎉 Aplikasi perpustakaan digital Anda sudah ter-deploy dan berjalan di Figma Make dengan koneksi Supabase yang aktif.

### Current Deployment Status:
- ✅ **Frontend**: Hosted on Figma Make
- ✅ **Backend**: Supabase Edge Functions (serverless)
- ✅ **Database**: Supabase PostgreSQL
- ✅ **Auth**: Supabase Authentication
- ✅ **API**: RESTful endpoints via Hono server

## 🌐 Opsi Deployment Tambahan

Jika ingin deploy ke platform lain untuk production:

---

### Option 1: Vercel (Recommended for React Apps)

**Kelebihan:**
- Deploy gratis dengan performa tinggi
- Auto-deploy dari Git
- Built-in CI/CD
- Global CDN
- Easy SSL/HTTPS

**Langkah Deploy:**

1. **Push Code ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Perpustakaan Digital"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Kunjungi: https://vercel.com
   - Sign up/Login dengan GitHub
   - Klik "New Project"
   - Import GitHub repository
   - Klik "Deploy"

3. **Configure Environment Variables**
   - Di Vercel dashboard, buka project settings
   - Go to "Environment Variables"
   - Tambahkan (sudah di-set di Supabase integration):
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

4. **Deploy!**
   - Vercel akan auto-deploy setiap kali ada push ke GitHub
   - URL production: `https://your-app.vercel.app`

---

### Option 2: Netlify

**Kelebihan:**
- Deploy gratis
- Drag & drop deploy
- Form handling
- Serverless functions

**Langkah Deploy:**

1. **Build Project**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify Drop**
   - Kunjungi: https://app.netlify.com/drop
   - Drag & drop folder `dist/` hasil build
   - Wait for deployment to complete

3. **Configure (Advanced)**
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables

**Production URL**: `https://your-app.netlify.app`

---

### Option 3: GitHub Pages (Free Static Hosting)

**Kelebihan:**
- 100% gratis
- Terintegrasi dengan GitHub
- Good untuk static sites

**Langkah Deploy:**

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/perpustakaan-digital",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**
   - Go to repo settings
   - Scroll to "Pages"
   - Source: gh-pages branch
   - Save

**Production URL**: `https://YOUR_USERNAME.github.io/perpustakaan-digital`

---

### Option 4: Railway.app

**Kelebihan:**
- Deploy fullstack apps
- Database included
- Auto-deploy from Git

**Langkah Deploy:**

1. Kunjungi: https://railway.app
2. Sign up dengan GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select repository
5. Add environment variables
6. Deploy!

---

## 🔧 Post-Deployment Configuration

### 1. Update Supabase Allowed URLs

Setelah deploy, tambahkan production URL ke Supabase:

1. Buka Supabase Dashboard
2. Go to **Authentication** → **URL Configuration**
3. Tambahkan production URL ke:
   - **Site URL**: `https://your-production-url.com`
   - **Redirect URLs**: `https://your-production-url.com/**`

### 2. Update OAuth Redirect URLs

Jika menggunakan Google OAuth:

1. Buka Google Cloud Console
2. Go to OAuth 2.0 Client IDs
3. Tambahkan authorized redirect URI:
   - `https://your-production-url.com`
   - `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`

### 3. Setup Custom Domain (Optional)

**Vercel:**
- Settings → Domains → Add Domain
- Follow DNS configuration

**Netlify:**
- Domain settings → Add custom domain
- Configure DNS with your domain registrar

---

## 🔒 Security Checklist

Sebelum go-live:

- [ ] ✅ HTTPS enabled (auto di Vercel/Netlify)
- [ ] ✅ Environment variables tidak di-commit ke Git
- [ ] ✅ CORS configured correctly di server
- [ ] ✅ Supabase Row Level Security (RLS) enabled
- [ ] ✅ API rate limiting configured
- [ ] ⚠️ Email verification enabled (untuk produksi)
- [ ] ⚠️ Password reset flow implemented

---

## 📊 Monitoring & Analytics

### Recommended Tools:

**1. Supabase Dashboard**
- Monitor auth events
- Check database usage
- View API logs
- Track performance

**2. Vercel Analytics** (if on Vercel)
- Automatically enabled
- View page views, performance
- Web Vitals monitoring

**3. Google Analytics** (Optional)
```bash
npm install @analytics/google-analytics
```

**4. Sentry (Error Tracking)**
```bash
npm install @sentry/react
```

---

## 🐛 Troubleshooting

### Issue: "Network Error" saat Login

**Solution:**
- Check CORS settings di server
- Verify Supabase URL dan keys
- Check browser console for errors

### Issue: Google OAuth Error "Redirect URI Mismatch"

**Solution:**
- Verify production URL di Google Cloud Console
- Add redirect URI dengan format exact
- Wait 5-10 minutes untuk propagation

### Issue: "Session Expired" Setelah Refresh

**Solution:**
- Check token storage
- Verify session refresh logic
- Check Supabase session settings

### Issue: Images Not Loading

**Solution:**
- Check HTTPS/HTTP mixed content
- Verify image URLs accessible
- Check CORS for image CDN

---

## 📈 Performance Optimization

### Before Going Live:

1. **Image Optimization**
   - Compress images
   - Use WebP format
   - Lazy loading implemented ✅

2. **Code Splitting**
   - React lazy loading
   - Route-based splitting

3. **Caching**
   - Browser caching enabled
   - CDN caching
   - API response caching

4. **Bundle Size**
   - Run `npm run build`
   - Analyze bundle size
   - Remove unused dependencies

---

## 🎉 You're Ready to Launch!

Checklist terakhir:

- [ ] Testing selesai 100%
- [ ] Deployment berhasil
- [ ] Custom domain configured (optional)
- [ ] Google OAuth configured
- [ ] Analytics installed
- [ ] Monitoring setup
- [ ] Team sudah review
- [ ] Documentation lengkap

---

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**Selamat! Aplikasi perpustakaan digital Anda siap untuk dunia! 🚀📚**

**Dibuat dengan penuh dedikasi oleh Kelompok 7 - Kelas 1B, Program Studi Teknik Informatika • Universitas Harkat Negeri**

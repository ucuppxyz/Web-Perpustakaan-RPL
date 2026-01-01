import { useState, useEffect } from 'react';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { Bell, Moon, Sun, Globe, Shield, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';

interface SettingsPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
}

export function SettingsPage({ user, onLogout, onNavigate }: SettingsPageProps) {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [language, setLanguage] = useState('id');
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Apply theme on mount and when darkMode changes
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleSaveNotifications = () => {
    toast.success('Pengaturan notifikasi berhasil disimpan');
  };

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error('Password baru tidak cocok');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }
    toast.success('Password berhasil diubah');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSavePreferences = () => {
    toast.success('Preferensi berhasil disimpan');
  };

  const handleToggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    toast.success(checked ? 'Mode gelap diaktifkan' : 'Mode terang diaktifkan');
  };

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="settings">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2">Pengaturan</h1>
            <p className="text-gray-600 dark:text-gray-400">Kelola preferensi dan keamanan akun Anda</p>
          </div>

          {/* Notifications Settings */}
          <Card className="mb-6 border-0 shadow-lg dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Bell className="w-5 h-5" />
                Notifikasi
              </CardTitle>
              <CardDescription className="dark:text-gray-400">Kelola bagaimana Anda menerima notifikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notif" className="dark:text-white">Notifikasi Email</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Terima notifikasi tentang pembaruan dan pengingat via email
                  </p>
                </div>
                <Switch
                  id="email-notif"
                  checked={emailNotif}
                  onCheckedChange={setEmailNotif}
                />
              </div>
              <Separator className="dark:bg-gray-700" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notif" className="dark:text-white">Notifikasi Push</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Terima notifikasi push untuk pembaruan penting
                  </p>
                </div>
                <Switch
                  id="push-notif"
                  checked={pushNotif}
                  onCheckedChange={setPushNotif}
                />
              </div>
              <Button
                onClick={handleSaveNotifications}
                className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Simpan Pengaturan Notifikasi
              </Button>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="mb-6 border-0 shadow-lg dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                Tampilan
              </CardTitle>
              <CardDescription className="dark:text-gray-400">Sesuaikan tampilan aplikasi sesuai preferensi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode" className="dark:text-white">Mode Gelap</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Aktifkan mode gelap untuk pengalaman membaca yang nyaman
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={handleToggleDarkMode}
                />
              </div>
              
              {/* Theme Preview */}
              <div className="p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium dark:text-white">Preview Tema</span>
                  {darkMode ? (
                    <Moon className="w-5 h-5 text-indigo-500" />
                  ) : (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {darkMode 
                    ? '🌙 Mode gelap aktif - Nyaman untuk mata di malam hari' 
                    : '☀️ Mode terang aktif - Cerah dan segar untuk siang hari'}
                </p>
              </div>

              <Separator className="dark:bg-gray-700" />
              
              <div className="space-y-2">
                <Label htmlFor="language" className="flex items-center gap-2 dark:text-white">
                  <Globe className="w-4 h-4" />
                  Bahasa
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={handleSavePreferences}
                className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Simpan Preferensi
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="mb-6 border-0 shadow-lg dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Shield className="w-5 h-5" />
                Keamanan
              </CardTitle>
              <CardDescription className="dark:text-gray-400">Ubah password dan kelola keamanan akun</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="old-password" className="dark:text-white">Password Lama</Label>
                <div className="relative">
                  <Input
                    id="old-password"
                    type={showPassword ? 'text' : 'password'}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Masukkan password lama"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="dark:text-white">Password Baru</Label>
                <Input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Masukkan password baru"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="dark:text-white">Konfirmasi Password Baru</Label>
                <Input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password baru"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <Button
                onClick={handleSavePassword}
                className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Ubah Password
              </Button>
            </CardContent>
          </Card>

          {/* Account Management */}
          <Card className="border-0 shadow-lg border-red-200 dark:bg-gray-800 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Zona Bahaya</CardTitle>
              <CardDescription className="dark:text-gray-400">Tindakan permanen yang memerlukan konfirmasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 dark:text-white">Hapus Akun</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Setelah akun dihapus, semua data Anda akan hilang secara permanen. Tindakan ini tidak dapat
                    dibatalkan.
                  </p>
                  <Button variant="destructive">Hapus Akun</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

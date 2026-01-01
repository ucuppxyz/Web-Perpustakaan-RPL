import { useState, useRef } from 'react';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { Camera, User as UserIcon, Mail, Calendar, BookOpen, Award, Edit2, Check, X, Heart, Shield, TrendingUp, Users, FileText, Download, CheckCircle2, Clock, XCircle, BarChart3, Target, Zap, Star, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface ProfilePageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
  onUpdateUser: (user: Partial<User>) => void;
}

export function ProfilePage({ user, onLogout, onNavigate, onUpdateUser }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onUpdateUser({
      name: editedName,
      email: editedEmail,
    });
    setIsEditing(false);
    toast.success('Profil berhasil diperbarui');
  };

  const handleCancel = () => {
    setEditedName(user?.name || '');
    setEditedEmail(user?.email || '');
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateUser({ avatar: reader.result as string });
        toast.success('Foto profil berhasil diperbarui');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadReport = (type: 'daily' | 'monthly') => {
    const date = new Date().toISOString().split('T')[0];
    const reportType = type === 'daily' ? 'Harian' : 'Bulanan';
    
    // Generate CSV content
    const csvContent = `Laporan Peminjaman ${reportType} - ${date}
Perpustakaan Digital

No,Nama Peminjam,Judul Buku,Tanggal Pinjam,Tanggal Kembali,Status
1,Ahmad Rizki,Pride and Prejudice,2025-01-01,2025-01-08,Dikembalikan
2,Siti Nurhaliza,1984 by George Orwell,2025-01-02,2025-01-09,Dipinjam
3,Budi Santoso,To Kill a Mockingbird,2025-01-03,2025-01-10,Dipinjam
4,Maya Putri,The Great Gatsby,2025-01-04,2025-01-11,Terlambat

Total Peminjaman: 4
Total Dikembalikan: 1
Total Dipinjam: 2
Total Terlambat: 1

Generated on: ${new Date().toLocaleString('id-ID')}`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `laporan-${type}-${date}.csv`;
    link.click();
    
    toast.success(`Laporan ${reportType} berhasil diunduh`);
  };

  // Render Admin Profile
  if (user?.role === 'admin') {
    return (
      <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="profile">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <h1>Dashboard Admin</h1>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 gap-1">
                  <Shield className="w-3 h-3" />
                  Administrator
                </Badge>
              </div>
              <p className="text-gray-600">Selamat datang kembali, {user.name}</p>
            </div>

            {/* Profile & Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Profile Card */}
              <Card className="border-0 shadow-lg lg:col-span-1">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative group mb-4">
                      <Avatar className="w-24 h-24 border-4 border-purple-200">
                        {user?.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-2xl">
                          {user?.name.charAt(0).toUpperCase() || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        <Camera className="w-3 h-3" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </div>
                    
                    {!isEditing ? (
                      <>
                        <h3 className="mb-1">{user?.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{user?.email}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(true)}
                          className="gap-2 mb-4"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit Profil
                        </Button>
                      </>
                    ) : (
                      <div className="space-y-3 w-full">
                        <div>
                          <Label htmlFor="name" className="text-xs">Nama</Label>
                          <Input
                            id="name"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-xs">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSave}
                            size="sm"
                            className="flex-1 gap-1 bg-gradient-to-r from-purple-600 to-pink-600"
                          >
                            <Check className="w-3 h-3" />
                            Simpan
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleCancel} className="gap-1">
                            <X className="w-3 h-3" />
                            Batal
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="w-full pt-4 border-t mt-4 space-y-2 text-left">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-gray-600">Bergabung {user?.memberSince}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span className="text-gray-600">Admin Perpustakaan</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Anggota</p>
                        <p className="text-3xl mb-1">284</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          +12% bulan ini
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Buku</p>
                        <p className="text-3xl mb-1">1,542</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          +28 buku baru
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Peminjaman Aktif</p>
                        <p className="text-3xl mb-1">127</p>
                        <p className="text-xs text-orange-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          8 menunggu approval
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Booking Pending</p>
                        <p className="text-3xl mb-1">8</p>
                        <p className="text-xs text-red-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Perlu review
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Activity className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Actions & Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Aksi Cepat
                  </CardTitle>
                  <CardDescription>Akses fitur admin yang sering digunakan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => onNavigate('approval')}
                    className="w-full justify-start gap-3 h-auto py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm">Approval Booking</p>
                      <p className="text-xs opacity-80">8 booking menunggu persetujuan</p>
                    </div>
                  </Button>

                  <Button
                    onClick={() => onNavigate('walk-in-loan')}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-3"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm">Peminjaman Walk-in</p>
                      <p className="text-xs text-gray-500">Layani peminjaman langsung</p>
                    </div>
                  </Button>

                  <Button
                    onClick={() => onNavigate('data-master')}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-3"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm">Data Master</p>
                      <p className="text-xs text-gray-500">Kelola koleksi buku</p>
                    </div>
                  </Button>

                  <Button
                    onClick={() => onNavigate('reports')}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-3"
                  >
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm">Laporan & Statistik</p>
                      <p className="text-xs text-gray-500">Lihat analisis perpustakaan</p>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              {/* Download Reports */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-green-500" />
                    Unduh Laporan
                  </CardTitle>
                  <CardDescription>Export data peminjaman untuk analisis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="mb-1">Laporan Harian</h4>
                        <p className="text-sm text-gray-600">Data peminjaman hari ini</p>
                      </div>
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <Button
                      onClick={() => handleDownloadReport('daily')}
                      className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4" />
                      Download Laporan Harian (CSV)
                    </Button>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="mb-1">Laporan Bulanan</h4>
                        <p className="text-sm text-gray-600">Data peminjaman bulan ini</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-purple-600" />
                    </div>
                    <Button
                      onClick={() => handleDownloadReport('monthly')}
                      className="w-full gap-2 bg-purple-600 hover:bg-purple-700"
                    >
                      <Download className="w-4 h-4" />
                      Download Laporan Bulanan (CSV)
                    </Button>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-yellow-800">
                      💡 <strong>Tips:</strong> File CSV dapat dibuka di Excel atau Google Sheets untuk analisis lebih lanjut
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
                <CardDescription>Ringkasan aktivitas perpustakaan hari ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100', text: 'Booking disetujui', detail: 'Ahmad Rizki - Pride and Prejudice', time: '5 menit lalu' },
                    { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100', text: 'Peminjaman walk-in', detail: 'Siti Nurhaliza - 1984', time: '15 menit lalu' },
                    { icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100', text: 'Booking baru menunggu', detail: 'Budi Santoso - The Great Gatsby', time: '30 menit lalu' },
                    { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100', text: 'Buku dikembalikan', detail: 'Maya Putri - To Kill a Mockingbird', time: '1 jam lalu' },
                  ].map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className={`w-10 h-10 ${activity.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm mb-0.5">{activity.text}</p>
                          <p className="text-xs text-gray-600">{activity.detail}</p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  // Member achievements & reading goals
  const achievements = [
    { icon: BookOpen, title: 'Pembaca Aktif', description: 'Baca 20+ buku', earned: true, color: 'from-blue-600 to-indigo-600', bgColor: 'from-blue-50 to-indigo-50' },
    { icon: Target, title: 'Rajin Membaca', description: 'Baca 30 hari berturut-turut', earned: true, color: 'from-purple-600 to-pink-600', bgColor: 'from-purple-50 to-pink-50' },
    { icon: Award, title: 'Anggota Setia', description: 'Member selama 1 tahun', earned: false, color: 'from-amber-500 to-orange-600', bgColor: 'from-amber-50 to-orange-50' },
    { icon: Star, title: 'Bintang Literasi', description: 'Baca 50+ buku', earned: false, color: 'from-yellow-500 to-amber-500', bgColor: 'from-yellow-50 to-amber-50' },
    { icon: Zap, title: 'Speed Reader', description: 'Selesaikan 5 buku dalam seminggu', earned: false, color: 'from-green-500 to-emerald-600', bgColor: 'from-green-50 to-emerald-50' },
    { icon: Heart, title: 'Book Lover', description: 'Tandai 25+ buku favorit', earned: false, color: 'from-pink-500 to-rose-600', bgColor: 'from-pink-50 to-rose-50' },
  ];

  const readingGoals = [
    { title: 'Target Bulanan', current: 8, target: 10, color: 'bg-indigo-600' },
    { title: 'Target Tahunan', current: 42, target: 100, color: 'bg-purple-600' },
  ];

  const favoriteGenres = [
    { name: 'Fiksi', count: 15, percentage: 35, color: 'bg-blue-500' },
    { name: 'Sejarah', count: 10, percentage: 23, color: 'bg-purple-500' },
    { name: 'Sains', count: 8, percentage: 19, color: 'bg-green-500' },
    { name: 'Biografi', count: 7, percentage: 16, color: 'bg-orange-500' },
    { name: 'Lainnya', count: 3, percentage: 7, color: 'bg-gray-500' },
  ];

  // Render Member Profile
  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="profile">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2">Profil Saya</h1>
            <p className="text-gray-600">Kelola informasi profil dan lihat statistik membaca Anda</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="relative group mb-4">
                      <Avatar className="w-32 h-32 border-4 border-indigo-200">
                        {user?.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                        <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-3xl">
                          {user?.name.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </div>
                    
                    {!isEditing ? (
                      <div className="text-center w-full">
                        <h2 className="mb-1">{user?.name}</h2>
                        <p className="text-sm text-gray-600 mb-4">{user?.email}</p>
                        <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                          Member Aktif
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(true)}
                          className="gap-2 w-full"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit Profil
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3 w-full">
                        <div>
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input
                            id="name"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSave}
                            className="flex-1 gap-2 bg-gradient-to-r from-indigo-600 to-purple-600"
                          >
                            <Check className="w-4 h-4" />
                            Simpan
                          </Button>
                          <Button variant="outline" onClick={handleCancel} className="gap-2">
                            <X className="w-4 h-4" />
                            Batal
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="w-full pt-4 border-t mt-4 space-y-3">
                      <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="text-xs text-gray-500">Bergabung</p>
                          <p className="text-sm">{user?.memberSince}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="text-xs text-gray-500">Buku Dibaca</p>
                          <p className="text-sm">{user?.booksRead} Buku</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reading Goals */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="w-5 h-5 text-indigo-600" />
                    Target Membaca
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {readingGoals.map((goal, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">{goal.title}</span>
                        <span className="text-sm">{goal.current}/{goal.target} buku</span>
                      </div>
                      <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                    </div>
                    <p className="text-2xl mb-1">{user?.booksRead || 0}</p>
                    <p className="text-xs text-gray-600">Buku Dibaca</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Heart className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-2xl mb-1">12</p>
                    <p className="text-xs text-gray-600">Favorit</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="w-5 h-5 text-pink-600" />
                    </div>
                    <p className="text-2xl mb-1">2</p>
                    <p className="text-xs text-gray-600">Pencapaian</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-2xl mb-1">15</p>
                    <p className="text-xs text-gray-600">Hari Streak</p>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs for Details */}
              <Card className="border-0 shadow-lg">
                <Tabs defaultValue="achievements" className="w-full">
                  <CardHeader>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="achievements">Pencapaian</TabsTrigger>
                      <TabsTrigger value="genres">Genre Favorit</TabsTrigger>
                    </TabsList>
                  </CardHeader>
                  
                  <TabsContent value="achievements">
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((achievement, index) => {
                          const Icon = achievement.icon;
                          return (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                achievement.earned
                                  ? `bg-gradient-to-br ${achievement.bgColor} border-transparent shadow-md`
                                  : 'bg-gray-50 border-gray-200 opacity-60'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    achievement.earned
                                      ? `bg-gradient-to-br ${achievement.color}`
                                      : 'bg-gray-300'
                                  }`}
                                >
                                  <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="mb-1 text-sm">{achievement.title}</h4>
                                  <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                                  {achievement.earned && (
                                    <Badge className="bg-green-500 text-xs">Didapatkan!</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </TabsContent>

                  <TabsContent value="genres">
                    <CardContent>
                      <div className="space-y-4">
                        {favoriteGenres.map((genre, index) => (
                          <div key={index}>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm">{genre.name}</span>
                              <span className="text-sm text-gray-600">{genre.count} buku ({genre.percentage}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`${genre.color} h-2 rounded-full transition-all duration-300`}
                                style={{ width: `${genre.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </Card>

              {/* Reading Activity */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-600" />
                    Aktivitas Membaca Terkini
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { book: 'Pride and Prejudice', action: 'Selesai dibaca', time: '2 hari lalu', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
                      { book: 'The Great Gatsby', action: 'Sedang membaca', time: '5 hari lalu', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
                      { book: '1984', action: 'Ditandai favorit', time: '1 minggu lalu', icon: Heart, color: 'text-pink-600', bg: 'bg-pink-100' },
                      { book: 'To Kill a Mockingbird', action: 'Mulai membaca', time: '2 minggu lalu', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100' },
                    ].map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className={`w-10 h-10 ${activity.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${activity.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm mb-0.5">{activity.book}</p>
                            <p className="text-xs text-gray-600">{activity.action}</p>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

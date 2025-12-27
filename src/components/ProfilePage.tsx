import { useState, useRef } from 'react';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { Camera, User as UserIcon, Mail, Calendar, BookOpen, Award, Edit2, Check, X, Heart, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

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

  const achievements = [
    { icon: BookOpen, title: 'Pembaca Aktif', description: 'Baca 20+ buku', earned: true },
    { icon: Award, title: 'Rajin Membaca', description: 'Baca buku 30 hari berturut-turut', earned: false },
    { icon: Calendar, title: 'Anggota Setia', description: 'Member selama 1 tahun', earned: false },
  ];

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="profile">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2">Profil Saya</h1>
            <p className="text-gray-600">Kelola informasi profil Anda</p>
          </div>

          {/* Profile Card */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center">
                  <div className="relative group">
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
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    Klik untuk mengubah foto
                  </p>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  {!isEditing ? (
                    <div>
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="mb-2">{user?.name}</h2>
                          <p className="text-gray-600 mb-4">{user?.email}</p>
                          <div className="flex gap-2">
                            <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600">
                              Member Aktif
                            </Badge>
                            {user?.role === 'admin' && (
                              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 gap-1">
                                <Shield className="w-3 h-3" />
                                Admin
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(true)}
                          className="gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Calendar className="w-5 h-5 text-indigo-600" />
                          <div>
                            <p className="text-xs text-gray-500">Bergabung</p>
                            <p className="text-sm">{user?.memberSince}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <BookOpen className="w-5 h-5 text-indigo-600" />
                          <div>
                            <p className="text-xs text-gray-500">Buku Dibaca</p>
                            <p className="text-sm">{user?.booksRead} Buku</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
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
                          className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600"
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
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-3xl mb-1">{user?.booksRead || 0}</p>
                <p className="text-sm text-gray-600">Buku Dibaca</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-3xl mb-1">12</p>
                <p className="text-sm text-gray-600">Buku Favorit</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-pink-600" />
                </div>
                <p className="text-3xl mb-1">1</p>
                <p className="text-sm text-gray-600">Pencapaian</p>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Pencapaian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        achievement.earned
                          ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                          achievement.earned
                            ? 'bg-gradient-to-br from-indigo-600 to-purple-600'
                            : 'bg-gray-300'
                        }`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="mb-1 text-sm">{achievement.title}</h3>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      {achievement.earned && (
                        <Badge className="mt-2 bg-green-500 text-xs">Didapatkan!</Badge>
                      )}
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
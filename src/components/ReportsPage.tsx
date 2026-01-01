import { useState } from 'react';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { BarChart3, ShieldAlert, Download, TrendingUp, Users, BookOpen, Calendar, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

interface ReportsPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
}

export function ReportsPage({ user, onLogout, onNavigate }: ReportsPageProps) {
  const [reportType, setReportType] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState('2025-01');

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="reports">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto mt-12 border-red-200">
            <CardContent className="p-8 text-center">
              <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <h2 className="mb-2 text-red-700">Akses Ditolak</h2>
              <p className="text-gray-600 mb-4">
                Halaman ini hanya dapat diakses oleh Administrator.
              </p>
              <Button onClick={() => onNavigate('home')} className="bg-gradient-to-r from-indigo-600 to-purple-600">
                Kembali ke Beranda
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Dummy data for reports
  const stats = {
    totalLoans: 156,
    activeLoans: 43,
    returnedLoans: 113,
    overdueLoans: 8,
    newMembers: 12,
    totalMembers: 342,
    popularBooks: 25,
    totalBooks: 1247,
  };

  const loansByCategory = [
    { category: 'Fiksi', count: 45, percentage: 29 },
    { category: 'Teknologi', count: 38, percentage: 24 },
    { category: 'Sains', count: 32, percentage: 21 },
    { category: 'Sejarah', count: 25, percentage: 16 },
    { category: 'Anak', count: 16, percentage: 10 },
  ];

  const topBorrowedBooks = [
    { title: 'Pride and Prejudice', author: 'Jane Austen', loans: 23 },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', loans: 19 },
    { title: 'Clean Code', author: 'Robert C. Martin', loans: 18 },
    { title: 'Sapiens', author: 'Yuval Noah Harari', loans: 17 },
    { title: 'The Art of War', author: 'Sun Tzu', loans: 15 },
  ];

  const topMembers = [
    { name: 'Ahmad Fauzi', loans: 12, returns: 12 },
    { name: 'Siti Nurhaliza', loans: 10, returns: 9 },
    { name: 'Budi Santoso', loans: 9, returns: 9 },
    { name: 'Dewi Lestari', loans: 8, returns: 8 },
    { name: 'Eko Prasetyo', loans: 7, returns: 7 },
  ];

  const handleDownloadReport = () => {
    toast.success('Laporan berhasil diunduh', {
      description: `Laporan ${reportType} bulan ${selectedMonth} dalam format PDF`,
    });
  };

  const handleExportExcel = () => {
    toast.success('Data berhasil diekspor ke Excel');
  };

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="reports">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Laporan & Statistik</h1>
              <p className="text-gray-600">Analisis data perpustakaan dan aktivitas peminjaman</p>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <label className="text-sm text-gray-600">Periode Laporan</label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025-01">Januari 2025</SelectItem>
                      <SelectItem value="2024-12">Desember 2024</SelectItem>
                      <SelectItem value="2024-11">November 2024</SelectItem>
                      <SelectItem value="2024-10">Oktober 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm text-gray-600">Jenis Laporan</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Bulanan</SelectItem>
                      <SelectItem value="quarterly">Kuartalan</SelectItem>
                      <SelectItem value="yearly">Tahunan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleDownloadReport}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                  <Button onClick={handleExportExcel} variant="outline" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Export Excel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Peminjaman</p>
                  <p className="text-3xl text-gray-900">{stats.totalLoans}</p>
                  <p className="text-xs text-green-600 mt-1">+12% dari bulan lalu</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Peminjaman Aktif</p>
                  <p className="text-3xl text-gray-900">{stats.activeLoans}</p>
                  <p className="text-xs text-gray-500 mt-1">{stats.overdueLoans} terlambat</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Member Baru</p>
                  <p className="text-3xl text-gray-900">{stats.newMembers}</p>
                  <p className="text-xs text-gray-500 mt-1">Total: {stats.totalMembers}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pengembalian</p>
                  <p className="text-3xl text-gray-900">{stats.returnedLoans}</p>
                  <p className="text-xs text-green-600 mt-1">72% tepat waktu</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Loans by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Peminjaman per Kategori</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loansByCategory.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">{item.count} peminjaman</span>
                        <Badge variant="outline">{item.percentage}%</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Borrowed Books */}
          <Card>
            <CardHeader>
              <CardTitle>Buku Paling Banyak Dipinjam</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topBorrowedBooks.map((book, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">{book.title}</p>
                      <p className="text-xs text-gray-500">{book.author}</p>
                    </div>
                    <Badge className="bg-indigo-100 text-indigo-700 border-0">
                      {book.loans}x
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Members */}
          <Card>
            <CardHeader>
              <CardTitle>Member Paling Aktif</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.loans} peminjaman</p>
                      </div>
                    </div>
                    {member.loans === member.returns ? (
                      <Badge className="bg-green-500">100% Return</Badge>
                    ) : (
                      <Badge className="bg-yellow-500">
                        {Math.round((member.returns / member.loans) * 100)}% Return
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Loan Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Tren Peminjaman 7 Hari Terakhir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { day: 'Senin', loans: 18, returns: 15 },
                  { day: 'Selasa', loans: 22, returns: 19 },
                  { day: 'Rabu', loans: 16, returns: 20 },
                  { day: 'Kamis', loans: 24, returns: 17 },
                  { day: 'Jumat', loans: 20, returns: 22 },
                  { day: 'Sabtu', loans: 28, returns: 14 },
                  { day: 'Minggu', loans: 12, returns: 18 },
                ].map((day, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{day.day}</span>
                      <div className="flex gap-4">
                        <span className="text-blue-600">{day.loans} pinjam</span>
                        <span className="text-green-600">{day.returns} kembali</span>
                      </div>
                    </div>
                    <div className="flex gap-2 h-2">
                      <div
                        className="bg-blue-500 rounded-full"
                        style={{ width: `${(day.loans / 30) * 100}%` }}
                      />
                      <div
                        className="bg-green-500 rounded-full"
                        style={{ width: `${(day.returns / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

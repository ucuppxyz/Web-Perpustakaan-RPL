import { useState } from 'react';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { toast } from 'sonner@2.0.3';
import { Printer, Download, Calendar, TrendingUp, BookOpen, Users, ShieldAlert, Filter } from 'lucide-react';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface LoanRecapPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
}

interface LoanRecord {
  id: number;
  memberName: string;
  bookTitle: string;
  borrowDate: string;
  returnDate: string;
  actualReturnDate?: string;
  status: 'borrowed' | 'returned' | 'overdue';
  fine?: number;
}

export function LoanRecapPage({ user, onLogout, onNavigate }: LoanRecapPageProps) {
  const [filterType, setFilterType] = useState<'daily' | 'monthly'>('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().substring(0, 7));

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="loan-recap">
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

  // Dummy loan records data
  const loanRecords: LoanRecord[] = [
    {
      id: 1,
      memberName: 'Ahmad Fauzi',
      bookTitle: 'The Lean Startup',
      borrowDate: '2026-01-01',
      returnDate: '2026-01-08',
      actualReturnDate: '2026-01-07',
      status: 'returned',
    },
    {
      id: 2,
      memberName: 'Siti Nurhaliza',
      bookTitle: 'Clean Code',
      borrowDate: '2025-12-28',
      returnDate: '2026-01-04',
      status: 'borrowed',
    },
    {
      id: 3,
      memberName: 'Budi Santoso',
      bookTitle: 'Atomic Habits',
      borrowDate: '2025-12-25',
      returnDate: '2026-01-01',
      actualReturnDate: '2026-01-03',
      status: 'returned',
      fine: 10000,
    },
    {
      id: 4,
      memberName: 'Dewi Lestari',
      bookTitle: 'Sapiens',
      borrowDate: '2025-12-20',
      returnDate: '2025-12-27',
      status: 'overdue',
      fine: 25000,
    },
    {
      id: 5,
      memberName: 'Rina Kusuma',
      bookTitle: 'Thinking, Fast and Slow',
      borrowDate: '2026-01-01',
      returnDate: '2026-01-08',
      status: 'borrowed',
    },
    {
      id: 6,
      memberName: 'Joko Widodo',
      bookTitle: 'The 7 Habits',
      borrowDate: '2025-12-15',
      returnDate: '2025-12-22',
      actualReturnDate: '2025-12-22',
      status: 'returned',
    },
    {
      id: 7,
      memberName: 'Ani Susanti',
      bookTitle: 'Rich Dad Poor Dad',
      borrowDate: '2025-12-10',
      returnDate: '2025-12-17',
      actualReturnDate: '2025-12-16',
      status: 'returned',
    },
  ];

  // Filter records based on selected period
  const filteredRecords = loanRecords.filter((record) => {
    if (filterType === 'daily') {
      return record.borrowDate === selectedDate || record.actualReturnDate === selectedDate;
    } else {
      const recordMonth = record.borrowDate.substring(0, 7);
      const returnMonth = record.actualReturnDate?.substring(0, 7);
      return recordMonth === selectedMonth || returnMonth === selectedMonth;
    }
  });

  // Calculate statistics
  const totalLoans = filteredRecords.length;
  const activeBorrows = filteredRecords.filter(r => r.status === 'borrowed').length;
  const returned = filteredRecords.filter(r => r.status === 'returned').length;
  const overdue = filteredRecords.filter(r => r.status === 'overdue').length;
  const totalFines = filteredRecords.reduce((sum, r) => sum + (r.fine || 0), 0);

  const handlePrint = () => {
    window.print();
    toast.success('Membuka dialog cetak...');
  };

  const handleExport = () => {
    toast.success('Rekap peminjaman berhasil di-export ke Excel');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="loan-recap">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 print:mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl print:hidden">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Rekap Peminjaman</h1>
              <p className="text-gray-600 print:hidden">Laporan peminjaman buku harian dan bulanan</p>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <Card className="mb-6 print:hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Periode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="filter-type">Tipe Filter</Label>
                <Select value={filterType} onValueChange={(value: 'daily' | 'monthly') => setFilterType(value)}>
                  <SelectTrigger id="filter-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Harian</SelectItem>
                    <SelectItem value="monthly">Bulanan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {filterType === 'daily' ? (
                <div className="space-y-2">
                  <Label htmlFor="selected-date">Tanggal</Label>
                  <Input
                    id="selected-date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="selected-month">Bulan</Label>
                  <Input
                    id="selected-month"
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  />
                </div>
              )}
              <div className="flex items-end gap-2">
                <Button
                  onClick={handlePrint}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 gap-2 flex-1"
                >
                  <Printer className="w-4 h-4" />
                  Cetak
                </Button>
                <Button
                  onClick={handleExport}
                  variant="outline"
                  className="gap-2 flex-1"
                >
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Print Header - Only visible when printing */}
        <div className="hidden print:block mb-6 text-center border-b-2 pb-4">
          <h2 className="text-2xl mb-2">Perpustakaan Digital</h2>
          <h3 className="text-xl">Rekap Peminjaman Buku</h3>
          <p className="text-sm text-gray-600 mt-2">
            Periode: {filterType === 'daily' 
              ? new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
              : new Date(selectedMonth + '-01').toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })
            }
          </p>
          <p className="text-sm text-gray-600">
            Dicetak: {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6 print:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Transaksi</p>
                  <p className="text-3xl print:text-2xl mt-1 text-gray-900">{totalLoans}</p>
                </div>
                <BookOpen className="w-10 h-10 print:w-8 print:h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-6 print:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sedang Dipinjam</p>
                  <p className="text-3xl print:text-2xl mt-1 text-gray-900">{activeBorrows}</p>
                </div>
                <Users className="w-10 h-10 print:w-8 print:h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6 print:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Dikembalikan</p>
                  <p className="text-3xl print:text-2xl mt-1 text-gray-900">{returned}</p>
                </div>
                <Calendar className="w-10 h-10 print:w-8 print:h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-6 print:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Terlambat</p>
                  <p className="text-3xl print:text-2xl mt-1 text-gray-900">{overdue}</p>
                </div>
                <ShieldAlert className="w-10 h-10 print:w-8 print:h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6 print:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Denda</p>
                  <p className="text-xl print:text-lg mt-1 text-gray-900">{formatCurrency(totalFines)}</p>
                </div>
                <TrendingUp className="w-10 h-10 print:w-8 print:h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Detail Peminjaman - {filterType === 'daily' ? 'Harian' : 'Bulanan'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Judul Buku</TableHead>
                    <TableHead>Tanggal Pinjam</TableHead>
                    <TableHead>Tanggal Jatuh Tempo</TableHead>
                    <TableHead>Tanggal Kembali</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Denda</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                        Tidak ada data peminjaman untuk periode ini
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.id}</TableCell>
                        <TableCell>{record.memberName}</TableCell>
                        <TableCell className="max-w-xs truncate">{record.bookTitle}</TableCell>
                        <TableCell>{new Date(record.borrowDate).toLocaleDateString('id-ID')}</TableCell>
                        <TableCell>{new Date(record.returnDate).toLocaleDateString('id-ID')}</TableCell>
                        <TableCell>
                          {record.actualReturnDate 
                            ? new Date(record.actualReturnDate).toLocaleDateString('id-ID')
                            : '-'
                          }
                        </TableCell>
                        <TableCell>
                          {record.status === 'borrowed' && (
                            <Badge className="bg-yellow-500">Dipinjam</Badge>
                          )}
                          {record.status === 'returned' && (
                            <Badge className="bg-green-500">Dikembalikan</Badge>
                          )}
                          {record.status === 'overdue' && (
                            <Badge className="bg-red-500">Terlambat</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {record.fine ? (
                            <span className="text-red-600">{formatCurrency(record.fine)}</span>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Print Footer - Only visible when printing */}
        <div className="hidden print:block mt-8 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <div>
              <p>Dicetak oleh: {user?.name}</p>
              <p>Email: {user?.email}</p>
            </div>
            <div className="text-right">
              <p>Perpustakaan Digital</p>
              <p>© 2026 All rights reserved</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          @page {
            margin: 1.5cm;
          }
        }
      `}</style>
    </Layout>
  );
}

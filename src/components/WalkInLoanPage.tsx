import { useState } from 'react';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { FileText, ShieldAlert, Plus, Search, UserPlus, BookOpen, Calendar, CheckCircle2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { getAllBooks } from '../data/books';
import { Textarea } from './ui/textarea';

interface WalkInLoanPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
}

export function WalkInLoanPage({ user, onLogout, onNavigate }: WalkInLoanPageProps) {
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [loanDuration, setLoanDuration] = useState('7');
  const [notes, setNotes] = useState('');
  const [searchBook, setSearchBook] = useState('');

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="walk-in-loan">
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

  const allBooks = getAllBooks();
  const availableBooks = allBooks.filter(book => book.available);
  const filteredBooks = availableBooks.filter(book =>
    book.title.toLowerCase().includes(searchBook.toLowerCase()) ||
    book.author.toLowerCase().includes(searchBook.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!memberName || !memberEmail || !selectedBook) {
      toast.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    toast.success('Peminjaman walk-in berhasil dicatat!', {
      description: `${memberName} meminjam buku untuk ${loanDuration} hari`,
    });

    // Reset form
    setMemberName('');
    setMemberEmail('');
    setMemberPhone('');
    setSelectedBook('');
    setLoanDuration('7');
    setNotes('');
    setSearchBook('');
  };

  const handleQuickFill = () => {
    setMemberName('Tamu Perpustakaan');
    setMemberEmail('guest@perpustakaan.com');
    setMemberPhone('0812-3456-7890');
    toast.info('Data tamu terisi otomatis');
  };

  // Calculate return date
  const calculateReturnDate = () => {
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + parseInt(loanDuration || '7'));
    return returnDate.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="walk-in-loan">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Form Peminjaman Walk-in</h1>
              <p className="text-gray-600">Input peminjaman untuk pengunjung yang datang langsung</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Data Peminjaman</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Member Info Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-gray-900">Data Pengunjung</h3>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={handleQuickFill}
                        className="text-indigo-600"
                      >
                        <UserPlus className="w-4 h-4 mr-1" />
                        Quick Fill
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="memberName">Nama Lengkap *</Label>
                        <Input
                          id="memberName"
                          value={memberName}
                          onChange={(e) => setMemberName(e.target.value)}
                          placeholder="Masukkan nama lengkap"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="memberEmail">Email *</Label>
                        <Input
                          id="memberEmail"
                          type="email"
                          value={memberEmail}
                          onChange={(e) => setMemberEmail(e.target.value)}
                          placeholder="email@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="memberPhone">Nomor Telepon</Label>
                        <Input
                          id="memberPhone"
                          type="tel"
                          value={memberPhone}
                          onChange={(e) => setMemberPhone(e.target.value)}
                          placeholder="0812-3456-7890"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="loanDuration">Durasi Peminjaman (hari) *</Label>
                        <Select value={loanDuration} onValueChange={setLoanDuration}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 Hari</SelectItem>
                            <SelectItem value="7">7 Hari (1 Minggu)</SelectItem>
                            <SelectItem value="14">14 Hari (2 Minggu)</SelectItem>
                            <SelectItem value="21">21 Hari (3 Minggu)</SelectItem>
                            <SelectItem value="30">30 Hari (1 Bulan)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Book Selection Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-gray-900">Pilih Buku</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="searchBook">Cari Buku</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="searchBook"
                          value={searchBook}
                          onChange={(e) => setSearchBook(e.target.value)}
                          placeholder="Cari berdasarkan judul atau penulis..."
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="selectedBook">Buku yang Dipinjam *</Label>
                      <Select value={selectedBook} onValueChange={setSelectedBook}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih buku yang akan dipinjam" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredBooks.slice(0, 50).map((book) => (
                            <SelectItem key={book.id} value={book.id.toString()}>
                              {book.title} - {book.author} ({book.year})
                            </SelectItem>
                          ))}
                          {filteredBooks.length > 50 && (
                            <SelectItem value="more" disabled>
                              ... dan {filteredBooks.length - 50} buku lainnya
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">
                        {filteredBooks.length} buku tersedia
                      </p>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Catatan (opsional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Catatan tambahan tentang peminjaman..."
                      rows={3}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onNavigate('home')}
                      className="flex-1"
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Proses Peminjaman
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4 sticky top-24">
              {/* Loan Summary */}
              <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="text-gray-900">Ringkasan Peminjaman</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nama Peminjam</p>
                    <p className="text-gray-900">{memberName || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="text-gray-900 text-sm">{memberEmail || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Buku</p>
                    <p className="text-gray-900">
                      {selectedBook
                        ? allBooks.find(b => b.id.toString() === selectedBook)?.title || '-'
                        : '-'}
                    </p>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      <p className="text-sm text-gray-600">Tanggal Pinjam</p>
                    </div>
                    <p className="text-gray-900">
                      {new Date().toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-red-600" />
                      <p className="text-sm text-gray-600">Tanggal Kembali</p>
                    </div>
                    <p className="text-gray-900">{calculateReturnDate()}</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-gray-600 mb-1">Durasi</p>
                    <p className="text-xl text-indigo-600">{loanDuration} Hari</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Statistik Hari Ini</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Peminjaman</span>
                    <span className="text-lg text-indigo-600">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pengembalian</span>
                    <span className="text-lg text-green-600">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Buku Tersedia</span>
                    <span className="text-lg text-blue-600">{availableBooks.length}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="text-blue-600 flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-blue-900 mb-1">💡 Tips</p>
                      <p className="text-xs text-blue-800">
                        Pastikan data pengunjung terisi dengan benar untuk memudahkan follow-up pengembalian buku.
                      </p>
                    </div>
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

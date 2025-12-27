import { useState } from 'react';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { History, Calendar, CheckCircle, Star, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface HistoryPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
}

interface HistoryItem {
  id: number;
  bookTitle: string;
  bookAuthor: string;
  bookImage: string;
  borrowDate: string;
  returnDate: string;
  rating?: number;
  category: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: 1,
    bookTitle: 'Membaca Dunia',
    bookAuthor: 'Rahman Susilo',
    bookImage:
      'https://images.unsplash.com/photo-1660479123634-2c700dfbbbdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwYm9vayUyMHJlYWRpbmd8ZW58MXx8fHwxNzYyMTY4ODUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    borrowDate: '15 Okt 2024',
    returnDate: '29 Okt 2024',
    rating: 5,
    category: 'Referensi',
  },
  {
    id: 2,
    bookTitle: 'Koleksi Literatur',
    bookAuthor: 'Maya Sari',
    bookImage:
      'https://images.unsplash.com/photo-1761319114926-ef932912fa37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwc2hlbGYlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2MjI0Nzc3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    borrowDate: '1 Okt 2024',
    returnDate: '14 Okt 2024',
    rating: 4,
    category: 'Fiksi',
  },
  {
    id: 3,
    bookTitle: 'Perpustakaan Modern',
    bookAuthor: 'Ahmad Wijaya',
    bookImage:
      'https://images.unsplash.com/photo-1660606422342-2ce59709bb14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWJyYXJ5JTIwYm9va3N8ZW58MXx8fHwxNzYyMTYxMjg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    borrowDate: '10 Sep 2024',
    returnDate: '24 Sep 2024',
    rating: 5,
    category: 'Referensi',
  },
  {
    id: 4,
    bookTitle: 'Cerita Anak Ceria',
    bookAuthor: 'Lina Maharani',
    bookImage:
      'https://images.unsplash.com/photo-1631426964394-06606872d836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJvb2tzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzYyMjQ3NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    borrowDate: '25 Agust 2024',
    returnDate: '8 Sep 2024',
    rating: 5,
    category: 'Anak',
  },
  {
    id: 5,
    bookTitle: 'Sejarah Nusantara',
    bookAuthor: 'Prof. Rina Kusuma',
    bookImage:
      'https://images.unsplash.com/photo-1491841651911-c44c30c34548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9va3N8ZW58MXx8fHwxNzYyMjAzOTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    borrowDate: '1 Agust 2024',
    returnDate: '15 Agust 2024',
    rating: 4,
    category: 'Sejarah',
  },
];

export function HistoryPage({ user, onLogout, onNavigate }: HistoryPageProps) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filteredHistory = mockHistory
    .filter((item) => filterCategory === 'all' || item.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0; // recent is default
    });

  const categories = ['all', ...Array.from(new Set(mockHistory.map((h) => h.category)))];
  const averageRating =
    mockHistory.reduce((acc, item) => acc + (item.rating || 0), 0) / mockHistory.length;

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="history">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <History className="w-8 h-8 text-indigo-600" />
              <h1>Riwayat Peminjaman</h1>
            </div>
            <p className="text-gray-600">
              Anda telah membaca {mockHistory.length} buku sepanjang masa
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{mockHistory.length}</p>
                    <p className="text-sm text-gray-600">Buku Selesai</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl">{averageRating.toFixed(1)}</p>
                    <p className="text-sm text-gray-600">Rating Rata-rata</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl">3</p>
                    <p className="text-sm text-gray-600">Bulan Ini</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6 border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-2 flex-1">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Filter:</span>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      {categories
                        .filter((c) => c !== 'all')
                        .map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Urutkan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Terbaru</SelectItem>
                      <SelectItem value="rating">Rating Tertinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* History List */}
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <Card key={item.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-20 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={item.bookImage}
                        alt={item.bookTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="mb-1">{item.bookTitle}</h3>
                          <p className="text-sm text-gray-600">{item.bookAuthor}</p>
                        </div>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.borrowDate} - {item.returnDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {item.rating && (
                            <>
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < item.rating!
                                      ? 'text-yellow-500 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-600 ml-2">
                                {item.rating}.0
                              </span>
                            </>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onNavigate('collection')}
                        >
                          Baca Lagi
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reading Stats Card */}
          <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-0">
            <CardHeader>
              <CardTitle>📊 Statistik Membaca Anda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl text-indigo-600 mb-1">{mockHistory.length}</p>
                  <p className="text-sm text-gray-600">Total Buku</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-indigo-600 mb-1">
                    {mockHistory.filter((h) => h.rating === 5).length}
                  </p>
                  <p className="text-sm text-gray-600">Rating 5 ⭐</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-indigo-600 mb-1">
                    {categories.length - 1}
                  </p>
                  <p className="text-sm text-gray-600">Kategori</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-indigo-600 mb-1">3</p>
                  <p className="text-sm text-gray-600">Bulan Aktif</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

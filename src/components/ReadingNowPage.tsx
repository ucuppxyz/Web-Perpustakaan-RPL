import { useState } from 'react';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { BookOpen, Clock, ChevronRight, Bookmark, TrendingUp, Target, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface ReadingNowPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
}

interface ReadingBook {
  id: number;
  title: string;
  author: string;
  category: string;
  image: string;
  currentPage: number;
  totalPages: number;
  lastRead: string;
  estimatedTimeLeft: string;
  startedDate: string;
}

const mockReadingBooks: ReadingBook[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiksi',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
    currentPage: 87,
    totalPages: 180,
    lastRead: '2 jam yang lalu',
    estimatedTimeLeft: '3 jam 20 menit',
    startedDate: '25 Okt 2024',
  },
  {
    id: 2,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'Sejarah',
    image: 'https://images.unsplash.com/photo-1491841651911-c44c30c34548?w=400',
    currentPage: 145,
    totalPages: 464,
    lastRead: '1 hari yang lalu',
    estimatedTimeLeft: '8 jam 15 menit',
    startedDate: '20 Okt 2024',
  },
  {
    id: 3,
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Teknologi',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
    currentPage: 56,
    totalPages: 320,
    lastRead: '3 hari yang lalu',
    estimatedTimeLeft: '6 jam 40 menit',
    startedDate: '15 Okt 2024',
  },
];

export function ReadingNowPage({ user, onLogout, onNavigate }: ReadingNowPageProps) {
  const [readingBooks] = useState(mockReadingBooks);

  const totalBooksReading = readingBooks.length;
  const averageProgress = Math.round(
    readingBooks.reduce((sum, book) => sum + (book.currentPage / book.totalPages) * 100, 0) / totalBooksReading
  );
  const totalPagesRead = readingBooks.reduce((sum, book) => sum + book.currentPage, 0);

  const handleContinueReading = (book: ReadingBook) => {
    toast.success(`Melanjutkan membaca "${book.title}"`, {
      description: `Halaman ${book.currentPage} dari ${book.totalPages}`,
    });
    onNavigate('reader', book.id);
  };

  const handleRemoveFromReading = (bookId: number) => {
    const book = readingBooks.find((b) => b.id === bookId);
    if (book) {
      toast.success(`"${book.title}" dihapus dari daftar bacaan`);
    }
  };

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="home">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-12 text-white shadow-2xl">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-10 h-10" />
                <h1 className="mb-0">Sedang Dibaca</h1>
              </div>
              <p className="text-lg mb-6 max-w-2xl opacity-90">
                Lanjutkan petualangan membaca Anda! {totalBooksReading} buku menunggu untuk diselesaikan.
              </p>
              <div className="flex gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm opacity-90 mb-1">Total Halaman Dibaca</p>
                  <p className="text-3xl">{totalPagesRead.toLocaleString()}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm opacity-90 mb-1">Rata-rata Progress</p>
                  <p className="text-3xl">{averageProgress}%</p>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
              <Bookmark className="w-full h-full" />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Buku Aktif</p>
                    <p className="text-4xl mb-0">{totalBooksReading}</p>
                  </div>
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-7 h-7" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Waktu Baca Hari Ini</p>
                    <p className="text-4xl mb-0">2.5<span className="text-xl">j</span></p>
                  </div>
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock className="w-7 h-7" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-pink-500 to-pink-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Target Mingguan</p>
                    <p className="text-4xl mb-0">78<span className="text-xl">%</span></p>
                  </div>
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Target className="w-7 h-7" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reading Books */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900 mb-0">Daftar Bacaan Aktif</h2>
              <Button
                variant="outline"
                onClick={() => onNavigate('collection')}
                className="gap-2"
              >
                Tambah Buku
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {readingBooks.length > 0 ? (
              <div className="space-y-6">
                {readingBooks.map((book, index) => {
                  const progress = (book.currentPage / book.totalPages) * 100;
                  return (
                    <Card
                      key={book.id}
                      className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white"
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Book Image */}
                          <div className="relative w-full md:w-48 h-64 md:h-auto flex-shrink-0 overflow-hidden bg-gray-200">
                            <ImageWithFallback
                              src={book.image}
                              alt={book.title}
                              className="w-full h-full object-cover"
                            />
                            <Badge className="absolute top-3 left-3 bg-indigo-600 border-0">
                              #{index + 1}
                            </Badge>
                          </div>

                          {/* Book Info */}
                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <Badge variant="outline" className="mb-2">
                                  {book.category}
                                </Badge>
                                <h3 className="mb-2">{book.title}</h3>
                                <p className="text-gray-600 mb-3">oleh {book.author}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>Terakhir dibaca {book.lastRead}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Bookmark className="w-4 h-4" />
                                    <span>Dimulai {book.startedDate}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Progress Section */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm">
                                  Halaman {book.currentPage} dari {book.totalPages}
                                </span>
                                <span className="text-sm font-medium text-indigo-600">
                                  {Math.round(progress)}%
                                </span>
                              </div>
                              <Progress value={progress} className="h-2" />
                              <p className="text-xs text-gray-500 mt-2">
                                Estimasi waktu tersisa: {book.estimatedTimeLeft}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                              <Button
                                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                                onClick={() => handleContinueReading(book)}
                              >
                                <BookOpen className="w-4 h-4 mr-2" />
                                Lanjutkan Membaca
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleRemoveFromReading(book.id)}
                              >
                                Hapus
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-500 mb-2">Belum ada buku yang sedang dibaca</h3>
                  <p className="text-gray-400 mb-6">
                    Mulai petualangan membaca Anda dengan memilih buku dari koleksi kami
                  </p>
                  <Button
                    onClick={() => onNavigate('collection')}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600"
                  >
                    Jelajahi Koleksi
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Reading Achievement */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2">Pencapaian Minggu Ini 🎉</h3>
                  <p className="text-gray-600 mb-4">
                    Luar biasa! Anda telah membaca 245 halaman minggu ini. Tingkatkan 55 halaman lagi untuk mencapai target mingguan Anda!
                  </p>
                  <div className="flex gap-2">
                    <Badge className="bg-amber-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +25% dari minggu lalu
                    </Badge>
                    <Badge variant="outline">3 buku dalam progress</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

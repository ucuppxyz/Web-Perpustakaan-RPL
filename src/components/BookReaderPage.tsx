import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Star, Heart, Download, Share2, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { getBookById, type Book } from '../data/books';
import { toast } from 'sonner@2.0.3';

interface BookReaderPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
  bookId: number;
}

export function BookReaderPage({ user, onLogout, onNavigate, bookId }: BookReaderPageProps) {
  const [book, setBook] = useState<Book | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const foundBook = getBookById(bookId);
    if (foundBook) {
      setBook(foundBook);
    }
  }, [bookId]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? `"${book?.title}" dihapus dari favorit` : `"${book?.title}" ditambahkan ke favorit`
    );
  };

  const handleDownload = () => {
    if (book?.pdfUrl) {
      window.open(book.pdfUrl, '_blank');
      toast.success('Membuka halaman download buku');
    }
  };

  const handleShare = () => {
    toast.success('Link buku disalin ke clipboard!');
  };

  const handleAddToReading = () => {
    toast.success(`"${book?.title}" ditambahkan ke daftar bacaan`, {
      description: 'Anda bisa melanjutkan membaca kapan saja',
    });
  };

  if (!book) {
    return (
      <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="home">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-500 mb-2">Buku tidak ditemukan</h3>
            <Button onClick={() => onNavigate('home')} className="mt-4">
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="home">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => onNavigate('home')}
          className="mb-6 gap-2 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Book Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 shadow-xl border-0">
              <CardContent className="p-6">
                <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={toggleFavorite}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="mb-2 text-gray-900">{book.title}</h2>
                  <p className="text-gray-600 mb-3">{book.author}</p>
                  <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 mb-3">
                    {book.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-yellow-500 mb-4">
                    <Star className="w-5 h-5 fill-current" />
                    <span>{book.rating}</span>
                    <span className="text-xs text-gray-400">(256 ulasan)</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Halaman:</span>
                    <span>{book.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tahun Terbit:</span>
                    <span>{book.year > 0 ? book.year : `${Math.abs(book.year)} SM`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge variant="outline" className="border-green-500 text-green-700">
                      Tersedia
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={handleAddToReading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Tambah ke Daftar Baca
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={handleDownload} className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button variant="outline" onClick={handleShare} className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Bagikan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Book Reader */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">Baca Buku</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoom(Math.max(50, zoom - 10))}
                      disabled={zoom <= 50}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-gray-600 min-w-[60px] text-center">
                      {zoom}%
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoom(Math.min(200, zoom + 10))}
                      disabled={zoom >= 200}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 min-h-[600px]">
                  {book.pdfUrl ? (
                    <div className="bg-white rounded-lg shadow-inner p-6">
                      <iframe
                        src={book.pdfUrl}
                        className="w-full h-[700px] border-0 rounded-lg"
                        title={book.title}
                        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-12">
                      <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
                      <h3 className="text-gray-500 mb-2">Konten Buku</h3>
                      <p className="text-gray-400 text-center max-w-md mb-6">
                        {book.description}
                      </p>
                      <p className="text-sm text-gray-500 text-center max-w-lg">
                        Ini adalah tampilan preview. Untuk membaca buku secara lengkap, silakan download file PDF atau lanjutkan membaca online.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Book Description */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-4">Tentang Buku</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{book.description}</p>
                <div className="border-t pt-4">
                  <h4 className="mb-3 text-gray-900">Detail Tambahan</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      Buku ini merupakan karya klasik yang telah dibaca oleh jutaan pembaca di
                      seluruh dunia. Dengan rating {book.rating}/5, buku ini sangat direkomendasikan
                      untuk siapa saja yang tertarik dengan kategori {book.category.toLowerCase()}.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import { useState } from 'react';
import { Search, Star, Heart, BookOpen, ArrowLeft } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { toast } from 'sonner@2.0.3';
import { getBooksByCategory, type Book } from '../data/books';

interface BookCategoryPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
  category: string;
}

export type { Book };

export function BookCategoryPage({ user, onLogout, onNavigate, category }: BookCategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  const categoryBooks = getBooksByCategory(category);
  const filteredBooks = categoryBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (bookId: number) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
    const book = categoryBooks.find((b) => b.id === bookId);
    if (book) {
      toast.success(
        favorites.includes(bookId)
          ? `"${book.title}" dihapus dari favorit`
          : `"${book.title}" ditambahkan ke favorit`
      );
    }
  };

  const handleReadBook = (book: Book) => {
    onNavigate('reader' as Page, book.id);
  };

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="home">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => onNavigate('home')}
            className="mb-6 gap-2 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Button>

          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Kategori: {category}</h1>
              <p className="text-gray-600">{categoryBooks.length} buku tersedia</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Cari judul buku atau penulis..."
              className="pl-12 pr-4 py-6 w-full shadow-lg border-2 border-transparent focus:border-indigo-400 bg-white rounded-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Card
                key={book.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-0 shadow-lg"
              >
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <ImageWithFallback
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(book.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        favorites.includes(book.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>
                <CardContent className="p-5">
                  <div className="mb-3">
                    <h3 className="mb-1 line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{book.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 mb-3">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">{book.rating}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{book.pages} halaman</span>
                    <span>{book.year > 0 ? book.year : `${Math.abs(book.year)} SM`}</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleReadBook(book)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0 gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Baca Sekarang
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-500 mb-2">Tidak ada buku ditemukan</h3>
            <p className="text-gray-400">Coba ubah kata kunci pencarian Anda</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

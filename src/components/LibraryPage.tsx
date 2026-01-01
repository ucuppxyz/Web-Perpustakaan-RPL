import { useState } from 'react';
import { Search, TrendingUp, Star, Clock, Sparkles, BookOpen, Heart, Users } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { toast } from 'sonner@2.0.3';
import { getTrendingBooks, getPopularBooks, searchBooks, getStatistics, getBooksByCategory, type Book } from '../data/books';

interface LibraryPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
}



export function LibraryPage({ user, onLogout, onNavigate }: LibraryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Trending');
  const [favorites, setFavorites] = useState<number[]>([]);

  const stats = getStatistics();
  const trendingBooks = getTrendingBooks().slice(0, 12);
  const popularBooks = getPopularBooks().slice(0, 12);
  
  const categories = [
    { name: 'Trending', icon: TrendingUp, count: getTrendingBooks().length },
    { name: 'Populer', icon: Star, count: getPopularBooks().length },
    { name: 'Fiksi', icon: Sparkles, count: stats.categoryCount.Fiksi },
    { name: 'Sains', icon: TrendingUp, count: stats.categoryCount.Sains },
    { name: 'Sejarah', icon: Clock, count: stats.categoryCount.Sejarah },
    { name: 'Teknologi', icon: BookOpen, count: stats.categoryCount.Teknologi },
    { name: 'Anak', icon: Sparkles, count: stats.categoryCount.Anak },
  ];

  const getDisplayBooks = () => {
    if (selectedCategory === 'Trending') return trendingBooks;
    if (selectedCategory === 'Populer') return popularBooks;
    return getBooksByCategory(selectedCategory).slice(0, 12);
  };

  const displayBooks = getDisplayBooks();

  const toggleFavorite = (bookId: number) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
    const allBooks = [...trendingBooks, ...popularBooks];
    const book = allBooks.find((b) => b.id === bookId);
    if (book) {
      toast.success(
        favorites.includes(bookId)
          ? `\"${book.title}\" dihapus dari favorit`
          : `\"${book.title}\" ditambahkan ke favorit`
      );
    }
  };

  const handleReadBook = (bookId: number) => {
    onNavigate('reader' as Page, bookId);
  };

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="home">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-12 text-white shadow-2xl">
          <div className="relative z-10">
            <h1 className="mb-4 max-w-2xl">Selamat Datang, {user?.name}! 👋</h1>
            <p className="text-lg mb-6 max-w-xl opacity-90">
              Jelajahi ribuan buku digital dari berbagai kategori. Temukan buku favoritmu dan mulai petualangan
              membaca hari ini!
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={() => onNavigate('collection')}
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                Jelajahi Koleksi
              </Button>
              <Button
                size="lg"
                onClick={() => onNavigate('reading-now' as Page)}
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                Sedang Dibaca
              </Button>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
            <BookOpen className="w-full h-full" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Cari judul buku, penulis, atau kategori..."
              className="pl-12 pr-32 py-6 w-full shadow-lg border-2 border-transparent focus:border-indigo-400 bg-white rounded-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              onClick={() => onNavigate('advanced-search')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              Pencarian Lanjutan
            </Button>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-8">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  onClick={() => {
                    if (category.name === 'Trending' || category.name === 'Populer') {
                      setSelectedCategory(category.name);
                    } else {
                      onNavigate('category' as Page, category.name);
                    }
                  }}
                  className={`gap-2 flex-shrink-0 ${
                    selectedCategory === category.name
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                  <Badge variant="secondary" className={selectedCategory === category.name ? 'ml-1 bg-white/20 text-white' : 'ml-1 bg-gray-100'}>
                    {category.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Books Grid */}
        <div className="mb-8">
          <h2 className="text-gray-900 mb-6">{selectedCategory}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onRead={handleReadBook}
                isFavorite={favorites.includes(book.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <BookOpen className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-3xl mb-1">{stats.totalBooks.toLocaleString()}</p>
              <p className="text-sm opacity-90">Total Buku</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-3xl mb-1">{stats.categoriesCount}</p>
              <p className="text-sm opacity-90">Kategori Buku</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <Users className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-3xl mb-1">1,892</p>
              <p className="text-sm opacity-90">Pembaca Aktif</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <Clock className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-3xl mb-1">24/7</p>
              <p className="text-sm opacity-90">Akses Online</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

interface BookCardProps {
  book: Book;
  onRead: (bookId: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (bookId: number) => void;
}

function BookCard({ book, onRead, isFavorite, onToggleFavorite }: BookCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-0 shadow-lg">
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <ImageWithFallback
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(book.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
        {book.trending && (
          <Badge className="absolute top-3 left-3 bg-red-500 border-0 shadow-md">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </Badge>
        )}
        {book.popular && !book.trending && (
          <Badge className="absolute top-3 left-3 bg-yellow-500 border-0 shadow-md text-gray-900">
            <Star className="w-3 h-3 mr-1" />
            Populer
          </Badge>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="mb-1 line-clamp-1">{book.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{book.author}</p>
            <p className="text-xs text-gray-500 line-clamp-2">{book.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-yellow-500 mb-4">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm">{book.rating}</span>
          <span className="text-xs text-gray-400 ml-1">(125 ulasan)</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="border-indigo-200 text-indigo-700">
            {book.category}
          </Badge>
          <Button
            size="sm"
            onClick={() => onRead(book.id)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0"
          >
            Baca Buku
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
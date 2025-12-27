import { useState } from 'react';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { Search, Grid3x3, List, Star, Heart, BookOpen, TrendingUp, Clock } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { searchBooks, getStatistics, type Book } from '../data/books';

interface CollectionPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
}

export function CollectionPage({ user, onLogout, onNavigate }: CollectionPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);

  const stats = getStatistics();
  const allBooks = searchBooks('');

  const filteredAndSortedBooks = allBooks
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || book.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'year') return b.year - a.year;
      return 0;
    });

  const categories = ['all', 'Fiksi', 'Sains', 'Sejarah', 'Teknologi', 'Anak'];

  const handleReadBook = (book: Book) => {
    if (book.pdfUrl) {
      onNavigate('reader', book.id);
    } else {
      toast.info(`\"${book.title}\" belum tersedia untuk dibaca online`);
    }
  };

  const toggleFavorite = (bookId: number) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
    const action = favorites.includes(bookId) ? 'dihapus dari' : 'ditambahkan ke';
    toast.success(`Buku ${action} favorit`);
  };

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="collection">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2">Jelajahi Koleksi</h1>
            <p className="text-gray-600">
              Temukan dari {stats.totalBooks.toLocaleString()}+ buku digital berkualitas
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-10 h-10 opacity-80" />
                  <div>
                    <p className="text-2xl mb-0">{stats.totalBooks.toLocaleString()}</p>
                    <p className="text-xs opacity-90">Total Buku</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-10 h-10 opacity-80" />
                  <div>
                    <p className="text-2xl mb-0">{stats.categoriesCount}</p>
                    <p className="text-xs opacity-90">Kategori</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Star className="w-10 h-10 opacity-80" />
                  <div>
                    <p className="text-2xl mb-0">{stats.authorsCount}</p>
                    <p className="text-xs opacity-90">Penulis</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-10 h-10 opacity-80" />
                  <div>
                    <p className="text-2xl mb-0">24/7</p>
                    <p className="text-xs opacity-90">Akses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Cari judul atau penulis..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-indigo-400"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full md:w-48 h-12 border-2 border-gray-200">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories.filter((c) => c !== 'all').map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48 h-12 border-2 border-gray-200">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Judul (A-Z)</SelectItem>
                    <SelectItem value="rating">Rating Tertinggi</SelectItem>
                    <SelectItem value="year">Tahun Terbaru</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="h-12 w-12"
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="h-12 w-12"
                  >
                    <List className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Menampilkan <span className="font-medium text-indigo-600">{filteredAndSortedBooks.length}</span> buku
              {filterCategory !== 'all' && <span> dalam kategori <span className="font-medium text-indigo-600">{filterCategory}</span></span>}
            </p>
          </div>

          {/* Books Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAndSortedBooks.map((book) => (
                <Card key={book.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg bg-white">
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <ImageWithFallback
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <button
                      onClick={() => toggleFavorite(book.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md z-10"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          favorites.includes(book.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                        }`}
                      />
                    </button>
                    {book.pdfUrl && (
                      <Badge className="absolute top-3 left-3 bg-green-500 border-0 shadow-md text-xs">
                        Bisa Dibaca
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {book.category}
                    </Badge>
                    <h3 className="mb-1 line-clamp-2 text-sm group-hover:text-indigo-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-1">{book.author}</p>
                    <div className="flex items-center gap-1 text-yellow-500 mb-3">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs">{book.rating}</span>
                      <span className="text-xs text-gray-400 ml-1">• {book.year}</span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full text-xs h-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      onClick={() => handleReadBook(book)}
                      disabled={!book.pdfUrl}
                    >
                      {book.pdfUrl ? 'Baca Buku' : 'Belum Tersedia'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedBooks.map((book) => (
                <Card key={book.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="relative w-32 h-44 flex-shrink-0 overflow-hidden rounded-lg shadow-md">
                        <ImageWithFallback src={book.image} alt={book.title} className="w-full h-full object-cover" />
                        {book.pdfUrl && (
                          <Badge className="absolute top-2 left-2 bg-green-500 border-0 text-white shadow-md text-xs">
                            Bisa Dibaca
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{book.category}</Badge>
                            </div>
                            <h3 className="mb-2 text-lg">{book.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">oleh {book.author}</p>
                            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{book.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span>{book.rating}</span>
                              </div>
                              <span>•</span>
                              <span>{book.year}</span>
                              <span>•</span>
                              <span>{book.pages} halaman</span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleFavorite(book.id)}
                            className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Heart
                              className={`w-6 h-6 transition-colors ${
                                favorites.includes(book.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
                              }`}
                            />
                          </button>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                            onClick={() => handleReadBook(book)}
                            disabled={!book.pdfUrl}
                          >
                            <BookOpen className="w-4 h-4 mr-2" />
                            {book.pdfUrl ? 'Baca Online' : 'Belum Tersedia'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

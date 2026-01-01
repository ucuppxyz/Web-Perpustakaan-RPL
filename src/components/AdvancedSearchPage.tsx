import { useState } from 'react';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Search, Filter, BookOpen, Star, Heart, SlidersHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { getAllBooks } from '../data/books';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface AdvancedSearchPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
}

export function AdvancedSearchPage({ user, onLogout, onNavigate }: AdvancedSearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [minRating, setMinRating] = useState('0');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(true);

  const allBooks = getAllBooks();

  // Apply filters
  let filteredBooks = allBooks.filter(book => {
    const matchesQuery = searchQuery === '' ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;

    const bookYear = book.year.toString();
    const matchesYear = selectedYear === 'all' ||
      (selectedYear === '2020+' && book.year >= 2020) ||
      (selectedYear === '2010-2019' && book.year >= 2010 && book.year < 2020) ||
      (selectedYear === '2000-2009' && book.year >= 2000 && book.year < 2010) ||
      (selectedYear === 'before-2000' && book.year < 2000);

    const matchesRating = book.rating >= parseFloat(minRating);

    return matchesQuery && matchesCategory && matchesYear && matchesRating;
  });

  // Apply sorting
  switch (sortBy) {
    case 'title-asc':
      filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title-desc':
      filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'rating-desc':
      filteredBooks.sort((a, b) => b.rating - a.rating);
      break;
    case 'year-desc':
      filteredBooks.sort((a, b) => b.year - a.year);
      break;
    case 'year-asc':
      filteredBooks.sort((a, b) => a.year - b.year);
      break;
  }

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedYear('all');
    setMinRating('0');
    setSortBy('relevance');
    toast.info('Filter direset');
  };

  const handleReadBook = (bookId: number) => {
    onNavigate('reader', bookId);
  };

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="advanced-search">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl">
              <Search className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Pencarian Lanjutan</h1>
              <p className="text-gray-600">Temukan buku dengan filter dan sorting yang detail</p>
            </div>
          </div>

          {/* Main Search */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari berdasarkan judul, penulis, atau deskripsi buku..."
                  className="pl-12 pr-4 py-6 text-lg"
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-600">
                  Ditemukan <span className="text-indigo-600">{filteredBooks.length}</span> buku
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {showFilters ? 'Sembunyikan' : 'Tampilkan'} Filter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1 space-y-4">
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Filter</CardTitle>
                    <Button size="sm" variant="ghost" onClick={handleReset}>
                      Reset
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Category Filter */}
                  <div className="space-y-2">
                    <Label>Kategori</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Kategori</SelectItem>
                        <SelectItem value="Fiksi">Fiksi</SelectItem>
                        <SelectItem value="Sains">Sains</SelectItem>
                        <SelectItem value="Sejarah">Sejarah</SelectItem>
                        <SelectItem value="Teknologi">Teknologi</SelectItem>
                        <SelectItem value="Anak">Anak</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Year Filter */}
                  <div className="space-y-2">
                    <Label>Tahun Terbit</Label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Tahun</SelectItem>
                        <SelectItem value="2020+">2020 ke atas</SelectItem>
                        <SelectItem value="2010-2019">2010 - 2019</SelectItem>
                        <SelectItem value="2000-2009">2000 - 2009</SelectItem>
                        <SelectItem value="before-2000">Sebelum 2000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating Filter */}
                  <div className="space-y-2">
                    <Label>Rating Minimal</Label>
                    <Select value={minRating} onValueChange={setMinRating}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Semua Rating</SelectItem>
                        <SelectItem value="4.5">⭐ 4.5+</SelectItem>
                        <SelectItem value="4.0">⭐ 4.0+</SelectItem>
                        <SelectItem value="3.5">⭐ 3.5+</SelectItem>
                        <SelectItem value="3.0">⭐ 3.0+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort */}
                  <div className="space-y-2">
                    <Label>Urutkan Berdasarkan</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevansi</SelectItem>
                        <SelectItem value="title-asc">Judul (A-Z)</SelectItem>
                        <SelectItem value="title-desc">Judul (Z-A)</SelectItem>
                        <SelectItem value="rating-desc">Rating Tertinggi</SelectItem>
                        <SelectItem value="year-desc">Terbaru</SelectItem>
                        <SelectItem value="year-asc">Terlama</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results */}
          <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.slice(0, 24).map((book) => (
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
                      {book.trending && (
                        <Badge className="absolute top-3 left-3 bg-red-500 border-0 shadow-md">
                          Trending
                        </Badge>
                      )}
                      {book.popular && !book.trending && (
                        <Badge className="absolute top-3 left-3 bg-yellow-500 border-0 shadow-md text-gray-900">
                          Populer
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="mb-1 line-clamp-2">{book.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                          <p className="text-xs text-gray-500 line-clamp-2">{book.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500 mb-3">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm">{book.rating}</span>
                        <span className="text-xs text-gray-400 ml-2">• {book.year}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="outline" className="border-indigo-200 text-indigo-700">
                          {book.category}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => handleReadBook(book.id)}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0"
                        >
                          Baca Buku
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-gray-900 mb-2">Tidak ada buku ditemukan</h3>
                  <p className="text-gray-600 mb-4">
                    Coba ubah filter atau kata kunci pencarian Anda
                  </p>
                  <Button onClick={handleReset} variant="outline">
                    Reset Filter
                  </Button>
                </CardContent>
              </Card>
            )}

            {filteredBooks.length > 24 && (
              <p className="text-center text-gray-500 mt-8">
                Menampilkan 24 dari {filteredBooks.length} buku. Gunakan filter untuk mempersempit hasil.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

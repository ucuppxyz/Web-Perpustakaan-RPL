import { useState } from 'react';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { Heart, Star, Trash2, BookOpen } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface FavoritesPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
}

interface FavoriteBook {
  id: number;
  title: string;
  author: string;
  category: string;
  rating: number;
  image: string;
  available: boolean;
  addedDate: string;
}

const mockFavorites: FavoriteBook[] = [
  {
    id: 2,
    title: 'Petualangan Fiksi',
    author: 'Sarah Putri',
    category: 'Fiksi',
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1661936901394-a993c79303c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBmaWN0aW9ufGVufDF8fHx8MTc2MjE1NTc1NHww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    addedDate: '2 Nov 2024',
  },
  {
    id: 3,
    title: 'Sains & Teknologi',
    author: 'Dr. Budi Santoso',
    category: 'Sains',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1725869973689-425c74f79a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwdGV4dGJvb2t8ZW58MXx8fHwxNzYyMTUzNzkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    addedDate: '1 Nov 2024',
  },
  {
    id: 6,
    title: 'Cerita Anak Ceria',
    author: 'Lina Maharani',
    category: 'Anak',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1631426964394-06606872d836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJvb2tzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzYyMjQ3NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    addedDate: '31 Okt 2024',
  },
];

export function FavoritesPage({ user, onLogout, onNavigate }: FavoritesPageProps) {
  const [favorites, setFavorites] = useState(mockFavorites);

  const handleRemove = (bookId: number) => {
    const book = favorites.find((f) => f.id === bookId);
    if (book) {
      setFavorites(favorites.filter((f) => f.id !== bookId));
      toast.success(`\"${book.title}\" dihapus dari favorit`);
    }
  };

  const handleReadBook = (book: FavoriteBook) => {
    onNavigate('reader', book.id);
  };

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="favorites">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
            <h1>Buku Favorit</h1>
          </div>
          <p className="text-gray-600">
            Anda memiliki {favorites.length} buku dalam daftar favorit
          </p>
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((book) => (
              <Card
                key={book.id}
                className="overflow-hidden hover:shadow-xl transition-all group border-0 shadow-lg"
              >
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <ImageWithFallback
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => handleRemove(book.id)}
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
                      Ditambahkan {book.addedDate}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                  <div className="flex items-center gap-1 text-yellow-500 mb-4">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">{book.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">(125 ulasan)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex-1 justify-center">
                      {book.category}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => handleReadBook(book)}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600"
                    >
                      <BookOpen className="w-4 h-4 mr-1" />
                      Baca
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-500 mb-2">Belum ada buku favorit</h3>
              <p className="text-gray-400 mb-6">
                Tambahkan buku ke favorit dengan menekan ikon hati pada buku
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

        {/* Tips Section */}
        {favorites.length > 0 && (
          <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-0">
            <CardContent className="p-6">
              <h3 className="mb-3">💡 Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>
                    Buku favorit Anda akan tetap tersimpan dan dapat diakses kapan saja
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>
                    Klik ikon trash untuk menghapus buku dari daftar favorit
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>
                    Anda bisa langsung membaca buku dari halaman ini
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}

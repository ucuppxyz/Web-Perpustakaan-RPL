import { useState } from 'react';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { Calendar, Search, BookOpen, Clock, CheckCircle2, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { getAllBooks } from '../data/books';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookingPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
}

interface Booking {
  id: number;
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  bookImage: string;
  pickupDate: string;
  status: 'pending' | 'ready' | 'completed' | 'cancelled';
  bookedAt: string;
}

export function BookingPage({ user, onLogout, onNavigate }: BookingPageProps) {
  // Redirect admin users - they cannot book books
  if (user?.role === 'admin') {
    return (
      <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="booking">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto mt-12">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <X className="w-12 h-12 text-red-600" />
                </div>
              </div>
              <h2 className="text-2xl mb-2 text-gray-900">Akses Ditolak</h2>
              <p className="text-gray-600 mb-6">
                Admin tidak dapat melakukan booking buku. Silakan gunakan fitur <strong>Peminjaman Walk-in</strong> untuk melayani peminjaman pengunjung.
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => onNavigate('walk-in-loan')} variant="default">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Peminjaman Walk-in
                </Button>
                <Button onClick={() => onNavigate('home')} variant="outline">
                  Kembali ke Beranda
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [pickupDate, setPickupDate] = useState('');
  const [activeTab, setActiveTab] = useState('new');

  // Dummy bookings data
  const [myBookings, setMyBookings] = useState<Booking[]>([
    {
      id: 1,
      bookId: 1,
      bookTitle: 'Pride and Prejudice',
      bookAuthor: 'Jane Austen',
      bookImage: 'https://images.unsplash.com/photo-1679180174039-c84e26f1a78d?w=400',
      pickupDate: '2025-01-15',
      status: 'ready',
      bookedAt: '2025-01-10',
    },
    {
      id: 2,
      bookId: 5,
      bookTitle: 'The Great Gatsby',
      bookAuthor: 'F. Scott Fitzgerald',
      bookImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      pickupDate: '2025-01-20',
      status: 'pending',
      bookedAt: '2025-01-12',
    },
  ]);

  const allBooks = getAllBooks();
  const availableBooks = allBooks.filter(book => book.available);
  const filteredBooks = availableBooks.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookNow = () => {
    if (!selectedBook || !pickupDate) {
      toast.error('Pilih buku dan tanggal pengambilan');
      return;
    }

    const newBooking: Booking = {
      id: Date.now(),
      bookId: selectedBook.id,
      bookTitle: selectedBook.title,
      bookAuthor: selectedBook.author,
      bookImage: selectedBook.image,
      pickupDate,
      status: 'pending',
      bookedAt: new Date().toISOString().split('T')[0],
    };

    setMyBookings([newBooking, ...myBookings]);
    toast.success('Booking berhasil dibuat!', {
      description: `Anda dapat mengambil buku pada ${new Date(pickupDate).toLocaleDateString('id-ID')}`,
    });

    // Reset form
    setSelectedBook(null);
    setPickupDate('');
    setSearchQuery('');
    setActiveTab('my-bookings');
  };

  const handleCancelBooking = (bookingId: number) => {
    setMyBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' as const }
          : booking
      )
    );
    toast.success('Booking dibatalkan');
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Menunggu</Badge>;
      case 'ready':
        return <Badge className="bg-green-500">Siap Diambil</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Selesai</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-500">Dibatalkan</Badge>;
    }
  };

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="booking">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Booking Buku</h1>
              <p className="text-gray-600">Pesan buku untuk dipinjam nanti</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
            <TabsTrigger value="new" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Booking Baru
            </TabsTrigger>
            <TabsTrigger value="my-bookings" className="gap-2">
              <Clock className="w-4 h-4" />
              Booking Saya ({myBookings.length})
            </TabsTrigger>
          </TabsList>

          {/* New Booking Tab */}
          <TabsContent value="new">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Book Selection */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Pilih Buku</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Search */}
                    <div className="mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Cari buku berdasarkan judul atau penulis..."
                          className="pl-10"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {filteredBooks.length} buku tersedia untuk dibooking
                      </p>
                    </div>

                    {/* Book Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredBooks.slice(0, 8).map((book) => (
                        <Card
                          key={book.id}
                          className={`cursor-pointer transition-all hover:shadow-lg ${
                            selectedBook?.id === book.id
                              ? 'ring-2 ring-indigo-600 bg-indigo-50'
                              : ''
                          }`}
                          onClick={() => setSelectedBook(book)}
                        >
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <ImageWithFallback
                                src={book.image}
                                alt={book.title}
                                className="w-16 h-24 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm line-clamp-2 mb-1">
                                  {book.title}
                                </h3>
                                <p className="text-xs text-gray-600 mb-2">{book.author}</p>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {book.category}
                                  </Badge>
                                  <span className="text-xs text-gray-500">⭐ {book.rating}</span>
                                </div>
                              </div>
                              {selectedBook?.id === book.id && (
                                <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {filteredBooks.length > 8 && (
                      <p className="text-sm text-center text-gray-500 mt-4">
                        Gunakan pencarian untuk menemukan lebih banyak buku
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Booking Form */}
              <div className="lg:col-span-1">
                <div className="space-y-4 sticky top-24">
                  <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
                    <CardHeader>
                      <CardTitle className="text-gray-900">Detail Booking</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedBook ? (
                        <>
                          <div>
                            <ImageWithFallback
                              src={selectedBook.image}
                              alt={selectedBook.title}
                              className="w-full h-48 object-cover rounded-lg mb-3"
                            />
                            <h3 className="text-gray-900 mb-1">{selectedBook.title}</h3>
                            <p className="text-sm text-gray-600">{selectedBook.author}</p>
                          </div>

                          <div className="space-y-2 pt-2 border-t">
                            <Label htmlFor="pickupDate">Tanggal Pengambilan *</Label>
                            <Input
                              id="pickupDate"
                              type="date"
                              value={pickupDate}
                              onChange={(e) => setPickupDate(e.target.value)}
                              min={getMinDate()}
                              max={getMaxDate()}
                              required
                            />
                            <p className="text-xs text-gray-500">
                              Buku dapat diambil 1-30 hari dari sekarang
                            </p>
                          </div>

                          <Button
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 gap-2"
                            onClick={handleBookNow}
                            disabled={!pickupDate}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Konfirmasi Booking
                          </Button>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-3" />
                          <p className="text-gray-500">Pilih buku untuk mulai booking</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Info */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className="text-blue-600 flex-shrink-0">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-blue-900 mb-1">💡 Info</p>
                          <p className="text-xs text-blue-800">
                            Buku yang di-booking akan disimpan untuk Anda. Harap ambil sesuai jadwal yang ditentukan.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* My Bookings Tab */}
          <TabsContent value="my-bookings">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Booking</CardTitle>
              </CardHeader>
              <CardContent>
                {myBookings.length > 0 ? (
                  <div className="space-y-4">
                    {myBookings.map((booking) => (
                      <Card key={booking.id} className="border-2">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <ImageWithFallback
                              src={booking.bookImage}
                              alt={booking.bookTitle}
                              className="w-20 h-28 object-cover rounded flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-gray-900 mb-1">{booking.bookTitle}</h3>
                                  <p className="text-sm text-gray-600">{booking.bookAuthor}</p>
                                </div>
                                {getStatusBadge(booking.status)}
                              </div>

                              <div className="space-y-2 mt-3">
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">Dibooking:</span>
                                  <span className="text-gray-900">
                                    {new Date(booking.bookedAt).toLocaleDateString('id-ID')}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">Ambil:</span>
                                  <span className="text-gray-900">
                                    {new Date(booking.pickupDate).toLocaleDateString('id-ID')}
                                  </span>
                                </div>
                              </div>

                              {booking.status === 'pending' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="mt-3 text-red-600 hover:bg-red-50"
                                  onClick={() => handleCancelBooking(booking.id)}
                                >
                                  <X className="w-3 h-3 mr-1" />
                                  Batalkan Booking
                                </Button>
                              )}

                              {booking.status === 'ready' && (
                                <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                                  <p className="text-sm text-green-800">
                                    ✅ Buku sudah siap diambil di perpustakaan
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-3" />
                    <h3 className="text-gray-900 mb-2">Belum Ada Booking</h3>
                    <p className="text-gray-600 mb-4">
                      Anda belum memiliki booking aktif
                    </p>
                    <Button
                      onClick={() => setActiveTab('new')}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600"
                    >
                      Buat Booking Baru
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
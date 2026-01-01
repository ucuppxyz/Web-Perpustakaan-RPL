import { useState } from 'react';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { Plus, Pencil, Trash2, Search, BookOpen, Users, TagIcon, ShieldAlert } from 'lucide-react';
import { Badge } from './ui/badge';
import { getAllBooks } from '../data/books';

interface DataMasterPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
}

export function DataMasterPage({ user, onLogout, onNavigate }: DataMasterPageProps) {
  const [activeTab, setActiveTab] = useState('books');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="data-master">
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
  const filteredBooks = allBooks.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Dummy data for members
  const members = [
    { id: 1, name: 'Ahmad Fauzi', email: 'ahmad@email.com', memberSince: '2024-01-15', booksRead: 12, status: 'active' },
    { id: 2, name: 'Siti Nurhaliza', email: 'siti@email.com', memberSince: '2024-02-10', booksRead: 8, status: 'active' },
    { id: 3, name: 'Budi Santoso', email: 'budi@email.com', memberSince: '2023-12-05', booksRead: 25, status: 'active' },
    { id: 4, name: 'Dewi Lestari', email: 'dewi@email.com', memberSince: '2024-03-20', booksRead: 5, status: 'inactive' },
  ];

  // Categories data
  const categories = [
    { id: 1, name: 'Fiksi', totalBooks: 342, description: 'Novel, cerpen, dan karya fiksi lainnya' },
    { id: 2, name: 'Sains', totalBooks: 198, description: 'Buku sains, penelitian, dan penemuan ilmiah' },
    { id: 3, name: 'Sejarah', totalBooks: 156, description: 'Sejarah dunia, biografi, dan peristiwa penting' },
    { id: 4, name: 'Teknologi', totalBooks: 223, description: 'Pemrograman, IT, dan teknologi digital' },
    { id: 5, name: 'Anak', totalBooks: 328, description: 'Buku cerita dan pembelajaran untuk anak' },
  ];

  const handleDeleteBook = (bookId: number) => {
    toast.success('Buku berhasil dihapus dari database');
  };

  const handleEditBook = (book: any) => {
    setEditingItem(book);
    setIsEditDialogOpen(true);
  };

  const handleAddBook = () => {
    setIsAddDialogOpen(false);
    toast.success('Buku baru berhasil ditambahkan');
  };

  const handleUpdateBook = () => {
    setIsEditDialogOpen(false);
    toast.success('Data buku berhasil diperbarui');
  };

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="data-master">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Data Master</h1>
              <p className="text-gray-600">Kelola data buku, member, dan kategori perpustakaan</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="books" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Buku
            </TabsTrigger>
            <TabsTrigger value="members" className="gap-2">
              <Users className="w-4 h-4" />
              Member
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <TagIcon className="w-4 h-4" />
              Kategori
            </TabsTrigger>
          </TabsList>

          {/* Books Tab */}
          <TabsContent value="books" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Daftar Buku</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Cari buku..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 gap-2">
                          <Plus className="w-4 h-4" />
                          Tambah Buku
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Tambah Buku Baru</DialogTitle>
                          <DialogDescription>
                            Isi formulir di bawah ini untuk menambahkan buku baru ke database perpustakaan.
                          </DialogDescription>
                        </DialogHeader>
                        <AddBookForm onSubmit={handleAddBook} onCancel={() => setIsAddDialogOpen(false)} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Penulis</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Tahun</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBooks.slice(0, 20).map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>{book.id}</TableCell>
                          <TableCell className="max-w-xs truncate">{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{book.category}</Badge>
                          </TableCell>
                          <TableCell>{book.year}</TableCell>
                          <TableCell>⭐ {book.rating}</TableCell>
                          <TableCell>
                            {book.available ? (
                              <Badge className="bg-green-500">Tersedia</Badge>
                            ) : (
                              <Badge className="bg-red-500">Dipinjam</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditBook(book)}
                              >
                                <Pencil className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteBook(book.id)}
                                className="text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {filteredBooks.length > 20 && (
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Menampilkan 20 dari {filteredBooks.length} buku
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Daftar Member</CardTitle>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 gap-2">
                    <Plus className="w-4 h-4" />
                    Tambah Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Terdaftar Sejak</TableHead>
                        <TableHead>Buku Dibaca</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {members.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>{member.id}</TableCell>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{new Date(member.memberSince).toLocaleDateString('id-ID')}</TableCell>
                          <TableCell>{member.booksRead}</TableCell>
                          <TableCell>
                            {member.status === 'active' ? (
                              <Badge className="bg-green-500">Aktif</Badge>
                            ) : (
                              <Badge className="bg-gray-500">Tidak Aktif</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Pencil className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Daftar Kategori</CardTitle>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 gap-2">
                    <Plus className="w-4 h-4" />
                    Tambah Kategori
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Card key={category.id} className="border-2 hover:border-indigo-300 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                              <TagIcon className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                              <h3 className="text-gray-900">{category.name}</h3>
                              <p className="text-sm text-gray-500">{category.totalBooks} buku</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Pencil className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Book Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Buku</DialogTitle>
              <DialogDescription>
                Perbarui informasi buku yang ada di database perpustakaan.
              </DialogDescription>
            </DialogHeader>
            {editingItem && (
              <EditBookForm
                book={editingItem}
                onSubmit={handleUpdateBook}
                onCancel={() => setIsEditDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}

function AddBookForm({ onSubmit, onCancel }: { onSubmit: () => void; onCancel: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Judul Buku *</Label>
          <Input id="title" placeholder="Masukkan judul buku" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Penulis *</Label>
          <Input id="author" placeholder="Nama penulis" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Kategori *</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fiksi">Fiksi</SelectItem>
              <SelectItem value="sains">Sains</SelectItem>
              <SelectItem value="sejarah">Sejarah</SelectItem>
              <SelectItem value="teknologi">Teknologi</SelectItem>
              <SelectItem value="anak">Anak</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Tahun Terbit *</Label>
          <Input id="year" type="number" placeholder="2024" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pages">Jumlah Halaman *</Label>
          <Input id="pages" type="number" placeholder="250" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rating">Rating (1-5) *</Label>
          <Input id="rating" type="number" step="0.1" min="1" max="5" placeholder="4.5" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi *</Label>
        <Textarea id="description" placeholder="Deskripsi singkat tentang buku" rows={3} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">URL Gambar Cover</Label>
        <Input id="image" type="url" placeholder="https://example.com/cover.jpg" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pdfUrl">URL PDF (opsional)</Label>
        <Input id="pdfUrl" type="url" placeholder="https://example.com/book.pdf" />
      </div>
      <div className="flex items-center gap-2 pt-4">
        <input type="checkbox" id="available" className="w-4 h-4" defaultChecked />
        <Label htmlFor="available" className="cursor-pointer">
          Buku tersedia untuk dipinjam
        </Label>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600">
          Simpan
        </Button>
      </div>
    </form>
  );
}

function EditBookForm({
  book,
  onSubmit,
  onCancel,
}: {
  book: any;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="edit-title">Judul Buku *</Label>
          <Input id="edit-title" defaultValue={book.title} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-author">Penulis *</Label>
          <Input id="edit-author" defaultValue={book.author} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-category">Kategori *</Label>
          <Select defaultValue={book.category.toLowerCase()}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fiksi">Fiksi</SelectItem>
              <SelectItem value="sains">Sains</SelectItem>
              <SelectItem value="sejarah">Sejarah</SelectItem>
              <SelectItem value="teknologi">Teknologi</SelectItem>
              <SelectItem value="anak">Anak</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-year">Tahun Terbit *</Label>
          <Input id="edit-year" type="number" defaultValue={book.year} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-pages">Jumlah Halaman *</Label>
          <Input id="edit-pages" type="number" defaultValue={book.pages} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-rating">Rating (1-5) *</Label>
          <Input
            id="edit-rating"
            type="number"
            step="0.1"
            min="1"
            max="5"
            defaultValue={book.rating}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="edit-description">Deskripsi *</Label>
        <Textarea id="edit-description" defaultValue={book.description} rows={3} required />
      </div>
      <div className="flex items-center gap-2 pt-4">
        <input type="checkbox" id="edit-available" className="w-4 h-4" defaultChecked={book.available} />
        <Label htmlFor="edit-available" className="cursor-pointer">
          Buku tersedia untuk dipinjam
        </Label>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600">
          Update
        </Button>
      </div>
    </form>
  );
}
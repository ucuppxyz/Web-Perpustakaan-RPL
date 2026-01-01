import { useState } from 'react';
import { Layout } from './Layout';
import type { User, Page } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import { CheckCircle, XCircle, Search, Clock, UserCheck, ShieldAlert, Eye, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface ApprovalPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
}

interface BookingRequest {
  id: number;
  memberName: string;
  memberEmail: string;
  bookTitle: string;
  bookId: number;
  requestDate: string;
  borrowDate: string;
  returnDate: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

export function ApprovalPage({ user, onLogout, onNavigate }: ApprovalPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [rejectionNotes, setRejectionNotes] = useState('');

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="approval">
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

  // Dummy booking requests data
  const bookingRequests: BookingRequest[] = [
    {
      id: 1,
      memberName: 'Ahmad Fauzi',
      memberEmail: 'ahmad@email.com',
      bookTitle: 'The Lean Startup',
      bookId: 101,
      requestDate: '2026-01-01 10:30',
      borrowDate: '2026-01-02',
      returnDate: '2026-01-09',
      status: 'pending',
    },
    {
      id: 2,
      memberName: 'Siti Nurhaliza',
      memberEmail: 'siti@email.com',
      bookTitle: 'Clean Code',
      bookId: 102,
      requestDate: '2026-01-01 14:15',
      borrowDate: '2026-01-03',
      returnDate: '2026-01-10',
      status: 'pending',
    },
    {
      id: 3,
      memberName: 'Budi Santoso',
      memberEmail: 'budi@email.com',
      bookTitle: 'Atomic Habits',
      bookId: 103,
      requestDate: '2025-12-31 09:00',
      borrowDate: '2026-01-01',
      returnDate: '2026-01-08',
      status: 'approved',
    },
    {
      id: 4,
      memberName: 'Dewi Lestari',
      memberEmail: 'dewi@email.com',
      bookTitle: 'Sapiens',
      bookId: 104,
      requestDate: '2025-12-30 16:45',
      borrowDate: '2026-01-01',
      returnDate: '2026-01-08',
      status: 'rejected',
      notes: 'Buku sedang dalam perbaikan',
    },
    {
      id: 5,
      memberName: 'Rina Kusuma',
      memberEmail: 'rina@email.com',
      bookTitle: 'Thinking, Fast and Slow',
      bookId: 105,
      requestDate: '2026-01-01 11:20',
      borrowDate: '2026-01-02',
      returnDate: '2026-01-09',
      status: 'pending',
    },
  ];

  const filteredRequests = bookingRequests.filter((request) => {
    const matchesSearch = 
      request.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.memberEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.bookTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = request.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleApprove = (requestId: number) => {
    toast.success('Booking berhasil disetujui! Member akan menerima notifikasi.');
    setIsDetailOpen(false);
  };

  const handleReject = (requestId: number) => {
    if (!rejectionNotes.trim()) {
      toast.error('Mohon isi alasan penolakan');
      return;
    }
    toast.success('Booking ditolak. Member akan menerima notifikasi.');
    setRejectionNotes('');
    setIsDetailOpen(false);
  };

  const viewDetails = (request: BookingRequest) => {
    setSelectedRequest(request);
    setIsDetailOpen(true);
  };

  const pendingCount = bookingRequests.filter(r => r.status === 'pending').length;
  const approvedCount = bookingRequests.filter(r => r.status === 'approved').length;
  const rejectedCount = bookingRequests.filter(r => r.status === 'rejected').length;

  return (
    <Layout user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="approval">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl">
              <UserCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Approval Booking</h1>
              <p className="text-gray-600">Kelola permintaan booking dari member perpustakaan</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Menunggu Approval</p>
                  <p className="text-3xl mt-1 text-gray-900">{pendingCount}</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Disetujui</p>
                  <p className="text-3xl mt-1 text-gray-900">{approvedCount}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ditolak</p>
                  <p className="text-3xl mt-1 text-gray-900">{rejectedCount}</p>
                </div>
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Daftar Permintaan Booking</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari member atau buku..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending" className="gap-2">
                  <Clock className="w-4 h-4" />
                  Pending ({pendingCount})
                </TabsTrigger>
                <TabsTrigger value="approved" className="gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Approved ({approvedCount})
                </TabsTrigger>
                <TabsTrigger value="rejected" className="gap-2">
                  <XCircle className="w-4 h-4" />
                  Rejected ({rejectedCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4">
                <div className="rounded-lg border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Member</TableHead>
                        <TableHead>Buku</TableHead>
                        <TableHead>Tanggal Request</TableHead>
                        <TableHead>Periode Pinjam</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                            Tidak ada data booking
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>{request.id}</TableCell>
                            <TableCell>
                              <div>
                                <p>{request.memberName}</p>
                                <p className="text-xs text-gray-500">{request.memberEmail}</p>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{request.bookTitle}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="w-3 h-3" />
                                {new Date(request.requestDate).toLocaleString('id-ID')}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <p>{new Date(request.borrowDate).toLocaleDateString('id-ID')}</p>
                                <p className="text-xs text-gray-500">s/d {new Date(request.returnDate).toLocaleDateString('id-ID')}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {request.status === 'pending' && (
                                <Badge className="bg-yellow-500">Pending</Badge>
                              )}
                              {request.status === 'approved' && (
                                <Badge className="bg-green-500">Approved</Badge>
                              )}
                              {request.status === 'rejected' && (
                                <Badge className="bg-red-500">Rejected</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => viewDetails(request)}
                                >
                                  <Eye className="w-3 h-3" />
                                </Button>
                                {request.status === 'pending' && (
                                  <>
                                    <Button
                                      size="sm"
                                      className="bg-green-600 hover:bg-green-700"
                                      onClick={() => handleApprove(request.id)}
                                    >
                                      <CheckCircle className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-600 hover:bg-red-50"
                                      onClick={() => viewDetails(request)}
                                    >
                                      <XCircle className="w-3 h-3" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detail Permintaan Booking</DialogTitle>
              <DialogDescription>
                Informasi lengkap tentang permintaan booking dari member.
              </DialogDescription>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">ID Booking</Label>
                    <p className="mt-1">{selectedRequest.id}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Status</Label>
                    <div className="mt-1">
                      {selectedRequest.status === 'pending' && (
                        <Badge className="bg-yellow-500">Pending</Badge>
                      )}
                      {selectedRequest.status === 'approved' && (
                        <Badge className="bg-green-500">Approved</Badge>
                      )}
                      {selectedRequest.status === 'rejected' && (
                        <Badge className="bg-red-500">Rejected</Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-600">Nama Member</Label>
                    <p className="mt-1">{selectedRequest.memberName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Email</Label>
                    <p className="mt-1">{selectedRequest.memberEmail}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-gray-600">Judul Buku</Label>
                    <p className="mt-1">{selectedRequest.bookTitle}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Tanggal Request</Label>
                    <p className="mt-1">{new Date(selectedRequest.requestDate).toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Tanggal Pinjam</Label>
                    <p className="mt-1">{new Date(selectedRequest.borrowDate).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Tanggal Kembali</Label>
                    <p className="mt-1">{new Date(selectedRequest.returnDate).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Durasi Pinjam</Label>
                    <p className="mt-1">
                      {Math.ceil((new Date(selectedRequest.returnDate).getTime() - new Date(selectedRequest.borrowDate).getTime()) / (1000 * 60 * 60 * 24))} hari
                    </p>
                  </div>
                </div>

                {selectedRequest.notes && (
                  <div>
                    <Label className="text-gray-600">Catatan</Label>
                    <p className="mt-1 text-sm bg-gray-50 p-3 rounded-lg">{selectedRequest.notes}</p>
                  </div>
                )}

                {selectedRequest.status === 'pending' && (
                  <div className="space-y-3 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="rejection-notes">Catatan Penolakan (opsional untuk approval)</Label>
                      <Textarea
                        id="rejection-notes"
                        placeholder="Masukkan alasan jika ingin menolak..."
                        value={rejectionNotes}
                        onChange={(e) => setRejectionNotes(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleReject(selectedRequest.id)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Tolak Booking
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(selectedRequest.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Setujui Booking
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}

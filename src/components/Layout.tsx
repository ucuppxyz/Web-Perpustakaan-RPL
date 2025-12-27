import { ReactNode } from 'react';
import { Search, BookOpen, LogOut, User, Settings, History } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import type { User as UserType, Page } from '../App';

interface LayoutProps {
  user: UserType | null;
  onLogout: () => void;
  onNavigate: (page: Page, param?: number | string) => void;
  currentPage: Page;
  children: ReactNode;
}

export function Layout({ user, onLogout, onNavigate, currentPage, children }: LayoutProps) {
  const navItems = [
    { id: 'home' as Page, label: 'Beranda' },
    { id: 'collection' as Page, label: 'Koleksi' },
    { id: 'favorites' as Page, label: 'Favorit' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      {/* Header / Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Name */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg shadow-md">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-indigo-900">Perpustakaan Digital</h1>
                <p className="text-sm text-gray-500">Baca, Jelajahi, Kembangkan Diri</p>
              </div>
            </button>

            {/* Navigation and Profile */}
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      currentPage === item.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-indigo-200">
                      {user?.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                      <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                        {user?.name.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p>{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate('profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Pengaturan
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('history')}>
                    <History className="mr-2 h-4 w-4" />
                    Riwayat
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-white">Perpustakaan Digital</span>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Jelajahi dunia pengetahuan tanpa batas. Baca, pelajari, dan kembangkan diri bersama ribuan koleksi buku digital berkualitas.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-white">Link Cepat</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                    Beranda
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors">
                    Koleksi Buku
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('favorites')} className="hover:text-white transition-colors">
                    Buku Favorit
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('history')} className="hover:text-white transition-colors">
                    Riwayat Bacaan
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-white">Kategori Populer</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <button onClick={() => onNavigate('category' as Page, 'Fiksi')} className="hover:text-white transition-colors">
                    Fiksi
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('category' as Page, 'Sains')} className="hover:text-white transition-colors">
                    Sains & Teknologi
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('category' as Page, 'Sejarah')} className="hover:text-white transition-colors">
                    Sejarah
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('category' as Page, 'Anak')} className="hover:text-white transition-colors">
                    Buku Anak
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-white">Hubungi Kami</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>perpusdigital@library.ac.id</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+62 821-3456-7890</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Jl. Dampyak NO.123, Dampyak selatan</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8">
            <div className="text-center">
              <p className="text-sm text-gray-300 mb-2">
                💡 <strong className="text-white">Dibuat dengan penuh dedikasi oleh</strong>
              </p>
              <p className="text-lg text-white mb-1">
                <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Kelompok 7 - Kelas 1B
                </span>
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Program Studi Teknik Informatika • Universitas Harkat Negeri
              </p>
              <p className="text-xs text-gray-400">
                © 2025 Perpustakaan Digital. Semua hak dilindungi. Dikembangkan dengan ❤️ untuk menginspirasi generasi pembaca.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

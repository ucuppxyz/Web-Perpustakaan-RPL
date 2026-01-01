import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { LibraryPage } from './components/LibraryPage';
import { CollectionPage } from './components/CollectionPage';
import { FavoritesPage } from './components/FavoritesPage';
import { ReadingNowPage } from './components/ReadingNowPage';
import { ProfilePage } from './components/ProfilePage';
import { SettingsPage } from './components/SettingsPage';
import { HistoryPage } from './components/HistoryPage';
import { BookCategoryPage } from './components/BookCategoryPage';
import { BookReaderPage } from './components/BookReaderPage';
import { DataMasterPage } from './components/DataMasterPage';
import { WalkInLoanPage } from './components/WalkInLoanPage';
import { BookingPage } from './components/BookingPage';
import { ReportsPage } from './components/ReportsPage';
import { AdvancedSearchPage } from './components/AdvancedSearchPage';
import { ApprovalPage } from './components/ApprovalPage';
import { LoanRecapPage } from './components/LoanRecapPage';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import * as auth from './utils/auth';
import { projectId, publicAnonKey } from './utils/supabase/info';

export type Page = 'home' | 'collection' | 'favorites' | 'reading-now' | 'profile' | 'settings' | 'history' | 'category' | 'reader' | 'data-master' | 'walk-in-loan' | 'booking' | 'reports' | 'advanced-search' | 'approval' | 'loan-recap';

export interface User {
  name: string;
  email: string;
  avatar?: string;
  memberSince: string;
  booksRead: number;
  role?: 'admin' | 'reader';
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const result = await auth.getSession();
      if (result.success && result.user && result.accessToken) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    checkSession();

    // Seed demo accounts on first load (runs in background)
    const seedDemoAccounts = async () => {
      try {
        await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dd63e494/seed-demo-accounts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        });
      } catch (err) {
        // Silently fail - demo accounts may already exist
        console.log('Demo accounts seed attempt:', err);
      }
    };
    
    seedDemoAccounts();

    // Listen to auth state changes
    const { data: { subscription } } = auth.onAuthStateChange((user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setAccessToken(null);
        setIsLoggedIn(false);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const result = await auth.signIn(email, password);
    
    if (result.success && result.user && result.accessToken) {
      setUser(result.user);
      setAccessToken(result.accessToken);
      setIsLoggedIn(true);
      toast.success(`Selamat datang, ${result.user.name}!`);
    } else {
      // Check if it's a demo account that doesn't exist yet
      const isDemoAccount = email === 'admin@perpustakaandigital.com' || email === 'pembaca@perpustakaandigital.com';
      
      if (isDemoAccount && result.error?.includes('Invalid login credentials')) {
        toast.loading('Akun demo belum ada. Membuat akun demo...', { id: 'seed-demo' });
        console.log('Attempting to seed demo accounts...');
        
        try {
          const seedResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dd63e494/seed-demo-accounts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          });
          
          console.log('Seed response status:', seedResponse.status);
          
          let seedData;
          try {
            seedData = await seedResponse.json();
          } catch (e) {
            console.error('Failed to parse seed response:', e);
            const responseText = await seedResponse.text();
            console.error('Response text:', responseText);
            toast.error('Server error: Invalid response format', { id: 'seed-demo' });
            return;
          }
          
          console.log('Seed response data:', seedData);
          
          if (seedResponse.ok && seedData.success) {
            // Check if accounts were actually created or already exist
            const hasCreatedOrExists = seedData.results?.some(
              (r: any) => r.status === 'created' || r.status === 'already_exists'
            );
            
            if (!hasCreatedOrExists) {
              const errors = seedData.results?.map((r: any) => r.error).join(', ') || 'Unknown error';
              console.error('Seed failed, errors:', errors);
              toast.error(`Gagal membuat akun demo: ${errors}`, { id: 'seed-demo' });
              return;
            }
            
            toast.success('Akun demo siap! Mencoba login...', { id: 'seed-demo' });
            
            // Wait longer for the account to be fully created and indexed
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Retry login multiple times with delays
            let retryCount = 0;
            let retryResult = null;
            
            while (retryCount < 3) {
              console.log(`Login attempt ${retryCount + 1}/3...`);
              retryResult = await auth.signIn(email, password);
              
              if (retryResult.success && retryResult.user && retryResult.accessToken) {
                setUser(retryResult.user);
                setAccessToken(retryResult.accessToken);
                setIsLoggedIn(true);
                toast.success(`Selamat datang, ${retryResult.user.name}!`, { id: 'seed-demo' });
                return;
              }
              
              retryCount++;
              if (retryCount < 3) {
                console.log('Login failed, waiting before retry...');
                await new Promise(resolve => setTimeout(resolve, 2000));
              }
            }
            
            // If all retries failed
            console.error('All login retries failed after seeding');
            toast.error('Akun demo dibuat, tetapi login gagal. Silakan refresh halaman (F5) dan coba lagi.', { id: 'seed-demo' });
            
          } else {
            const errorMsg = seedData.error || JSON.stringify(seedData);
            console.error('Seed request failed:', errorMsg);
            toast.error(`Gagal membuat akun demo: ${errorMsg}`, { id: 'seed-demo' });
          }
        } catch (err) {
          console.error('Seed demo exception:', err);
          toast.error(`Error: ${err instanceof Error ? err.message : 'Network error'}`, { id: 'seed-demo' });
        }
      } else {
        toast.error(result.error || 'Login gagal. Periksa email dan password Anda.');
      }
    }
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    const result = await auth.signup(name, email, password);
    
    if (result.success && result.user) {
      setUser(result.user);
      setIsLoggedIn(true);
      toast.success(`Akun berhasil dibuat! Selamat datang, ${name}!`);
    } else {
      // Check for common error messages
      let errorMessage = result.error || 'Pendaftaran gagal. Coba lagi.';
      
      if (errorMessage.toLowerCase().includes('already') || errorMessage.toLowerCase().includes('exists')) {
        errorMessage = 'Email sudah terdaftar. Silakan login atau gunakan email lain.';
      } else if (errorMessage.toLowerCase().includes('password')) {
        errorMessage = 'Password harus minimal 6 karakter.';
      } else if (errorMessage.toLowerCase().includes('email')) {
        errorMessage = 'Format email tidak valid.';
      }
      
      toast.error(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await auth.signInWithGoogle();
    
    if (!result.success) {
      toast.error(result.error || 'Login dengan Google gagal.');
    }
    // Note: Google OAuth will redirect, so success state is handled by onAuthStateChange
  };

  const handleLogout = async () => {
    await auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
    setAccessToken(null);
    setCurrentPage('home');
    toast.success('Berhasil logout');
  };

  const handleUpdateUser = async (updatedUser: Partial<User>) => {
    if (user && accessToken) {
      const result = await auth.updateUserProfile(accessToken, updatedUser);
      
      if (result.success) {
        setUser({ ...user, ...updatedUser });
        toast.success('Profil berhasil diperbarui');
      } else {
        toast.error(result.error || 'Gagal memperbarui profil');
      }
    }
  };

  const handleNavigate = (page: Page, param?: number | string) => {
    if (page === 'category' && typeof param === 'string') {
      setSelectedCategory(param);
      setCurrentPage(page);
    } else if (page === 'reader' && typeof param === 'number') {
      setSelectedBookId(param);
      setCurrentPage(page);
    } else {
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LibraryPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'collection':
        return <CollectionPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'favorites':
        return <FavoritesPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'reading-now':
        return <ReadingNowPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'profile':
        return (
          <ProfilePage
            user={user}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            onUpdateUser={handleUpdateUser}
          />
        );
      case 'settings':
        return <SettingsPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'history':
        return <HistoryPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'category':
        return (
          <BookCategoryPage
            user={user}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            category={selectedCategory}
          />
        );
      case 'reader':
        return (
          <BookReaderPage
            user={user}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            bookId={selectedBookId || 0}
          />
        );
      case 'data-master':
        return <DataMasterPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'walk-in-loan':
        return <WalkInLoanPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'booking':
        return <BookingPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'reports':
        return <ReportsPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'advanced-search':
        return <AdvancedSearchPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'approval':
        return <ApprovalPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'loan-recap':
        return <LoanRecapPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
      default:
        return <LibraryPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} onSignup={handleSignup} onGoogleSignIn={handleGoogleSignIn} />
      ) : (
        renderPage()
      )}
      <Toaster richColors position="top-right" />
    </div>
  );
}

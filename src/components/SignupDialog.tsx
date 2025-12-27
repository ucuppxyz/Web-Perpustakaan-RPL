import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignup: (name: string, email: string, password: string) => void;
  onGoogleSignIn: () => void;
}

export function SignupDialog({ open, onOpenChange, onSignup, onGoogleSignIn }: SignupDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      alert('Password harus minimal 6 karakter!');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }
    
    setIsLoading(true);
    await onSignup(name, email, password);
    setIsLoading(false);
    // Reset form
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buat Akun Baru</DialogTitle>
          <DialogDescription>
            Isi formulir di bawah untuk membuat akun perpustakaan
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name">Nama Lengkap</Label>
            <Input
              id="signup-name"
              placeholder="Masukkan nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="Buat password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-confirm-password">Konfirmasi Password</Label>
            <Input
              id="signup-confirm-password"
              type="password"
              placeholder="Ulangi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Mendaftar...
              </div>
            ) : (
              'Daftar'
            )}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Atau</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              onGoogleSignIn();
              onOpenChange(false);
            }}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Daftar dengan Google
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

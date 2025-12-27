import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { BookOpen, Sparkles, Heart, Zap, Star, ArrowRight, Copy, CheckCircle2, ShieldCheck, User } from 'lucide-react';
import { SignupDialog } from './SignupDialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
  onGoogleSignIn: () => void;
}

export function LoginPage({ onLogin, onSignup, onGoogleSignIn }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onLogin(email, password);
    setIsLoading(false);
  };

  const libraryImages = [
    'https://images.unsplash.com/photo-1674653760708-f521366e5cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWJyYXJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYyMTkyMjM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1747210044397-9f2d19ccf096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHJlYWRpbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzYyMjEyNzI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1544132998-ae26c2655274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBzaGVsdmVzfGVufDF8fHx8MTc2MjI0ODQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % libraryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: BookOpen, text: '1,247+ Buku', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Sparkles, text: 'Akses 24/7', gradient: 'from-purple-500 to-pink-500' },
    { icon: Heart, text: '1,892 Pengguna', gradient: 'from-orange-500 to-red-500' },
    { icon: Zap, text: '100% Gratis', gradient: 'from-green-500 to-emerald-500' },
  ];

  // Floating books animation data
  const floatingBooks = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${15 + Math.random() * 10}s`,
    animationDelay: `${Math.random() * 5}s`,
    size: 20 + Math.random() * 30,
    opacity: 0.1 + Math.random() * 0.2,
  }));

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} berhasil disalin!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast.error('Gagal menyalin');
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setIsLoading(true);
    await onLogin(demoEmail, demoPassword);
    setIsLoading(false);
  };

  const demoAccounts = [
    {
      role: 'admin',
      name: 'Admin Demo',
      email: 'admin@perpustakaandigital.com',
      password: 'Demo123!Admin',
      icon: ShieldCheck,
      gradient: 'from-purple-500 to-pink-500',
      description: 'Akses penuh dengan badge Admin',
    },
    {
      role: 'reader',
      name: 'Pembaca Demo',
      email: 'pembaca@perpustakaandigital.com',
      password: 'Demo123!Pembaca',
      icon: User,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Akun pembaca standar',
    },
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Full Screen Background Images Carousel */}
      <div className="absolute inset-0">
        {libraryImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.1,
            }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <ImageWithFallback src={img} alt="Library" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-purple-900/90 to-pink-900/85"></div>

      {/* Animated Floating Books */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingBooks.map((book) => (
          <motion.div
            key={book.id}
            className="absolute"
            style={{
              left: book.left,
              top: '-50px',
            }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [0, 360],
              x: [0, Math.sin(book.id) * 50],
            }}
            transition={{
              duration: parseFloat(book.animationDuration),
              repeat: Infinity,
              delay: parseFloat(book.animationDelay),
              ease: 'linear',
            }}
          >
            <BookOpen
              className="text-white"
              style={{
                width: book.size,
                height: book.size,
                opacity: book.opacity,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-stretch">
        {/* Left Side - Branding & Features */}
        <div className="flex-1 flex flex-col justify-between p-8 lg:p-12 text-white">
          {/* Top */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-12"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 cursor-pointer"
              >
                <BookOpen className="w-12 h-12 text-white" />
              </motion.div>
              <div>
                <h2 className="text-white text-3xl">Perpustakaan Digital</h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl mb-6 text-white leading-tight max-w-xl">
                Dunia Buku di
                <br />
                <motion.span
                  className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent inline-block"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  Genggaman Anda
                </motion.span>
              </h1>
            </motion.div>
          </div>

          {/* Bottom - Features */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    onHoverStart={() => setHoveredFeature(index)}
                    onHoverEnd={() => setHoveredFeature(null)}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 cursor-pointer text-center relative overflow-hidden"
                  >
                    {/* Hover gradient effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0`}
                      animate={{
                        opacity: hoveredFeature === index ? 0.3 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3 mx-auto shadow-lg relative z-10`}
                      animate={{
                        rotate: hoveredFeature === index ? 360 : 0,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <p className="text-white text-sm relative z-10">{feature.text}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mb-6">
              {libraryImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className="h-1.5 rounded-full bg-white/40"
                  animate={{
                    width: index === currentImageIndex ? 32 : 6,
                    backgroundColor:
                      index === currentImageIndex ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.4)',
                  }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Credits */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-center"
            >
              <p className="text-white/60 text-sm">
                Created by <span className="text-white/90">Kelompok 7 Kelas 1 B</span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-auto lg:min-w-[480px] flex items-center justify-center p-8 lg:pr-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            {/* Welcome */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="mb-2 text-white drop-shadow-lg">Selamat Datang! 👋</h2>
              <p className="text-white/90 drop-shadow-lg">Masuk untuk melanjutkan</p>
            </motion.div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-0 shadow-2xl bg-white backdrop-blur-xl overflow-hidden relative group">
                {/* Animated border gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(45deg, #6366f1, #a855f7, #ec4899, #6366f1)',
                    backgroundSize: '300% 300%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <div className="absolute inset-[2px] bg-white rounded-lg z-10" />

                <CardContent className="p-8 relative z-20">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="email" className="text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 bg-white border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-gray-700">
                          Password
                        </Label>
                        <button
                          type="button"
                          className="text-xs text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                        >
                          Lupa?
                        </button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 bg-white border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Memproses...
                            </>
                          ) : (
                            <>
                              Masuk
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </span>
                        {!isLoading && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600"
                            initial={{ x: '100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Button>
                    </motion.div>
                  </form>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-3 text-gray-400">atau</span>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 bg-white hover:bg-gray-50 border-gray-200 transition-all group"
                      onClick={onGoogleSignIn}
                    >
                      <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sign Up */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-white/90 drop-shadow-lg">
                Belum punya akun?{' '}
                <motion.button
                  onClick={() => setShowSignup(true)}
                  className="text-white hover:text-white/80 hover:underline inline-flex items-center gap-1"
                  whileHover={{ x: 5 }}
                >
                  Daftar
                  <ArrowRight className="w-3 h-3" />
                </motion.button>
              </p>
            </motion.div>

            {/* Demo Accounts Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-6"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 shadow-lg">
                <div className="flex items-center gap-1.5 mb-3">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <h4 className="text-white text-sm">Coba Akun Demo</h4>
                </div>
                
                <p className="text-[10px] text-white/70 mb-3 text-center">
                  💡 Klik kartu di bawah untuk login otomatis dengan akun demo
                </p>
                
                <div className="space-y-2">
                  {demoAccounts.map((account, index) => {
                    const Icon = account.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                        onClick={() => handleDemoLogin(account.email, account.password)}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${account.gradient} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-white text-xs">{account.name}</p>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDemoLogin(account.email, account.password);
                                }}
                                className={`px-2 py-0.5 rounded text-[10px] bg-gradient-to-r ${account.gradient} text-white hover:shadow-md transition-all`}
                              >
                                Login
                              </motion.button>
                            </div>
                            
                            <div className="flex items-center gap-1.5">
                              <code className="text-[10px] text-white/80 bg-white/10 px-1.5 py-0.5 rounded flex-1 truncate">
                                {account.email}
                              </code>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy(account.email, `Email ${account.name}`);
                                }}
                                className="p-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
                              >
                                {copiedField === `Email ${account.name}` ? (
                                  <CheckCircle2 className="w-3 h-3 text-green-300" />
                                ) : (
                                  <Copy className="w-3 h-3 text-white/70" />
                                )}
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <SignupDialog
        open={showSignup}
        onOpenChange={setShowSignup}
        onSignup={(name, email, password) => {
          onSignup(name, email, password);
          setShowSignup(false);
        }}
        onGoogleSignIn={() => {
          onGoogleSignIn();
          setShowSignup(false);
        }}
      />
    </div>
  );
}
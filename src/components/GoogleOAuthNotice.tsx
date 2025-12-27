import { useState } from 'react';
import { Info, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { motion, AnimatePresence } from 'motion/react';

export function GoogleOAuthNotice() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-full px-4"
      >
        <Card className="bg-blue-50 border-blue-200 p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm text-blue-900 mb-1">
                📋 Setup Google Login (Opsional)
              </h3>
              <p className="text-xs text-blue-700">
                Untuk mengaktifkan login dengan Google, ikuti instruksi di{' '}
                <a
                  href="https://supabase.com/docs/guides/auth/social-login/auth-google"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-900"
                >
                  dokumentasi Supabase
                </a>
                . Anda bisa login dengan email & password tanpa setup ini.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0 hover:bg-blue-100"
            >
              <X className="w-4 h-4 text-blue-600" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

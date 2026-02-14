import { Outlet } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export default function AppLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background pattern */}
      <div 
        className="fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'url(/assets/generated/valentine-pattern-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Paper texture overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: 'url(/assets/generated/paper-texture-overlay.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-16 border-t border-border/50 bg-background/80 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            Built with <Heart className="h-4 w-4 fill-rose-400 text-rose-400" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-1 text-xs">© {new Date().getFullYear()} yourlove</p>
        </div>
      </footer>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
}

export default function ValentineInteractions() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonMoved, setNoButtonMoved] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const createHearts = (centerX: number, centerY: number) => {
    if (prefersReducedMotion) {
      setYesClicked(true);
      return;
    }

    const newHearts: FloatingHeart[] = [];
    for (let i = 0; i < 12; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: centerX,
        y: centerY,
      });
    }
    setHearts(newHearts);
    setYesClicked(true);

    setTimeout(() => {
      setHearts([]);
    }, 2000);
  };

  const handleYesClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    createHearts(centerX, centerY);
  };

  const handleNoHover = () => {
    if (prefersReducedMotion) return;
    
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setNoButtonPosition({ x: newX, y: newY });
    setNoButtonMoved(true);
  };

  useEffect(() => {
    if (noButtonMoved) {
      const timer = setTimeout(() => {
        setNoButtonPosition({ x: 0, y: 0 });
        setNoButtonMoved(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [noButtonMoved]);

  return (
    <>
      {/* Floating hearts animation */}
      {hearts && hearts.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {hearts.map((heart, index) => (
            <Heart
              key={heart.id}
              className="absolute text-rose-500 fill-rose-500 animate-float-up"
              style={{
                left: heart.x,
                top: heart.y,
                width: '2rem',
                height: '2rem',
                animationDelay: `${index * 0.1}s`,
                transform: `rotate(${index * 30}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Interactive prompt */}
      <div className="mt-12 text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
            Will you be my Valentine?
          </h2>
          <div className="flex justify-center gap-1">
            <Sparkles className="h-5 w-5 text-pink-400 animate-pulse" />
            <Sparkles className="h-4 w-4 text-rose-400 animate-pulse delay-100" />
            <Sparkles className="h-5 w-5 text-pink-400 animate-pulse delay-200" />
          </div>
        </div>

        {yesClicked ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-6xl">💕</div>
            <p className="text-2xl font-display font-semibold text-rose-600 dark:text-rose-400">
              Yay! I'm so happy! 🎉
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
            <Button
              onClick={handleYesClick}
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xl px-12 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Heart className="h-6 w-6 mr-2 fill-white" />
              Yes! 💖
            </Button>

            <Button
              onMouseEnter={handleNoHover}
              onFocus={handleNoHover}
              onTouchStart={handleNoHover}
              variant="outline"
              size="lg"
              className={`text-lg px-8 py-6 h-auto transition-all duration-300 ${
                noButtonMoved ? 'fixed' : 'relative'
              }`}
              style={
                noButtonMoved
                  ? {
                      left: `${noButtonPosition.x}px`,
                      top: `${noButtonPosition.y}px`,
                      transition: prefersReducedMotion ? 'none' : 'all 0.3s ease-out',
                    }
                  : undefined
              }
            >
              No
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

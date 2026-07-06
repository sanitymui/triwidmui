import { motion } from 'framer-motion';
import { BookOpen, ShoppingCart } from 'lucide-react';
import { ScreenState } from '../App';

export function MainMenu({ onNavigate }: { onNavigate: (screen: ScreenState) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-4xl"
    >
      <button 
        onClick={() => onNavigate('read')}
        className="group relative flex flex-col items-center justify-center gap-6 w-72 h-72 border border-primary/30 bg-black/60 hover:bg-primary/5 hover:border-primary transition-all duration-700 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <BookOpen size={64} strokeWidth={1} className="text-primary group-hover:scale-110 transition-transform duration-500 blood-drip z-10 drop-shadow-[0_0_8px_rgba(139,0,0,0.8)]" />
        <span className="font-display text-5xl tracking-widest text-foreground glitch-hover z-10 mt-4" data-text="READ">
          READ
        </span>
      </button>

      <div className="h-px w-32 md:w-px md:h-32 bg-gradient-to-r md:bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>

      <button 
        onClick={() => onNavigate('buy')}
        className="group relative flex flex-col items-center justify-center gap-6 w-72 h-72 border border-primary/30 bg-black/60 hover:bg-primary/5 hover:border-primary transition-all duration-700 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <ShoppingCart size={64} strokeWidth={1} className="text-primary group-hover:scale-110 transition-transform duration-500 blood-drip z-10 drop-shadow-[0_0_8px_rgba(139,0,0,0.8)]" />
        <span className="font-display text-5xl tracking-widest text-foreground glitch-hover z-10 mt-4" data-text="BUY">
          BUY
        </span>
      </button>
    </motion.div>
  );
}

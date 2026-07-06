import { useEffect } from 'react';
import { motion } from 'framer-motion';

export function TitleScreen({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onNext, 4000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center text-center cursor-pointer w-full h-full justify-center absolute inset-0 bg-black z-50"
      onClick={onNext}
    >
      <h1 
        className="text-6xl md:text-8xl lg:text-[10rem] text-primary font-display tracking-widest mb-4 glitch blood-drip flicker select-none drop-shadow-[0_0_15px_rgba(139,0,0,0.8)]"
        data-text="TRIWID MUI"
      >
        TRIWID MUI
      </h1>
      <h2 
        className="text-xl md:text-4xl text-muted-foreground font-display tracking-[0.3em] uppercase glitch mt-8 select-none"
        data-text="HORROR ARCHIVE"
        style={{ animationDelay: '0.5s' }}
      >
        HORROR ARCHIVE
      </h2>
      <p className="mt-16 font-mono text-xs md:text-sm text-primary/50 animate-pulse uppercase tracking-widest">
        Click to enter the darkness
      </p>
    </motion.div>
  );
}

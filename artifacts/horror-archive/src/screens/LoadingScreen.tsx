import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LOADING_MESSAGES = [
  "Membuka arsip terlarang...",
  "Membaca jejak darah...",
  "Jangan lihat ke belakang...",
  "Dia sedang mengawasimu...",
  "Pintu terbuka..."
];

export function LoadingScreen({ onNext }: { onNext: () => void }) {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const intId = setInterval(() => {
      setMsgIdx(prev => Math.min(prev + 1, LOADING_MESSAGES.length - 1));
    }, 700);

    const timer = setTimeout(onNext, 3500);
    return () => {
      clearInterval(intId);
      clearTimeout(timer);
    };
  }, [onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className="flex flex-col items-center justify-center gap-12 w-full h-full absolute inset-0 bg-black z-40"
    >
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Occult symbol / loading animation */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border-2 border-primary/30 rounded-full flex items-center justify-center absolute"
        >
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[34px] border-primary/40 rotate-180" />
        </motion.div>
        
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="w-[85%] h-[85%] border-t-2 border-l-2 border-primary/20 rounded-full absolute"
        />

        <div className="absolute inset-0 flex items-center justify-center border border-dashed border-primary/50 rounded-full animate-spin-slow opacity-30" />
        
        <div className="w-2 h-2 bg-primary rounded-full animate-ping shadow-[0_0_10px_rgba(255,0,0,1)]" />
      </div>
      
      <p className="font-mono text-primary/80 animate-pulse text-center h-6 tracking-[0.2em] text-sm md:text-base glitch-hover" data-text={LOADING_MESSAGES[msgIdx]}>
        {LOADING_MESSAGES[msgIdx]}
      </p>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ScreenState } from '../App';

async function showAdThenNavigate(destination: ScreenState, onNavigate: (screen: ScreenState) => void) {
  try {
    await (window as any).Adsgram.init({ blockId: 'int-37565' }).show();
  } catch (_) {
    // tidak ada banner atau error — lanjut saja
  }
  onNavigate(destination);
}

export function ReadScreen({ onNavigate }: { onNavigate: (screen: ScreenState) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex flex-col items-center justify-center w-full max-w-3xl"
    >
      <button 
        onClick={() => onNavigate('menu')}
        className="absolute top-8 left-8 md:static md:self-start md:mb-16 text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 font-mono uppercase text-sm tracking-widest group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Kembali
      </button>

      <h2 className="font-display text-4xl md:text-6xl text-muted-foreground mb-16 tracking-widest text-center">
        PILIH BAHASA KUTUKAN
      </h2>

      <div className="flex flex-col gap-6 w-full max-w-md">
        <button 
          onClick={() => showAdThenNavigate('stories-id', onNavigate)}
          className="group relative flex items-center justify-center py-6 px-8 border border-[#8B0000] bg-[#8B0000]/10 hover:bg-[#8B0000] transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay"></div>
          <span className="font-display text-3xl tracking-[0.2em] text-[#F0E0E0] group-hover:text-black relative z-10">
            INDONESIA <span className="font-mono text-xl ml-2 opacity-70">ID</span>
          </span>
        </button>

        <button 
          onClick={() => showAdThenNavigate('stories-en', onNavigate)}
          className="group relative flex items-center justify-center py-6 px-8 border border-[#660000] bg-[#660000]/10 hover:bg-[#660000] transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay"></div>
          <span className="font-display text-3xl tracking-[0.2em] text-[#CCCCCC] group-hover:text-black relative z-10">
            ENGLISH <span className="font-mono text-xl ml-2 opacity-70">EN</span>
          </span>
        </button>

        <button 
          onClick={() => onNavigate('stories-jp')}
          className="group relative flex items-center justify-center py-6 px-8 border border-[#3D0000] bg-black hover:bg-[#3D0000]/50 transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay"></div>
          <span className="font-display text-3xl tracking-[0.2em] text-white flex items-center gap-4 relative z-10">
            JAPAN <span className="text-primary group-hover:scale-125 transition-transform duration-500">鬼</span> <span className="font-mono text-xl opacity-70">日本語</span>
          </span>
        </button>
      </div>
    </motion.div>
  );
}

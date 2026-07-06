import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { ScreenState } from '../App';

export function BuyScreen({ onNavigate }: { onNavigate: (screen: ScreenState) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center w-full max-w-6xl px-4 py-8"
    >
      <button 
        onClick={() => onNavigate('menu')}
        className="self-start mb-8 text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 font-mono uppercase text-sm tracking-widest group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Kembali ke Menu
      </button>

      <h2 className="font-display text-5xl md:text-7xl text-primary text-center mb-16 tracking-widest drop-shadow-[0_0_10px_rgba(139,0,0,0.5)] glitch-hover" data-text="KOLEKSI TERLARANG">
        KOLEKSI TERLARANG
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
        {/* Card 1: Diary Octavia */}
        <div className="flex flex-col border border-border bg-card/40 p-6 relative group overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
          
          <div className="aspect-[2/3] w-full overflow-hidden mb-6 relative border border-border/50">
            <img src="/diary-octavia-cover.jpg" alt="Diary Octavia" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[2s] sepia-[0.3]" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000"></div>
          </div>
          
          <h3 className="font-display text-3xl text-foreground mb-3 tracking-wide">Diary Octavia</h3>
          <p className="text-muted-foreground font-serif italic mb-8 flex-grow leading-relaxed">
            "Novel horror psychological — menemukan buku harian di rumah tua yang membawa kutukan"
          </p>
          
          <a 
            href="https://www.guepedia.com/book/24378" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 border border-primary/40 text-primary font-display tracking-widest text-xl hover:bg-primary hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(139,0,0,0.2)] hover:shadow-[0_0_25px_rgba(139,0,0,0.6)]"
          >
            BELI SEKARANG <ExternalLink size={20} />
          </a>
        </div>

        {/* Card 2: Zahra: A Journey of the Soul */}
        <div className="flex flex-col border border-border bg-card/40 p-6 relative group overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
          
          <div className="aspect-[2/3] w-full overflow-hidden mb-6 relative border border-border/50">
            <img src="/zahra-cover.jpg" alt="Zahra: A Journey of the Soul" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[2s] sepia-[0.2] brightness-75" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000"></div>
          </div>
          
          <h3 className="font-display text-3xl text-foreground mb-3 tracking-wide">Zahra: A Journey of the Soul</h3>
          <p className="text-muted-foreground font-serif italic mb-8 flex-grow leading-relaxed">
            "Novel perjalanan jiwa Zahra — antara dunia nyata dan alam gaib"
          </p>
          
          <a 
            href="https://vt.tokopedia.com/t/ZS9NkYGWbHRX9-1RBqR/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 border border-primary/40 text-primary font-display tracking-widest text-xl hover:bg-primary hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(139,0,0,0.2)] hover:shadow-[0_0_25px_rgba(139,0,0,0.6)]"
          >
            BELI SEKARANG <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

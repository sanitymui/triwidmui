import { Heart } from 'lucide-react';

export function SupportButton() {
  return (
    <a 
      href="https://saweria.co/triwidmui"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(139,0,0,0.3)] hover:shadow-[0_0_25px_rgba(139,0,0,0.7)] group rounded-sm"
    >
      <Heart size={16} className="fill-current group-hover:animate-ping absolute opacity-50" />
      <Heart size={16} className="fill-current relative z-10" />
      <span className="font-mono text-xs font-bold tracking-widest relative z-10">SUPPORT</span>
    </a>
  );
}

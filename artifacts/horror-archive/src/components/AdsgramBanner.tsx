import { useEffect } from 'react';

export function AdsgramBanner() {
  useEffect(() => {
    const blockId = '8376787434';
    if ((window as any).Adsgram) {
      const ad = (window as any).Adsgram.init({ blockId });
      ad.show().catch(console.error);
    }
  }, []);

  return (
    <div id="adsgram-container" className="w-full flex justify-center mt-16 mb-8 min-h-[60px] opacity-60 border border-primary/20 bg-black/40 relative overflow-hidden">
       <div className="absolute inset-0 scanlines opacity-30"></div>
       <div className="text-muted-foreground/50 text-xs font-mono flex items-center justify-center p-4 relative z-10 tracking-[0.2em]">
         [ ANOMALY DETECTED // AD UNIT PLACEHOLDER ]
       </div>
    </div>
  );
}

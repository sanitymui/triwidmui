import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const initAudio = () => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;

    // Create a very low frequency oscillator
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = 45; // 40-60Hz

    // LFO for modulation
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; // slow
    
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 10;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    // Reverb / delay simulation via Convolver / Delay
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 200;

    const delay = ctx.createDelay();
    delay.delayTime.value = 0.5;
    
    const feedback = ctx.createGain();
    feedback.gain.value = 0.6;
    
    delay.connect(feedback);
    feedback.connect(delay);

    const gain = ctx.createGain();
    gain.gain.value = 0.04; // Very low volume

    osc.connect(filter);
    filter.connect(delay);
    filter.connect(gain);
    delay.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    
    gainNodeRef.current = gain;
  };

  const toggleMute = () => {
    if (!audioCtxRef.current) {
      // Inisialisasi langsung saat pertama kali klik tombol audio
      initAudio();
      setIsPlaying(true);
      return;
    }
    if (gainNodeRef.current) {
      if (isPlaying) {
        gainNodeRef.current.gain.value = 0;
      } else {
        gainNodeRef.current.gain.value = 0.04;
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button 
      onClick={(e) => { e.stopPropagation(); toggleMute(); }}
      className="fixed bottom-4 left-4 z-50 p-2 bg-black/50 border border-primary/50 text-muted-foreground hover:text-primary transition-colors rounded-full backdrop-blur-sm"
      title="Toggle Ambient Audio"
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
}

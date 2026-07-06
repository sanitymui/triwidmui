import { ScreenState } from '../App';

export function LanguageSwitcher({ 
  currentScreen, 
  onNavigate 
}: { 
  currentScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
}) {
  // Only show switcher if we are in one of the read screens or the main menu
  const isVisible = ['menu', 'read', 'stories-id', 'stories-en', 'stories-jp'].includes(currentScreen);
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center bg-black/60 border border-primary/30 backdrop-blur-sm divide-x divide-primary/30 rounded-sm">
      <button 
        onClick={() => onNavigate('stories-id')}
        className={`px-3 py-2 transition-colors ${currentScreen === 'stories-id' ? 'bg-primary/20 shadow-[inset_0_0_10px_rgba(139,0,0,0.5)]' : 'hover:bg-primary/10 opacity-70 hover:opacity-100'}`}
        title="Indonesia"
      >
        <span className="text-xl">🇮🇩</span>
      </button>
      <button 
        onClick={() => onNavigate('stories-en')}
        className={`px-3 py-2 transition-colors ${currentScreen === 'stories-en' ? 'bg-primary/20 shadow-[inset_0_0_10px_rgba(139,0,0,0.5)]' : 'hover:bg-primary/10 opacity-70 hover:opacity-100'}`}
        title="English"
      >
        <span className="text-xl">🇬🇧</span>
      </button>
      <button 
        onClick={() => onNavigate('stories-jp')}
        className={`px-3 py-2 transition-colors ${currentScreen === 'stories-jp' ? 'bg-primary/20 shadow-[inset_0_0_10px_rgba(139,0,0,0.5)]' : 'hover:bg-primary/10 opacity-70 hover:opacity-100'}`}
        title="日本語"
      >
        <span className="text-xl">🇯🇵</span>
      </button>
    </div>
  );
}

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TitleScreen } from './screens/TitleScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { MainMenu } from './screens/MainMenu';
import { BuyScreen } from './screens/BuyScreen';
import { ReadScreen } from './screens/ReadScreen';
import { StoryListScreen } from './screens/StoryListScreen';
import { AudioPlayer } from './components/AudioPlayer';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { SupportButton } from './components/SupportButton';

export type ScreenState = 'title' | 'loading' | 'menu' | 'buy' | 'read' | 'stories-id' | 'stories-en' | 'stories-jp';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('title');

  const navigateTo = (screen: ScreenState) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] w-full bg-black text-foreground relative overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Global atmospheric effects */}
      <div className="scanlines"></div>
      <div className="vignette"></div>
      
      {/* Persistent UI elements */}
      <AudioPlayer />
      <SupportButton />
      <LanguageSwitcher currentScreen={currentScreen} onNavigate={navigateTo} />

      {/* Main content area */}
      <main className="relative z-10 min-h-[100dvh] w-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {currentScreen === 'title' && (
            <TitleScreen key="title" onNext={() => navigateTo('loading')} />
          )}
          
          {currentScreen === 'loading' && (
            <LoadingScreen key="loading" onNext={() => navigateTo('menu')} />
          )}
          
          {currentScreen === 'menu' && (
            <MainMenu key="menu" onNavigate={navigateTo} />
          )}
          
          {currentScreen === 'buy' && (
            <BuyScreen key="buy" onNavigate={navigateTo} />
          )}
          
          {currentScreen === 'read' && (
            <ReadScreen key="read" onNavigate={navigateTo} />
          )}
          
          {(currentScreen === 'stories-id' || currentScreen === 'stories-en' || currentScreen === 'stories-jp') && (
            <StoryListScreen key={currentScreen} type={currentScreen} onNavigate={navigateTo} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;

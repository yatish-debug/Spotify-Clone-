
import React from 'react';
import Sidebar from '@/components/Sidebar';
import MusicPlayer from '@/components/MusicPlayer';
import { useMusicContext } from '@/contexts/MusicContext';

const Layout = ({ children }) => {
  const { currentTrack } = useMusicContext();
  
  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      
      {/* Music Player */}
      <div className={`border-t border-border transition-all duration-300 ${currentTrack ? 'h-20' : 'h-0'}`}>
        {currentTrack && <MusicPlayer />}
      </div>
    </div>
  );
};

export default Layout;

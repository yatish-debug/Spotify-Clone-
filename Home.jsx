
import React from 'react';
import { useMusicContext } from '@/contexts/MusicContext';
import PlaylistCard from '@/components/PlaylistCard';
import TrackList from '@/components/TrackList';
import { motion } from 'framer-motion';

const Home = () => {
  const { playlists, recentlyPlayed } = useMusicContext();
  
  // Get current time to display appropriate greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  return (
    <div className="pb-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        {getGreeting()}
      </motion.h1>
      
      {/* Top playlists */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {playlists.slice(0, 6).map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 rounded-md overflow-hidden flex items-center group hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => window.location.href = `/playlist/${playlist.id}`}
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${playlist.color} to-black/40 flex-shrink-0`}>
              {playlist.coverUrl ? (
                <img  alt={playlist.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1632667113908-10f5dbafa8a1" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {playlist.id === '1' ? (
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
                      <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-white/50">
                      <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  )}
                </div>
              )}
            </div>
            <div className="p-4 flex-1 truncate">
              <h3 className="font-bold truncate">{playlist.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Recently played */}
      {recentlyPlayed.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recently played</h2>
          <TrackList 
            tracks={recentlyPlayed.slice(0, 5)} 
            showHeader={false}
            showAlbum={false}
          />
        </section>
      )}
      
      {/* Made for you */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Made for you</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <PlaylistCard playlist={playlist} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;


import React, { useState } from 'react';
import { Grid, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlaylistCard from '@/components/PlaylistCard';
import { useMusicContext } from '@/contexts/MusicContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Library = () => {
  const { playlists, createPlaylist } = useMusicContext();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const navigate = useNavigate();
  
  const handleCreatePlaylist = () => {
    const playlistId = createPlaylist('New Playlist', 'My custom playlist');
    navigate(`/playlist/${playlistId}`);
  };
  
  return (
    <div className="pb-8">
      <div className="flex justify-between items-center mb-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          Your Library
        </motion.h1>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className="rounded-full"
          >
            <Grid size={18} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
            className="rounded-full"
          >
            <List size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCreatePlaylist}
            className="rounded-full ml-2"
          >
            <Plus size={18} />
          </Button>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <PlaylistCard playlist={playlist} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center p-2 hover:bg-secondary/50 rounded-md cursor-pointer"
              onClick={() => navigate(`/playlist/${playlist.id}`)}
            >
              <div className={`w-12 h-12 rounded-md overflow-hidden bg-gradient-to-br ${playlist.color} to-black/40 mr-4`}>
                {playlist.coverUrl ? (
                  <img  alt={playlist.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1621059454394-f723a3f52d9f" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white/50">
                      <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium">{playlist.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Playlist • {playlist.tracks.length} songs
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;

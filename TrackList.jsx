
import React from 'react';
import { Play, MoreHorizontal, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMusicContext } from '@/contexts/MusicContext';
import { motion } from 'framer-motion';

const TrackList = ({ tracks, showHeader = true, showAlbum = true, showArtist = true }) => {
  const { playTrack, currentTrack, isPlaying } = useMusicContext();
  
  const handlePlayTrack = (track) => {
    playTrack(track, tracks);
  };
  
  return (
    <div className="w-full">
      {showHeader && (
        <div className="grid grid-cols-[16px_4fr_3fr_minmax(60px,1fr)] gap-4 px-4 py-2 text-sm text-muted-foreground border-b border-border">
          <div className="text-center">#</div>
          <div>Title</div>
          {showAlbum && <div>Album</div>}
          <div className="flex justify-end">
            <Clock size={16} />
          </div>
        </div>
      )}
      
      <div className="divide-y divide-border/5">
        {tracks.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`grid grid-cols-[16px_4fr_${showAlbum ? '3fr_' : ''}minmax(60px,1fr)] gap-4 px-4 py-3 text-sm group hover:bg-white/5 rounded-md ${
              currentTrack?.id === track.id ? 'bg-white/10' : ''
            }`}
          >
            <div className="flex items-center justify-center">
              {currentTrack?.id === track.id && isPlaying ? (
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-4 h-4 text-muted-foreground group-hover:hidden">
                  {index + 1}
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="w-4 h-4 p-0 hidden group-hover:flex items-center justify-center text-white"
                onClick={() => handlePlayTrack(track)}
              >
                <Play size={14} className="ml-0.5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-secondary rounded flex-shrink-0">
                <img  alt={`${track.title} album cover`} className="w-full h-full object-cover rounded" src="https://images.unsplash.com/photo-1664724195484-826ea9ee26a3" />
              </div>
              <div className="truncate">
                <div className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-primary' : ''}`}>
                  {track.title}
                </div>
                {showArtist && (
                  <div className="text-xs text-muted-foreground truncate">
                    {track.artist}
                  </div>
                )}
              </div>
            </div>
            
            {showAlbum && (
              <div className="flex items-center text-muted-foreground truncate">
                {track.album}
              </div>
            )}
            
            <div className="flex items-center justify-end gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal size={16} />
              </Button>
              <span className="text-muted-foreground">{track.duration}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrackList;

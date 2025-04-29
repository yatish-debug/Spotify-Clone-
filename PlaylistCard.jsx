
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMusicContext } from '@/contexts/MusicContext';
import { motion } from 'framer-motion';

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  const { playTrack } = useMusicContext();
  
  const handleClick = () => {
    navigate(`/playlist/${playlist.id}`);
  };
  
  const handlePlay = (e) => {
    e.stopPropagation();
    if (playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0], playlist.tracks);
    }
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-secondary/40 rounded-md p-4 cursor-pointer hover:bg-secondary/80 transition-colors group"
      onClick={handleClick}
    >
      <div className="relative mb-4">
        <div className={`aspect-square w-full rounded-md overflow-hidden bg-gradient-to-br ${playlist.color} to-black/40`}>
          {playlist.coverUrl ? (
            <img  alt={playlist.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1632667113908-10f5dbafa8a1" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {playlist.tracks.length > 0 ? (
                <div className="grid grid-cols-2 gap-0.5 w-3/4 h-3/4">
                  {playlist.tracks.slice(0, 4).map((track, i) => (
                    <div key={i} className="bg-black/20 rounded-sm overflow-hidden">
                      <img  alt={`Track in ${playlist.name}`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1632667113908-10f5dbafa8a1" />
                    </div>
                  ))}
                </div>
              ) : (
                <svg viewBox="0 0 24 24" className="w-1/2 h-1/2 text-white/30">
                  <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              )}
            </div>
          )}
        </div>
        
        <Button
          variant="default"
          size="icon"
          className="absolute bottom-2 right-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105"
          onClick={handlePlay}
        >
          <Play size={18} className="ml-0.5" />
        </Button>
      </div>
      
      <h3 className="font-bold truncate">{playlist.name}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 h-10">
        {playlist.description || `Playlist • ${playlist.tracks.length} songs`}
      </p>
    </motion.div>
  );
};

export default PlaylistCard;

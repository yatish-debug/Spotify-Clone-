
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Clock, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrackList from '@/components/TrackList';
import { useMusicContext } from '@/contexts/MusicContext';
import { motion } from 'framer-motion';

const Playlist = () => {
  const { id } = useParams();
  const { playlists, playTrack } = useMusicContext();
  const [playlist, setPlaylist] = useState(null);
  
  useEffect(() => {
    const foundPlaylist = playlists.find(p => p.id === id);
    setPlaylist(foundPlaylist);
  }, [id, playlists]);
  
  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Playlist not found</h2>
          <p className="text-muted-foreground">The playlist you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
  const handlePlayAll = () => {
    if (playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0], playlist.tracks);
    }
  };
  
  // Calculate total duration
  const getTotalDuration = () => {
    let totalMinutes = 0;
    let totalSeconds = 0;
    
    playlist.tracks.forEach(track => {
      const [mins, secs] = track.duration.split(':').map(Number);
      totalMinutes += mins;
      totalSeconds += secs;
    });
    
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    
    return `${totalMinutes} min ${totalSeconds} sec`;
  };
  
  return (
    <div className="pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`w-48 h-48 md:w-60 md:h-60 rounded-md overflow-hidden bg-gradient-to-br ${playlist.color} to-black/40 shadow-lg`}
        >
          {playlist.coverUrl ? (
            <img  alt={playlist.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1632667113908-10f5dbafa8a1" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {playlist.id === '1' ? (
                <svg viewBox="0 0 24 24" className="w-24 h-24 text-white">
                  <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-24 h-24 text-white/50">
                  <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              )}
            </div>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 text-center md:text-left"
        >
          <div className="text-sm font-medium uppercase mb-2">Playlist</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{playlist.name}</h1>
          <div className="text-sm text-muted-foreground">
            <p className="mb-1">{playlist.description}</p>
            <p>{playlist.tracks.length} songs • {getTotalDuration()}</p>
          </div>
        </motion.div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="default"
          size="lg"
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-transform"
          onClick={handlePlayAll}
          disabled={playlist.tracks.length === 0}
        >
          <Play size={20} className="mr-2 ml-1" />
          Play
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <MoreHorizontal size={20} />
        </Button>
      </div>
      
      {/* Track list */}
      {playlist.tracks.length > 0 ? (
        <TrackList tracks={playlist.tracks} />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold mb-2">This playlist is empty</h3>
          <p className="text-muted-foreground">Add some songs to get started</p>
        </div>
      )}
    </div>
  );
};

export default Playlist;

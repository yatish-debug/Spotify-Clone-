
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Clock, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrackList from '@/components/TrackList';
import { useMusicContext } from '@/contexts/MusicContext';
import { motion } from 'framer-motion';

const Album = () => {
  const { id } = useParams();
  const { playlists, playTrack } = useMusicContext();
  const [album, setAlbum] = useState(null);
  
  // For demo purposes, we'll create a fake album based on tracks with the same album name
  useEffect(() => {
    // Get all tracks from all playlists
    const allTracks = playlists.flatMap(playlist => playlist.tracks);
    
    // Find tracks with matching album name
    const albumName = decodeURIComponent(id);
    const albumTracks = allTracks.filter(track => track.album === albumName);
    
    if (albumTracks.length > 0) {
      const albumArtist = albumTracks[0].artist;
      
      setAlbum({
        id: id,
        name: albumName,
        artist: albumArtist,
        tracks: albumTracks,
        coverUrl: null,
        releaseYear: '2023', // Fake data
        color: 'from-purple-500'
      });
    }
  }, [id, playlists]);
  
  if (!album) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Album not found</h2>
          <p className="text-muted-foreground">The album you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
  const handlePlayAll = () => {
    if (album.tracks.length > 0) {
      playTrack(album.tracks[0], album.tracks);
    }
  };
  
  // Calculate total duration
  const getTotalDuration = () => {
    let totalMinutes = 0;
    let totalSeconds = 0;
    
    album.tracks.forEach(track => {
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
          className={`w-48 h-48 md:w-60 md:h-60 rounded-md overflow-hidden bg-gradient-to-br ${album.color} to-black/40 shadow-lg`}
        >
          {album.coverUrl ? (
            <img  alt={album.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1573247352896-dd8ee4f547ce" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-24 h-24 text-white/50">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
              </svg>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 text-center md:text-left"
        >
          <div className="text-sm font-medium uppercase mb-2">Album</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{album.name}</h1>
          <div className="text-sm">
            <p className="mb-1 font-medium">{album.artist} • {album.releaseYear}</p>
            <p className="text-muted-foreground">{album.tracks.length} songs • {getTotalDuration()}</p>
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
      <TrackList tracks={album.tracks} showAlbum={false} />
    </div>
  );
};

export default Album;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrackList from '@/components/TrackList';
import PlaylistCard from '@/components/PlaylistCard';
import { useMusicContext } from '@/contexts/MusicContext';
import { motion } from 'framer-motion';

const Artist = () => {
  const { id } = useParams();
  const { playlists, playTrack } = useMusicContext();
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  
  // For demo purposes, we'll create a fake artist page based on tracks with the same artist name
  useEffect(() => {
    // Get all tracks from all playlists
    const allTracks = playlists.flatMap(playlist => playlist.tracks);
    
    // Find tracks with matching artist name
    const artistName = decodeURIComponent(id);
    const artistTracks = allTracks.filter(track => track.artist.includes(artistName));
    
    if (artistTracks.length > 0) {
      setArtist({
        id: id,
        name: artistName,
        coverUrl: null,
        monthlyListeners: Math.floor(Math.random() * 10000000) + 1000000,
        color: 'from-blue-500'
      });
      
      // Set top tracks (up to 5)
      setTopTracks(artistTracks.slice(0, 5));
      
      // Group tracks by album
      const albumMap = {};
      artistTracks.forEach(track => {
        if (!albumMap[track.album]) {
          albumMap[track.album] = {
            id: track.album,
            name: track.album,
            artist: artistName,
            tracks: [],
            coverUrl: null,
            color: `from-${getRandomColor()}-500`
          };
        }
        albumMap[track.album].tracks.push(track);
      });
      
      setAlbums(Object.values(albumMap));
    }
  }, [id, playlists]);
  
  if (!artist) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Artist not found</h2>
          <p className="text-muted-foreground">The artist you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
  const handlePlayAll = () => {
    if (topTracks.length > 0) {
      playTrack(topTracks[0], topTracks);
    }
  };
  
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <div className="pb-8">
      {/* Header */}
      <div className="relative mb-8">
        <div className={`h-80 w-full bg-gradient-to-b ${artist.color} to-background`}></div>
        <div className="absolute bottom-0 left-0 p-8 flex items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">{artist.name}</h1>
            <p className="text-sm">{formatNumber(artist.monthlyListeners)} monthly listeners</p>
          </motion.div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-4 mb-8">
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
          variant="outline"
          className="rounded-full border-foreground/20 hover:border-foreground/50"
        >
          Follow
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <MoreHorizontal size={20} />
        </Button>
      </div>
      
      {/* Popular tracks */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Popular</h2>
        <TrackList 
          tracks={topTracks} 
          showHeader={false}
        />
      </section>
      
      {/* Discography */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Discography</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {albums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-secondary/40 rounded-md p-4 cursor-pointer hover:bg-secondary/80 transition-colors group"
              onClick={() => window.location.href = `/album/${encodeURIComponent(album.name)}`}
            >
              <div className="relative mb-4">
                <div className={`aspect-square w-full rounded-md overflow-hidden bg-gradient-to-br ${album.color} to-black/40`}>
                  {album.coverUrl ? (
                    <img  alt={album.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1632667113908-10f5dbafa8a1" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-12 h-12 text-white/50">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <Button
                  variant="default"
                  size="icon"
                  className="absolute bottom-2 right-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (album.tracks.length > 0) {
                      playTrack(album.tracks[0], album.tracks);
                    }
                  }}
                >
                  <Play size={18} className="ml-0.5" />
                </Button>
              </div>
              
              <h3 className="font-bold truncate">{album.name}</h3>
              <p className="text-sm text-muted-foreground">
                Album • {album.tracks.length} songs
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Helper function to get a random color
const getRandomColor = () => {
  const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default Artist;

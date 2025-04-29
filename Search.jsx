
import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import TrackList from '@/components/TrackList';
import { useMusicContext } from '@/contexts/MusicContext';
import { motion } from 'framer-motion';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { playlists } = useMusicContext();
  
  // Get all tracks from all playlists
  const allTracks = playlists.flatMap(playlist => playlist.tracks);
  
  // Remove duplicates based on track id
  const uniqueTracks = [...new Map(allTracks.map(track => [track.id, track])).values()];
  
  // Filter tracks based on search query
  const filteredTracks = searchQuery.trim() === '' 
    ? [] 
    : uniqueTracks.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.album.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="pb-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Search
      </motion.h1>
      
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="What do you want to listen to?"
          className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {searchQuery.trim() !== '' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {filteredTracks.length > 0 
              ? `Results for "${searchQuery}"` 
              : `No results found for "${searchQuery}"`}
          </h2>
          
          {filteredTracks.length > 0 && (
            <TrackList tracks={filteredTracks} />
          )}
        </div>
      )}
      
      {searchQuery.trim() === '' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Browse all</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {['Pop', 'Hip-Hop', 'Rock', 'Electronic', 'R&B', 'Latin', 'K-Pop', 'Country', 'Jazz', 'Classical'].map((genre, index) => (
              <motion.div
                key={genre}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-${getRandomColor(index)}-500 to-${getRandomColor(index + 3)}-700 p-4 flex items-end cursor-pointer hover:scale-105 transition-transform`}
              >
                <h3 className="text-xl font-bold">{genre}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get a random color
const getRandomColor = (seed) => {
  const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
  return colors[(seed || Math.floor(Math.random() * colors.length)) % colors.length];
};

export default Search;

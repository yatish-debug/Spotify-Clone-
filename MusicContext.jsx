
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const MusicContext = createContext();

export const useMusicContext = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const { toast } = useToast();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [queue, setQueue] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedPlaylists = localStorage.getItem('spotify_playlists');
    const savedRecent = localStorage.getItem('spotify_recent');
    
    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists));
    } else {
      // Set default playlists
      const defaultPlaylists = [
        {
          id: '1',
          name: 'Liked Songs',
          description: 'Your liked songs',
          coverUrl: null,
          tracks: sampleTracks.filter((_, i) => i % 3 === 0),
          color: 'from-indigo-500'
        },
        {
          id: '2',
          name: 'Discover Weekly',
          description: 'Your weekly mixtape of fresh music',
          coverUrl: null,
          tracks: sampleTracks.filter((_, i) => i % 4 === 0),
          color: 'from-purple-500'
        },
        {
          id: '3',
          name: 'Chill Vibes',
          description: 'Relaxing tunes for your day',
          coverUrl: null,
          tracks: sampleTracks.filter((_, i) => i % 2 === 0),
          color: 'from-blue-500'
        }
      ];
      setPlaylists(defaultPlaylists);
      localStorage.setItem('spotify_playlists', JSON.stringify(defaultPlaylists));
    }
    
    if (savedRecent) {
      setRecentlyPlayed(JSON.parse(savedRecent));
    }
  }, []);

  // Save playlists to localStorage whenever they change
  useEffect(() => {
    if (playlists.length > 0) {
      localStorage.setItem('spotify_playlists', JSON.stringify(playlists));
    }
  }, [playlists]);

  // Save recently played to localStorage
  useEffect(() => {
    if (recentlyPlayed.length > 0) {
      localStorage.setItem('spotify_recent', JSON.stringify(recentlyPlayed));
    }
  }, [recentlyPlayed]);

  const playTrack = (track, trackList = null) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    
    // Add to recently played
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(t => t.id !== track.id);
      return [track, ...filtered].slice(0, 20);
    });
    
    // Set queue if trackList is provided
    if (trackList) {
      const trackIndex = trackList.findIndex(t => t.id === track.id);
      if (trackIndex !== -1) {
        const nextTracks = trackList.slice(trackIndex + 1);
        setQueue(nextTracks);
      }
    }
    
    toast({
      title: "Now Playing",
      description: `${track.title} by ${track.artist}`,
      duration: 3000,
    });
  };

  const togglePlayPause = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (queue.length > 0) {
      const next = queue[0];
      setCurrentTrack(next);
      setQueue(queue.slice(1));
      
      // Add to recently played
      setRecentlyPlayed(prev => {
        const filtered = prev.filter(t => t.id !== next.id);
        return [next, ...filtered].slice(0, 20);
      });
    } else {
      setIsPlaying(false);
    }
  };

  const previousTrack = () => {
    if (recentlyPlayed.length > 1) {
      const prev = recentlyPlayed[1]; // Get the second item (previous track)
      setCurrentTrack(prev);
      
      // Reorder recently played
      setRecentlyPlayed(prev => {
        const newRecent = [...prev];
        newRecent.splice(1, 1);
        return [prev, ...newRecent].slice(0, 20);
      });
    }
  };

  const addToPlaylist = (playlistId, track) => {
    setPlaylists(prev => 
      prev.map(playlist => 
        playlist.id === playlistId
          ? { 
              ...playlist, 
              tracks: playlist.tracks.some(t => t.id === track.id) 
                ? playlist.tracks 
                : [...playlist.tracks, track] 
            }
          : playlist
      )
    );
    
    toast({
      title: "Added to playlist",
      description: `${track.title} added to playlist`,
      duration: 3000,
    });
  };

  const createPlaylist = (name, description = '') => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      description,
      coverUrl: null,
      tracks: [],
      color: `from-${getRandomColor()}-500`
    };
    
    setPlaylists(prev => [...prev, newPlaylist]);
    
    toast({
      title: "Playlist created",
      description: `${name} has been created`,
      duration: 3000,
    });
    
    return newPlaylist.id;
  };

  const getRandomColor = () => {
    const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        queue,
        playlists,
        recentlyPlayed,
        playTrack,
        togglePlayPause,
        nextTrack,
        previousTrack,
        setVolume,
        addToPlaylist,
        createPlaylist,
        setQueue,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

// Sample tracks data
const sampleTracks = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    coverUrl: null
  },
  {
    id: '2',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: '3:53',
    coverUrl: null
  },
  {
    id: '3',
    title: 'Dance Monkey',
    artist: 'Tones and I',
    album: 'The Kids Are Coming',
    duration: '3:29',
    coverUrl: null
  },
  {
    id: '4',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: '2:54',
    coverUrl: null
  },
  {
    id: '5',
    title: 'Don\'t Start Now',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: '3:03',
    coverUrl: null
  },
  {
    id: '6',
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    album: 'When We All Fall Asleep, Where Do We Go?',
    duration: '3:14',
    coverUrl: null
  },
  {
    id: '7',
    title: 'Levitating',
    artist: 'Dua Lipa ft. DaBaby',
    album: 'Future Nostalgia',
    duration: '3:23',
    coverUrl: null
  },
  {
    id: '8',
    title: 'Circles',
    artist: 'Post Malone',
    album: 'Hollywood\'s Bleeding',
    duration: '3:35',
    coverUrl: null
  },
  {
    id: '9',
    title: 'Someone You Loved',
    artist: 'Lewis Capaldi',
    album: 'Divinely Uninspired to a Hellish Extent',
    duration: '3:02',
    coverUrl: null
  },
  {
    id: '10',
    title: 'Memories',
    artist: 'Maroon 5',
    album: 'Memories',
    duration: '3:09',
    coverUrl: null
  },
  {
    id: '11',
    title: 'Savage Love',
    artist: 'Jawsh 685 & Jason Derulo',
    album: 'Savage Love',
    duration: '2:51',
    coverUrl: null
  },
  {
    id: '12',
    title: 'Mood',
    artist: '24kGoldn ft. iann dior',
    album: 'El Dorado',
    duration: '2:21',
    coverUrl: null
  },
  {
    id: '13',
    title: 'Dynamite',
    artist: 'BTS',
    album: 'BE',
    duration: '3:19',
    coverUrl: null
  },
  {
    id: '14',
    title: 'Positions',
    artist: 'Ariana Grande',
    album: 'Positions',
    duration: '2:52',
    coverUrl: null
  },
  {
    id: '15',
    title: 'Rockstar',
    artist: 'DaBaby ft. Roddy Ricch',
    album: 'Blame It on Baby',
    duration: '3:01',
    coverUrl: null
  },
  {
    id: '16',
    title: 'Before You Go',
    artist: 'Lewis Capaldi',
    album: 'Divinely Uninspired to a Hellish Extent',
    duration: '3:35',
    coverUrl: null
  },
  {
    id: '17',
    title: 'Kings & Queens',
    artist: 'Ava Max',
    album: 'Heaven & Hell',
    duration: '2:42',
    coverUrl: null
  },
  {
    id: '18',
    title: 'Breaking Me',
    artist: 'Topic ft. A7S',
    album: 'Breaking Me',
    duration: '2:46',
    coverUrl: null
  },
  {
    id: '19',
    title: 'Head & Heart',
    artist: 'Joel Corry ft. MNEK',
    album: 'Head & Heart',
    duration: '2:53',
    coverUrl: null
  },
  {
    id: '20',
    title: 'Midnight Sky',
    artist: 'Miley Cyrus',
    album: 'Plastic Hearts',
    duration: '3:43',
    coverUrl: null
  }
];

export default MusicContext;

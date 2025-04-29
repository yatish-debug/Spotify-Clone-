
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Search, Library, PlusCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMusicContext } from '@/contexts/MusicContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { playlists, createPlaylist } = useMusicContext();
  const navigate = useNavigate();
  
  const handleCreatePlaylist = () => {
    const playlistId = createPlaylist('New Playlist', 'My custom playlist');
    navigate(`/playlist/${playlistId}`);
  };
  
  return (
    <div className="w-64 bg-black flex flex-col h-full">
      {/* Logo */}
      <div className="p-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-primary">
            <circle cx="12" cy="12" r="10" fill="currentColor"/>
            <path d="M8.75 13.4C10.5 14.5 12.5 14.5 14.25 13.4" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M7.5 11.5C10 13 14 13 16.5 11.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M6.25 9.5C9.5 11.5 14.5 11.5 17.75 9.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="text-xl font-bold">Spotify</span>
        </motion.div>
      </div>
      
      {/* Main Navigation */}
      <nav className="px-2">
        <ul className="space-y-1">
          <NavItem to="/" icon={<Home size={20} />} label="Home" />
          <NavItem to="/search" icon={<Search size={20} />} label="Search" />
          <NavItem to="/library" icon={<Library size={20} />} label="Your Library" />
        </ul>
      </nav>
      
      <div className="mt-6 px-4">
        <Button 
          onClick={handleCreatePlaylist}
          variant="ghost" 
          className="w-full justify-start text-sm font-normal hover:bg-secondary"
        >
          <PlusCircle size={18} className="mr-2" />
          Create Playlist
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sm font-normal hover:bg-secondary mt-1"
          onClick={() => navigate('/playlist/1')}
        >
          <Heart size={18} className="mr-2 text-primary" />
          Liked Songs
        </Button>
      </div>
      
      {/* Divider */}
      <div className="mx-4 my-4 border-t border-border"></div>
      
      {/* Playlists */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 pr-2">
          {playlists.map(playlist => (
            <NavLink
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive 
                    ? 'bg-secondary text-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`
              }
            >
              {playlist.name}
            </NavLink>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
          isActive 
            ? 'bg-secondary text-foreground' 
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
        }`
      }
    >
      {icon}
      <span className="font-medium">{label}</span>
    </NavLink>
  </li>
);

export default Sidebar;

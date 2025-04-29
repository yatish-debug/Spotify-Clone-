
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Repeat, Shuffle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useMusicContext } from '@/contexts/MusicContext';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlayPause, 
    nextTrack, 
    previousTrack,
    volume,
    setVolume
  } = useMusicContext();
  
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  
  // Simulate playback progress
  useEffect(() => {
    let interval;
    
    if (isPlaying) {
      // Parse the duration string (e.g., "3:45" to seconds)
      const [mins, secs] = currentTrack.duration.split(':').map(Number);
      const totalSeconds = mins * 60 + secs;
      setDuration(totalSeconds);
      
      // Reset progress when a new track starts
      setProgress(0);
      
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= totalSeconds) {
            clearInterval(interval);
            nextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [currentTrack, isPlaying, nextTrack]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleVolumeChange = (value) => {
    setVolume(value[0]);
  };
  
  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume);
    }
  };
  
  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={18} />;
    if (volume < 50) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full px-4 flex items-center justify-between"
    >
      {/* Track Info */}
      <div className="flex items-center w-1/4">
        <div className="w-12 h-12 bg-secondary rounded overflow-hidden mr-3 flex-shrink-0">
          <img  alt="Album cover" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1573247352896-dd8ee4f547ce" />
        </div>
        <div className="truncate">
          <div className="font-medium truncate">{currentTrack.title}</div>
          <div className="text-xs text-muted-foreground truncate">{currentTrack.artist}</div>
        </div>
      </div>
      
      {/* Player Controls */}
      <div className="flex flex-col items-center w-2/4">
        <div className="flex items-center gap-4 mb-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full h-8 w-8 ${isShuffle ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setIsShuffle(!isShuffle)}
          >
            <Shuffle size={16} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-8 w-8"
            onClick={previousTrack}
          >
            <SkipBack size={18} />
          </Button>
          
          <Button 
            variant="default" 
            size="icon" 
            className="rounded-full bg-white text-black hover:bg-white/90 h-10 w-10"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-8 w-8"
            onClick={nextTrack}
          >
            <SkipForward size={18} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full h-8 w-8 ${isRepeat ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setIsRepeat(!isRepeat)}
          >
            <Repeat size={16} />
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-10 text-right">
            {formatTime(progress)}
          </span>
          <div className="relative w-full h-1 bg-secondary rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-primary"
              style={{ width: `${(progress / duration) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs text-muted-foreground w-10">
            {currentTrack.duration}
          </span>
        </div>
      </div>
      
      {/* Volume Control */}
      <div className="flex items-center gap-2 w-1/4 justify-end">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-8 w-8"
          onClick={toggleMute}
        >
          <VolumeIcon />
        </Button>
        <Slider
          value={[volume]}
          max={100}
          step={1}
          className="w-24"
          onValueChange={handleVolumeChange}
        />
      </div>
    </motion.div>
  );
};

export default MusicPlayer;

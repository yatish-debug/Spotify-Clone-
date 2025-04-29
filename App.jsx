
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { MusicProvider } from '@/contexts/MusicContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Library from '@/pages/Library';
import Playlist from '@/pages/Playlist';
import Album from '@/pages/Album';
import Artist from '@/pages/Artist';

function App() {
  return (
    <MusicProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/artist/:id" element={<Artist />} />
        </Routes>
      </Layout>
      <Toaster />
    </MusicProvider>
  );
}

export default App;

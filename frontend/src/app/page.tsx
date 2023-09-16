// page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import AlbumGrid from '@components/AlbumGrid'; // Import AlbumGrid
import AlbumSearchBar from '@components/SearchBar';
import { DraggedItemProvider } from '@/contexts/DraggedItemContext';


const idealSquareSize = 300;

const Home: React.FC = () => {
  useEffect(() => {
    const updateSquareSize = () => {
      const width = window.innerWidth;
      let numCols;

      if (width < idealSquareSize) {
        numCols = 1;
      } else {
        numCols = Math.round(width / idealSquareSize);
      }

      document.documentElement.style.setProperty(
        '--num-squares-per-row',
        numCols.toString()
      );
    };

    window.addEventListener('resize', updateSquareSize);
    updateSquareSize(); // Initial size

    return () => {
      window.removeEventListener('resize', updateSquareSize);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <DraggedItemProvider>
        <AlbumSearchBar />
        <AlbumGrid/>
      </DraggedItemProvider>
    </main>
  );
};

export default Home;

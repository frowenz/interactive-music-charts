// page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import AlbumGrid from '@components/AlbumGrid'; // Import AlbumGrid

import { DraggedItemProvider } from '@/contexts/DraggedItemContext';

const Home: React.FC = () => {
  const [idealSquareSize, setIdealSquareSize] = useState(200);

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


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        setIdealSquareSize((prev) => prev + 50);
        updateSquareSize();
      } else if (e.key === '-' || e.key === '_') {
        setIdealSquareSize((prev) => Math.max(prev - 50, 50));
        updateSquareSize();
      }
    };

    // Add window resize event listener
    window.addEventListener('resize', updateSquareSize);
    updateSquareSize(); // Initial size

    // Add keydown event listener
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Remove event listeners when component unmounts
      window.removeEventListener('resize', updateSquareSize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [idealSquareSize]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <DraggedItemProvider>
        <AlbumGrid />
      </DraggedItemProvider>
    </main>
  );
};

export default Home;

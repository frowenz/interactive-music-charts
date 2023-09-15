import { useEffect, useState } from 'react';
import AlbumSquare from '@components/AlbumSquare';
import AlbumSearchBar from '@components/SearchBar';
import { generateRandomColor } from '@/lib/utils';

const idealSquareSize = 300;

const Home: React.FC = () => {
  const [squares, setSquares] = useState<any[]>([]); // Now holds objects instead of just colors

  useEffect(() => {
    const tempSquares = [];
    for (let i = 0; i < 100; i++) {
      const color = generateRandomColor();
      tempSquares.push({
        color,
        artist: 'Artist ' + i,
        album: 'Album ' + i,
        image: 'image.jpg',
      });
    }
    setSquares(tempSquares);
  }, []);

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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AlbumSearchBar />
      <div className="grid-container px-5 w-95">
        {squares.map((square, index) => (
          <AlbumSquare
            key={index}
            color={square.color}
            artist={square.artist}
            album={square.album}
            image={square.image}
            link={''}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;

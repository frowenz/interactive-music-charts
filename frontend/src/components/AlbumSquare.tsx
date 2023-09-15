// AlbumSquare.tsx
import React from 'react';
import '@styles/AlbumSquare.css';

interface AlbumSquareProps {
  color: string;
  artist: string;
  album: string;
  image: string;
  releaseDate: string;
  link: string;
  inDropdown?: boolean;
  key: React.Key;
}

const AlbumSquare: React.FC<AlbumSquareProps> = ({
  color,
  artist,
  album,
  image,
  releaseDate,
  link = '',
  inDropdown = false,
  ...dragProps
}) => {
  return (
    <div
      className={`dynamic-square ${inDropdown ? 'drop-down-square' : ''}`}
      style={{ backgroundColor: color }}
      {...dragProps}
      onClick={() => {
        // if (link) window.open(link, '_blank');
        if (link) window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", '_blank');
      }}
    >
      <img src={image} alt={`${artist} - ${album}`} />
    </div>
  );
};

export default AlbumSquare;

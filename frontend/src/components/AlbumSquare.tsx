// AlbumSquare.tsx
import React from 'react';
import '@styles/grid.css';

interface AlbumSquareProps {
  color: string;
  artist: string;
  name: string;
  image: string;
  releaseDate: string;
  link: string;
  inDropdown?: boolean;
  key: React.Key;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

const AlbumSquare: React.FC<AlbumSquareProps> = ({
  color,
  artist,
  name,
  image,
  releaseDate,
  link = '',
  inDropdown = false,
  ...dragProps
}) => {
  return (
    <div
      className={`dynamic-square flex ${inDropdown ? 'drop-down-square' : ''}`}
      style={{ backgroundColor: color }}
      draggable
      {...dragProps}
      onClick={() => {
        if (link) window.open(link, '_blank');
      }}
    >
      <img src={image} alt={`${artist} - ${name}`} />
    </div>
  );
};

export default AlbumSquare;

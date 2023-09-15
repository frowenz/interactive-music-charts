import React, { useState, useEffect } from 'react';
import AlbumSquare from '@components/AlbumSquare';
import { generateRandomColor } from '@/lib/utils';
import { useDraggedItem } from '../contexts/DraggedItemContext';

const AlbumGrid = () => {
  const { draggedItem, setDraggedItem } = useDraggedItem();
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    const tempSquares = [];
    for (let i = 0; i < 25; i++) {
      const color = generateRandomColor();
      tempSquares.push({
        color,
        artist: 'Artist ' + i,
        album: 'Album ' + i,
        releaseData: '2000-01-00',
        image: 'image.jpg',
        link: '',
      });
    }
    setSquares(tempSquares);
  }, []);

  const handleDragStart = (e, index) => {
    setDraggingIndex(index);
    
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem) {
      const tempSquares = [...squares];
      tempSquares.splice(index, 0, draggedItem);
      setSquares(tempSquares);
      setDraggedItem(null);
      handleDragStart(e, index);
    } else {
      if (draggingIndex === null) return;

      if (draggingIndex !== index) {
        const newSquares = [...squares];
        const [movedItem] = newSquares.splice(draggingIndex, 1);
        newSquares.splice(index, 0, movedItem);
        setSquares(newSquares);
        setDraggingIndex(index);
      }
    }
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  return (
    <div className="grid-container">
      {squares.map((square, index) => (
        <AlbumSquare
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          key={index}
          color={square.color}
          artist={square.artist}
          album={square.album}
          image={square.image}
          link={square.link}
        />
      ))}
    </div>
  );
};

export default AlbumGrid;

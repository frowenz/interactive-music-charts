// dropdown.tsx
import React from 'react';
import { useDraggedItem } from '@/contexts/DraggedItemContext';
import AlbumSquare from '@components/AlbumSquare';
import { generateRandomColor } from '@/lib/utils';

const Dropdown = ({ data, setQuery}) => {
  const { draggedItem, setDraggedItem } = useDraggedItem();

  const handleDragStart = (e, album) => {
    setQuery('');
    setDraggedItem(
      {
        color: generateRandomColor(),
        artist: album.artists[0].name,
        album: album.name,
        releaseDate: album.release_date,
        image: album.images[0].url,
        link: album.external_urls.spotify,
      }
    );
  };

  return (
    <div className="absolute top left-0 w-full z-10 overflow-x-auto">
      <div className="bg-gray-100 shadow-lg flex flex-row">
        {data.map((album) => (
          <div
            key={album.id}
            className="w-28 h-28 flex-shrink-0 flex-grow-0"
            draggable
            onDragStart={(e) => handleDragStart(e, album)}
          >
            <AlbumSquare
              color={generateRandomColor()}
              artist={album.artists[0].name}
              album={album.name}
              image={album.images[0].url}
              releaseDate={album.release_date}
              link={album.external_urls.spotify}
              inDropdown={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

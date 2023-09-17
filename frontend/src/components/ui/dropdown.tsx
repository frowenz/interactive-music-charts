// dropdown.tsx
import React from 'react';
import { useDraggedItem } from '@/contexts/DraggedItemContext';
import AlbumSquare from '@components/AlbumSquare';
import { generateRandomColor } from '@/lib/utils';

const Dropdown = ({ data, setQuery }) => {
  const { draggedItem, setDraggedItem } = useDraggedItem();

  const handleDragStart = (e, album) => {
    setQuery('');
    setDraggedItem({
      type: 'album',
      color: generateRandomColor(),
      artist: album.artists[0].name,
      name: album.name,
      releaseDate: album.release_date,
      image: album.images[0].url,
      link: album.external_urls.spotify,
    });
  };

  return (
    <div className="absolute top left-0 w-screen z-10 overflow-x-auto">
      <div className="bg-gray-100 shadow-lg flex flex-row">
        {data.map((album) => (
            <AlbumSquare
              draggable
              onDragStart={(e) => handleDragStart(e, album)}
              color={generateRandomColor()}
              artist={album.artists[0].name}
              name={album.name}
              image={album.images[0].url}
              releaseDate={album.release_date}
              link={album.external_urls.spotify}
              inDropdown={true}
              key={album.id}
            />
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

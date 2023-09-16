import React, { useState, useEffect } from 'react';
import AlbumSquare from '@components/AlbumSquare';
import Heading from '@components/Heading';
import { generateRandomColor } from '@/lib/utils';
import { useDraggedItem } from '../contexts/DraggedItemContext';
import axios from 'axios';
interface AlbumInfo {
  type: 'album'; // added type field
  color: string;
  artist: string;
  name: string;
  releaseDate: string;
  image: string;
  link: string;
}

interface HeaderInfo {
  type: 'header'; // added type field
  color: string;
}

type GridElement = AlbumInfo | HeaderInfo;

const AlbumGrid = () => {
  const { draggedItem, setDraggedItem } = useDraggedItem();
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [albums, setAlbums] = useState<AlbumInfo[]>([]);
  const [elements, setElements] = useState<GridElement[]>([]);

  useEffect(() => {
    const newHeading: HeaderInfo = {
      type: 'header',
      color: 'green',
    };

    setElements([newHeading]);
  }, []);

  useEffect(() => {
    const fetchAlbums = async (uris: string[]) => {
      const BATCH_SIZE = 20; // Spotify allows up to 20 albums per request
      const DELAY = 0; // Delay in milliseconds between batches

      for (let i = 0; i < uris.length; i += BATCH_SIZE) {
        const batch = uris.slice(i, i + BATCH_SIZE);

        // Convert URIs to IDs
        const ids = batch.map((uri) => uri.split(':').pop()).join(',');
        console.log(ids);

        try {
          const response = await axios.get(`/api/spotifySearch?ids=${ids}`);
          const albumsData = await response.data.albums;
          const newAlbums = albumsData.map((albumInfo: any) => ({
            color: generateRandomColor(),
            artist: albumInfo.artists[0].name,
            name: albumInfo.name,
            releaseDate: albumInfo.release_date,
            image: albumInfo.images[0].url,
            link: albumInfo.external_urls.spotify,
          }));

          setElements((prevAlbums) => [...prevAlbums, ...newAlbums]);
        } catch (err) {
          console.log('Error fetching batch:', err);
        }

        // Introduce delay before the next batch
        await new Promise((resolve) => setTimeout(resolve, DELAY));
      }
    };

    fetch('uris.json')
      .then((response) => response.json())
      .then((data) => fetchAlbums(data))
      .catch((err) => console.error('Error reading uris.json:', err));
  }, []);

  const handleDragStart = (e: any, index: any) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (e: any, index: any) => {
    e.preventDefault();
    const newElements = [...elements];
    if (draggedItem) {
      newElements.splice(index, 0, draggedItem);
      setElements(newElements);
      setDraggedItem(null);
      handleDragStart(e, index);
    } else {
      // No draggingIndex means no drag operation in progress
      if (draggingIndex === null) return;

      // Avoid pointless rearrangement
      if (draggingIndex === index) return;

      // Clone the existing elements
      const newElements = [...elements];

      // Remove the item at the dragging index
      const [movedItem] = newElements.splice(draggingIndex, 1);

      // Insert it at the new index
      newElements.splice(index, 0, movedItem);

      setElements(newElements);
      setDraggingIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  return (
    <div className="grid-container">
      {elements.map((element, index) => {
        if (element && element.type === 'header') {
          return (
            <Heading
              color={element.color}
              key={index}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            />
          );
        } else {
          return (
            <AlbumSquare
              color={element.color}
              artist={element.artist}
              name={element.name}
              image={element.image}
              link={element.link}
              releaseDate={element.releaseDate}
              key={index}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            />
          );
        }
      })}
    </div>
  );
};

export default AlbumGrid;

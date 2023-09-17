import React, { useState, useEffect } from 'react';
import AlbumSquare from '@components/AlbumSquare';
import Heading from '@components/Heading';
import { generateRandomColor } from '@/lib/utils';
import TopBar from '@/components/TopBar';
import { useDraggedItem } from '../contexts/DraggedItemContext';
import axios from 'axios';
import { Type } from 'typescript';
interface AlbumInfo {
  type: 'album';
  color: string;
  artist: string;
  name: string;
  releaseDate: string;
  image: string;
  link: string;
}
interface HeaderInfo {
  type: 'header';
  color: string;
  text: string;
  id: number;
}

type GridElement = AlbumInfo | HeaderInfo;

const AlbumGrid = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [draggingType, setDraggingType] = useState<String | null>(null);
  const [elements, setElements] = useState<GridElement[]>([]);

  const { draggedItem, setDraggedItem } = useDraggedItem();

  const addNewHeading = () => {
    const newHeading: HeaderInfo = {
      type: 'header',
      color: 'green', // Or any color you want to set
      text: 'New heading',
      id: Date.now(), // Using timestamp for a unique id
    };
    setElements((prevElements) => [newHeading, ...prevElements]);
  };

  useEffect(() => {
    const newHeading: HeaderInfo = {
      type: 'header',
      color: 'green',
      text: 'double click to change',
      id: 0,
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

        try {
          const response = await axios.get(`/api/spotifySearch?ids=${ids}`);
          const albumsData = await response.data.albums;
          const newAlbums = albumsData.map((albumInfo: any) => ({
            type: 'album',
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

  const handleDragStart = (e: any, index: any, type: Type) => {
    setDraggingType(type);
    setDraggingIndex(index);
    setIsDragging(true);
  };

  const handleDragOver = (e: any, index: any) => {
    e.preventDefault();
    const newElements = [...elements];
    if (draggedItem) {
      newElements.splice(index, 0, draggedItem);
      setElements(newElements);
      setDraggedItem(null);
      handleDragStart(e, index, draggedItem.type);
    } else {
      // No draggingIndex means no drag operation in progress
      if (draggingIndex === null) return;

      // Avoid pointless rearrangement
      if (draggingIndex === index) return;

      const overElement = e.currentTarget;
      const rect = overElement.getBoundingClientRect();
      const relY = e.clientY - rect.top;
      const halfHeight = rect.height / 2;

      if (draggingType === 'header' || elements[index].type === 'header') {
        let position = 'bottom';

        if (relY < halfHeight) {
          position = 'top';
        }

        if (position === 'top' && index > draggingIndex) return;
        if (position === 'bottom' && index < draggingIndex) return;
      }

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
    setDraggingType(null);
    setIsDragging(false);
  };

  const handleDeleteItem = (e, index: number) => {
    console.log(index)
    const newElements = [...elements];
    newElements.splice(index, 1);
    setElements(newElements);
  };

  const clearAll = () => {
    setElements([]);
  };

  return (
    <>
      <TopBar
        onAddHeading={addNewHeading}
        isDragging={isDragging}
        handleDeleteItem={handleDeleteItem}
        draggingIndex={draggingIndex}
        setIsDragging={setIsDragging}
        clearAll={clearAll}
      />
      <div className="grid-container">
        {elements.map((element, index) => {
          if (element.type === 'header') {
            return (
              <Heading
                color={element.color}
                key={index}
                text={element.text}
                onTextChange={(newText) => {
                  // Find the element by id and update its text
                  const updatedElements = elements.map((el) => {
                    if (
                      'id' in el &&
                      el.id === element.id &&
                      el.type === 'header'
                    ) {
                      return { ...el, text: newText };
                    }
                    return el;
                  });
                  setElements(updatedElements);
                  console.log(elements);
                }}
                onDragStart={(e) => handleDragStart(e, index, element.type)}
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
                onDragStart={(e) => handleDragStart(e, index, element.type)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default AlbumGrid;

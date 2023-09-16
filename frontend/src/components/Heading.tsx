// Heading.tsx
import React from 'react';
import '@styles/grid.css';

interface HeadingProps {
  color: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

const Heading: React.FC<HeadingProps> = ({ color, ...dragProps }) => {
  return (
    <div
      className={`header-element w-screen flex text-5xl`}
      draggable
      {...dragProps}
    >
      /mu/ essentials
    </div>
  );
};

export default Heading;

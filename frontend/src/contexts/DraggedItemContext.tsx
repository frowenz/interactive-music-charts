// DraggedItemContext.tsx
import React, { createContext, useContext, useState, FC } from 'react';

interface DraggedItem {
    id: string;
    artists: any[]; // Replace any[] with your Artist type
    name: string;
    images: any[]; // Replace any[] with your Image type
}

interface ContextProps {
  draggedItem: DraggedItem | null;
  setDraggedItem: React.Dispatch<React.SetStateAction<DraggedItem | null>>;
}

const DraggedItemContext = createContext<ContextProps | undefined>(undefined);

export const DraggedItemProvider: FC = ({ children }) => {
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);

  return (
    <DraggedItemContext.Provider value={{ draggedItem, setDraggedItem }}>
      {children}
    </DraggedItemContext.Provider>
  );
};

export const useDraggedItem = (): ContextProps => {
  const context = useContext(DraggedItemContext);
  if (!context) {
    throw new Error('useDraggedItem must be used within a DraggedItemProvider');
  }
  return context;
};

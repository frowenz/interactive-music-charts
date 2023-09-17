import React, { useState, useRef, useEffect } from 'react';
import '@styles/grid.css';

interface HeadingProps {
  color: string;
  text: string;
  onTextChange: (text: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

const Heading: React.FC<HeadingProps> = ({ color, text, onTextChange, ...dragProps }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    onTextChange(e.target.value);
  };
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  const handleDoubleClick = () => {
    setIsEditable(true);
  };

  const handleBlur = () => {
    setIsEditable(false);
  };

  return (
    <div
      className={`header-element w-screen flex text-5xl h-20`}
      draggable
      {...dragProps}
    >
      {
        isEditable ? (
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={handleTextChange}
            onBlur={handleBlur}
          />
        ) : (
          <span onDoubleClick={handleDoubleClick}>
            {inputText}
          </span>
        )
      }
    </div>
  );
};

export default Heading;

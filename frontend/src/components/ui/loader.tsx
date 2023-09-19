import React from 'react';
import './Loader.css'; // Import the CSS from the Loader.css file



const Loader = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="#000" viewBox="0 0 24 24">
      <g className="spinner">
        <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"/>
      </g>
    </svg>
  );
};

export default Loader;

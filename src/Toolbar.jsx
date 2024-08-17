import React from 'react';

const Toolbar = ({ onAddShape, onAddImage, onTransformShape }) => {
  return (
    <div className="toolbar">
      <button onClick={() => onAddShape('rect')}>Add Rectangle</button>
      <button onClick={() => onAddShape('circle')}>Add Circle</button>
      <button onClick={onAddImage}>Add Image</button>
      <button onClick={onTransformShape}>Transform Shape</button>
    </div>
  );
};

export default Toolbar;

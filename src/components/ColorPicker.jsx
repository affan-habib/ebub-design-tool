// ColorPicker.js
import React from 'react';
import { ChromePicker } from 'react-color';

const ColorPicker = ({ color, onColorChange, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: '2',
        top: '0',
        right: '0',
        left: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div
        style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }}
        onClick={onClose}
      />
      <ChromePicker
        color={color}
        onChange={(newColor) => onColorChange(newColor.hex)}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};

export default ColorPicker;

// ColorPicker.js
import React from 'react';
import { PhotoshopPicker } from 'react-color';
import { displayColorPicker, setPageBackgroundColor } from '../store/pagesSlice';
import { useDispatch, useSelector } from 'react-redux';

const ColorPicker = () => {
  const pages = useSelector((state) => state.pages.pages);
  const currentPageIndex = useSelector((state) => state.pages.currentPageIndex);
  const currentPage = pages[currentPageIndex];
  const dispatch = useDispatch();
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100vh',
        width: '100vw',
        zIndex: '5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{ position: 'absolute', top: '0px', right: '0px', bottom: '0px', left: '0px' }}
        onClick={() => dispatch(displayColorPicker(false))}
      />
      <PhotoshopPicker
        color={currentPage.color}
        onChange={(color) => dispatch(setPageBackgroundColor(color.hex))}
      />
    </div>
  );
};

export default ColorPicker;

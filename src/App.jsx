// App.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditorComponent from './components/EditorComponent';
import ColorPicker from './components/ColorPicker';
import PageControls from './components/PageControls';
import { setPageBackgroundColor, setPageContent } from './store/pagesSlice';

const App = () => {
  const pages = useSelector((state) => state.pages.pages);
  const currentPageIndex = useSelector((state) => state.pages.currentPageIndex);
  const currentPage = pages[currentPageIndex];
  const displayColorPicker = useSelector((state) => state.pages.displayColorPicker);
  const dispatch = useDispatch();
  const handleColorChange = (color) => {
    dispatch(setPageBackgroundColor(color));
  };

  const handleCloseColorPicker = () => {
    setDisplayColorPicker(false);
  };

  return (
    <div className="relative">
      {displayColorPicker && (
        <ColorPicker />
      )}
      <PageControls />
      <EditorComponent
        initialContent={currentPage.content}

      />
    </div>
  );
};

export default App;

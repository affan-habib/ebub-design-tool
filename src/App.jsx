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
  const [backgroundColor, setBackgroundColor] = useState(currentPage.color);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
const dispatch = useDispatch();
  const handleColorChange = (color) => {
    setBackgroundColor(color);
    dispatch(setPageBackgroundColor(color));
  };

  const handleCloseColorPicker = () => {
    setDisplayColorPicker(false);
  };

  return (
    <div className="relative">
      <PageControls />
      <EditorComponent 
        initialContent={currentPage.content}
        onContentChange={(content) => dispatch(setPageContent (content))}
      />
      {displayColorPicker && (
        <ColorPicker 
          color={backgroundColor}
          onColorChange={handleColorChange}
          onClose={handleCloseColorPicker}
        />
      )}
    </div>
  );
};

export default App;

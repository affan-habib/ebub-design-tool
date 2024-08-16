// App.js
import React from 'react';
import { useSelector } from 'react-redux';
import EditorComponent from './components/EditorComponent';
import ColorPicker from './components/ColorPicker';
import PageControls from './components/PageControls';

const App = () => {
  const pages = useSelector((state) => state.pages.pages);
  const currentPageIndex = useSelector((state) => state.pages.currentPageIndex);
  const currentPage = pages[currentPageIndex];
  const displayColorPicker = useSelector((state) => state.pages.displayColorPicker);

  return (
    <div className="relative body-class">
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

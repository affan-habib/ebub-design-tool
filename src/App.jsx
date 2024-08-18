// App.js
import React from 'react';
import { useSelector } from 'react-redux';
import EditorComponent from './components/EditorComponent';
import ColorPicker from './components/ColorPicker';
import PageControls from './components/PageControls';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';

const App = () => {
  const displayColorPicker = useSelector((state) => state.pages.displayColorPicker);
  return (
    <div className="relative body-class">
      {displayColorPicker && (
        <ColorPicker />
      )}
      <PageControls />
      <EditorComponent />
      <LeftSidebar />
      <RightSidebar />
    </div>
  );
};

export default App;

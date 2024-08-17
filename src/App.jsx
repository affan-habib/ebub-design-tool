// App.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditorComponent from './components/EditorComponent';
import ColorPicker from './components/ColorPicker';
import PageControls from './components/PageControls';
import PaintApp from './components/Canvas';

const App = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const displayColorPicker = useSelector((state) => state.pages.displayColorPicker);

  return (
    <div className="relative body-class">
      <button onClick={() => setShowCanvas(true)}>Show Canvas</button>
      <button onClick={() => setShowCanvas(false)}>Show Editor</button>
      {displayColorPicker && (
        <ColorPicker />
      )}
      <PageControls />
      {showCanvas ? <PaintApp /> : <EditorComponent/>}
    </div>
  );
};

export default App;

// CreateEbook.js
import React from 'react';
import { useSelector } from 'react-redux';
import EditorComponent from '../sections/EditorComponent';
import ColorPicker from '../components/ColorPicker';
import PageControls from '../sections/PageControls';
import LeftSidebar from '../sections/LeftSidebar';
import RightSidebar from '../sections/RightSidebar';

const CreateEbook = () => {
  const displayColorPicker = useSelector((state) => state.pages.displayColorPicker);
  return (
    <>
      {displayColorPicker && (
        <ColorPicker />
      )}
      <PageControls />
      <EditorComponent />
      <LeftSidebar />
      <RightSidebar />
    </>
  );
};

export default CreateEbook;

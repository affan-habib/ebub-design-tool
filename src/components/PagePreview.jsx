import React from 'react';
import { getAllHtmlDesigns } from '../data/htmlStrings';

const PagePreview = () => {
  const htmlDesigns = getAllHtmlDesigns();

  return (
    <>
      {htmlDesigns.map((htmlDesign, index) => (
        <div
          key={index}
          className='flex items-center justify-center p-4'
        >
          <div
            dangerouslySetInnerHTML={{ __html: htmlDesign }}
            className='w-full'
            style={{
              transform: 'scale(0.6)',
              transformOrigin: 'top left',
              width: '210mm', // Width of A4 in millimeters
              height: 'auto' // Adjust height accordingly
            }}
          />
        </div>
      ))}
    </>
  );
};

export default PagePreview;

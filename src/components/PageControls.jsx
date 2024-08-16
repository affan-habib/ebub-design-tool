// PageControls.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchPage, deletePage, addPage } from '../store/pagesSlice';

const PageControls = () => {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.pages.pages);
  const currentPageIndex = useSelector((state) => state.pages.currentPageIndex);

  const handleSwitchPage = (index) => {
    dispatch(switchPage(index));
  };

  const handleDeletePage = (index) => {
    if (pages.length > 1) {
      dispatch(deletePage(index));
      dispatch(switchPage(index > 0 ? index - 1 : 0));
    }
  };

  const handleAddPage = () => {
    dispatch(addPage());
  };

  return (
    <div className="flex justify-between p-2">
      <div className="flex flex-wrap">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSwitchPage(index)}
            className={`flex items-center justify-center ${index === currentPageIndex ? '' : 'bg-gray-800'} m-1`}
          >
            <span className="mr-2">Page {index + 1}</span>
            <svg
              onClick={(e) => {
                e.stopPropagation();
                handleDeletePage(index);
              }}
              viewPort="0 0 12 12"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              className="bi bi-x ml-1 cursor-pointer mt-1"
              viewBox="0 0 16 16"
            >
              <line x1="1" y1="11"
                x2="11" y2="1"
                stroke="white"
                stroke-width="2" />
              <line x1="1" y1="1"
                x2="11" y2="11"
                stroke="white"
                stroke-width="2" />
            </svg>
          </button>
        ))}
      </div>
      <button onClick={handleAddPage} className="ml-2">
        Add Page
      </button>
    </div>
  );
};

export default PageControls;

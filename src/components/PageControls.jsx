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
    <div className="flex justify-between p-4">
      <div className="flex flex-wrap">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSwitchPage(index)}
            className={`flex items-center ${index === currentPageIndex ? '' : 'bg-gray-800'} m-1`}
          >
            Page {index + 1}
            <svg
              onClick={(e) => {
                e.stopPropagation();
                handleDeletePage(index);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x ml-1 cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.5 1.5a.5.5 0 0 1 .707 0L8 7.293 14.793 1.5a.5.5 0 0 1 .707.707L8.707 8l6.793 6.793a.5.5 0 0 1-.707.707L8 8.707l-6.793 6.793a.5.5 0 0 1-.707-.707L7.293 8 1.5 1.207a.5.5 0 0 1 0-.707z"
              />
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

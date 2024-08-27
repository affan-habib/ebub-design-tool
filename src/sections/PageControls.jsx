import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchPage, deletePage, addPage } from '../store/pagesSlice';
import { Icon } from "@iconify/react";

const PageControls = () => {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.pages.pages);
  const currentPageIndex = useSelector((state) => state.pages.currentPageIndex);
  const [isListViewVisible, setIsListViewVisible] = useState(false);
  const listRef = useRef(null);

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

  const toggleListView = () => {
    setIsListViewVisible(!isListViewVisible);
  };

  const handleClickOutside = (e) => {
    if (listRef.current && !listRef.current.contains(e.target)) {
      setIsListViewVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 bg-white shadow z-10 border" ref={listRef}>
      <div className="flex gap-4 relative">
        <button onClick={handleAddPage} className="ml-2 flex items-center">
          <Icon icon="akar-icons:plus" className="mr-2" />
          Add Page
        </button>
        <button onClick={toggleListView} className="ml-2 flex items-center">
          <Icon icon="mdi:menu" className="mr-2" />
          List View
        </button>

        {/* List View Dropdown */}
        {isListViewVisible && (
          <div className="absolute bottom-12 left-[160px] transform -translate-x-1/4 w-36 bg-white shadow-lg rounded border overflow-y-auto max-h-60 z-20" style={{ scrollbarWidth: 'thin' }}>
            {pages.map((_, index) => (
              <div>
                <div key={index} className="flex items-center justify-between p-1 hover:bg-gray-100">
                  <button
                    key={index}
                    onClick={() => handleSwitchPage(index)}
                    className={`flex items-center justify-center whitespace-nowrap ${index !== currentPageIndex ? '' : 'bg-gray-600 text-white'} m-1 px-2`}
                  >
                    <span className="mr-2">Page {index + 1}</span>
                    <Icon
                      icon="bi:trash"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePage(index);
                      }}
                      className="ml-1 cursor-pointer mt-1"
                      style={{ color: 'tomato' }}
                    />
                  </button>
                </div>
                <hr className=" border-r border-gray-200" />
              </div>
            ))}
          </div>
        )}

        <hr className="my-2 border-r border-gray-200" />
        <div
          className="flex gap-2 overflow-x-auto max-w-[1000px]"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}
        >
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSwitchPage(index)}
              className={`flex items-center justify-center whitespace-nowrap ${index !== currentPageIndex ? '' : 'bg-gray-600 text-white'} m-1 px-2`}
            >
              <span className="mr-2">Page {index + 1}</span>
              <Icon
                icon="bi:trash"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeletePage(index);
                }}
                className="ml-1 cursor-pointer mt-1"
                style={{ color: 'tomato' }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageControls;

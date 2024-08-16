import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import {
  setPageContent,
  setPageBackgroundColor,
  addPage,
  switchPage,
  deletePage,
} from './store';
import './App.css';
import { ChromePicker } from 'react-color';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

export default function App() {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.pages.pages);
  const currentPageIndex = useSelector((state) => state.pages.currentPageIndex);
  const currentPage = pages[currentPageIndex];
  const [initialContent, setInitialContent] = useState(currentPage.content);
  const [backgroundColor, setBackgroundColor] = useState(currentPage.color);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  // Only update the editor content and background color when the page changes
  useEffect(() => {
    setInitialContent(currentPage.content);
    setBackgroundColor(currentPage.color);
    if (editorRef.current) {
      editorRef.current.setContent(currentPage.content);
      editorRef.current.getBody().style.backgroundColor = currentPage.color;
    }
  }, [currentPageIndex]);

  // Handle color picker changes
  const changeBackgroundColor = (color) => {
    if (editorRef.current) {
      editorRef.current.getBody().style.backgroundColor = color;
      editorRef.current.focus();
      dispatch(setPageBackgroundColor(color));
    }
  };

  const handleColorChange = (color) => {
    changeBackgroundColor(color.hex);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleAddPage = () => {
    dispatch(addPage());
  };

  const handleSwitchPage = (index) => {
    dispatch(switchPage(index));
  };

  const handleDeletePage = (index) => {
    if (pages.length > 1) {
      dispatch(deletePage(index));
      dispatch(switchPage(index > 0 ? index - 1 : 0));
    }
  };

  const bodyStyle = `
    body {
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      margin: 0;
      padding: 0;
      background-color: ${backgroundColor};
    }
  `;

  const pageStyle = `
    div[style*="width: 8.5in; height: 11in;"] {
      width: 8.5in;
      height: 11in;
      border: 1px solid black;
      margin: 20px auto;
    }
    .editor-layer {
      position: relative;
      padding: 10px;
      border: 1px dashed #ccc;
      margin: 10px 0;
    }
  `;

  const contentStyle = bodyStyle + pageStyle;

  return (
    <div className="relative">
      <div className="flex justify-between">
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
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={initialContent}
        onEditorChange={(newContent) => {
          dispatch(setPageContent(newContent));
        }}
        init={{
          height: '100vh',
          menubar: true,
          branding: false,
          promotion: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'preview',
            'help',
            'wordcount',
          ],
          toolbar:
            'blocks | bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | table | image media | help | fontsizeselect | changeBackground',
          content_style: contentStyle,
          setup: (editor) => {
            editor.ui.registry.addMenuButton('changeBackground', {
              text: 'Change Background',
              fetch: (callback) => {
                const items = [
                  {
                    type: 'menuitem',
                    text: 'Green',
                    onAction: () => changeBackgroundColor('green'),
                  },
                  {
                    type: 'menuitem',
                    text: 'Yellow',
                    onAction: () => changeBackgroundColor('yellow'),
                  },
                  {
                    type: 'menuitem',
                    text: 'Custom',
                    onAction: () => setDisplayColorPicker(true),
                  },
                ];
                callback(items);
              },
            });

            editor.on('init', () => {
              editor.getBody().style.overflow = 'hidden';
              editor.getBody().style.backgroundColor = currentPage.color;
            });
          },
        }}
      />
      {displayColorPicker && (
        <div
          style={{
            position: 'fixed',
            zIndex: '2',
            top: '0',
            right: '0',
            left: '0',
            bottom: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height: '100vh',
            width: '100vw',
          }}
        >
          <div
            style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }}
            onClick={handleClose}
          />
          <ChromePicker
            color={backgroundColor}
            onChange={handleColorChange}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}
    </div>
  );
}

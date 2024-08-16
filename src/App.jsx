import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { setPageContent, setPageBackgroundColor, addPage, switchPage } from './store';
import './App.css';
import { ChromePicker } from 'react-color';

export default function App() {
  const editorRef = useRef(null);
  const content = useSelector((state) => state.pages.pages[state.pages.currentPageIndex].content);
  const backgroundColor = useSelector((state) => state.pages.pages[state.pages.currentPageIndex].color);
  const dispatch = useDispatch();
  const [initialContent] = useState('<p>This is the initial content of the editor.</p>');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const pages = useSelector((state) => state.pages.pages); // Add this line to get pages from state

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const changeBackgroundColor = (color) => {
    editorRef.current.getBody().style.backgroundColor = color; // Set the editor's background color
    dispatch(setPageBackgroundColor(color)); // Update the state with the new background color
  };

  const handleColorChange = (color) => {
    changeBackgroundColor(color.hex);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
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

  const handleAddPage = () => {
    dispatch(addPage());
    // Set the new page's background color to default
    const newPageIndex = pages.length; // Get the index of the new page
    dispatch(setPageBackgroundColor('#ffffff')); // Set default color for the new page
  };

  const handleSwitchPage = (index) => {
    dispatch(switchPage(index));
    const newContent = pages[index].content; // Get content of the new page
    editorRef.current.setContent(newContent); // Set the editor content to the new page's content
    // Update the editor's background color to the new page's color
    editorRef.current.getBody().style.backgroundColor = pages[index].color; // Set the background color for the new page
  };

  return (
    <div className='relative'> 
      <div>
        {pages.map((_, index) => ( // Use pages instead of state.pages
          <button key={index} onClick={() => handleSwitchPage(index)}>
            Page {index + 1}
          </button>
        ))}
        <button onClick={handleAddPage}>Add Page</button>
      </div>
      <Editor
        tinymceScriptSrc='/tinymce/tinymce.min.js'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={initialContent}
        onEditorChange={(newContent) => dispatch(setPageContent(newContent))}
        init={{
          height: '100vh',
          menubar: true,
          branding: false,
          promotion: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'blocks | bold italic forecolor | alignleft aligncenter ' +
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
                    onAction: () => changeBackgroundColor('green')
                  },
                  {
                    type: 'menuitem',
                    text: 'Yellow',
                    onAction: () => changeBackgroundColor('yellow')
                  },
                  {
                    type: 'menuitem',
                    text: 'Custom',
                    onAction: () => setDisplayColorPicker(true)
                  }
                ];
                callback(items);
              }
            });

            editor.on('init', () => {
              editor.getBody().style.overflow = 'hidden';
            });
          }
        }}
      />
      {displayColorPicker && <div style={{ position: 'fixed', zIndex: '2', top: '0', right: '0', left: '0', bottom: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100vh', width: '100vw' }}>
        <div style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }} onClick={handleClose} />
        <ChromePicker color={backgroundColor} onChange={handleColorChange} style={{ position: 'fixed', top: '5100px', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>}
    </div>
  );
}
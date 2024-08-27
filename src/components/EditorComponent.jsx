import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageContent, setPageBackgroundColor, displayColorPicker, setScale } from '../store/pagesSlice';

const EditorComponent = () => {
  const editorRef = useRef(null);
  const pages = useSelector((state) => state.pages.pages);
  const currentPageIndex = useSelector((state) => state.pages.currentPageIndex);
  const currentPage = pages[currentPageIndex];
  const scale = useSelector((state) => state.pages.scale); // Get scale from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(currentPage.content);
    }
  }, [currentPageIndex]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getBody().style.backgroundColor = currentPage.color;
      editorRef.current.getBody().style.transform = `scale(${scale})`;
      editorRef.current.getBody().style.transformOrigin = 'top center';
      editorRef.current.getBody().style.width = `${210 * scale}mm`; // Adjust width for scaling
      editorRef.current.getBody().style.height = `${297 * scale}mm`; // Adjust height for scaling
    }
  }, [currentPage.color, scale]); // Update on color and scale changes

  const handleEditorChange = (newContent) => {
    dispatch(setPageContent(newContent));
  };

  const handleScaleChange = (newScale) => {
    dispatch(setScale(newScale));
  };

  return (
    <>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        onInit={(_evt, editor) => editorRef.current = editor}
        value={currentPage.content}
        onEditorChange={handleEditorChange}
        init={{
          height: '100vh',
          menubar: true,
          branding: false,
          promotion: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'anchor',
            'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime',
            'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'blocks | bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | table | image media | help | fontsizeselect | changeBackground',
          content_style: `
            body {
              width: 210mm;
              height: 297mm;
              border: 1px solid #ccc;
              border-radius: 8px;
              background-color: ${currentPage.color}; /* Dynamically set background color */
              // overflow: hidden; /* Prevent scrolling */
              margin: 20px auto;
              padding: 20px;
              position: relative;
              transform: scale(${scale}); /* Apply scaling */
              transform-origin: top center; /* Transform scaling from top left */
            }
          `,
          setup: (editor) => {
      

            editor.ui.registry.addMenuButton('changeBackground', {
              text: 'Change Background',
              fetch: (callback) => {
                const items = [
                  { type: 'menuitem', text: 'Custom', onAction: () => dispatch(displayColorPicker(true)) },
                  { type: 'menuitem', text: 'Tomato', onAction: () => dispatch(setPageBackgroundColor('tomato')) },
                  { type: 'menuitem', text: 'Pink', onAction: () => dispatch(setPageBackgroundColor('pink')) },
                  { type: 'menuitem', text: 'Lightgreen', onAction: () => dispatch(setPageBackgroundColor('lightgreen')) },
                ];
                callback(items);
              },
            });
          },
        }}
      />
    </>
  );
};

export default EditorComponent;

// EditorComponent.js
import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageContent, setPageBackgroundColor, displayColorPicker } from '../store/pagesSlice';

const EditorComponent = ({ initialContent }) => {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pages.pages[state.pages.currentPageIndex]);

  // Sync editor content and background color with current page
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(initialContent);
      editorRef.current.getBody().style.backgroundColor = currentPage.color;
    }
  }, [currentPage.color]);

  const handleEditorChange = (newContent) => {
    dispatch(setPageContent(newContent));
  };
  const [initialContentState, setInitialContentState] = useState('<p>Hi</p>');
  useEffect(() => {
    setInitialContentState(initialContent);
  }, []);
  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      onInit={(_evt, editor) => (editorRef.current = editor)}
      initialValue={initialContentState}
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
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            margin: 0;
            padding: 0;
            background-color: ${currentPage.color};
          }
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
        `,
        setup: (editor) => {
          editor.ui.registry.addMenuButton('changeBackground', {
            text: 'Change Background',
            fetch: (callback) => {
              const items = [
                { type: 'menuitem', text: 'Fancy Green', onAction: () => dispatch(setPageBackgroundColor('#007acc')) },
                { type: 'menuitem', text: 'Fancy Yellow', onAction: () => dispatch(setPageBackgroundColor('#f7dc6f')) },
                { type: 'menuitem', text: 'Pastel Pink', onAction: () => dispatch(setPageBackgroundColor('#ffaef')) },
                { type: 'menuitem', text: 'Custom', onAction: () => dispatch(displayColorPicker(true)) },
              ];
              callback(items);
            },
          });
        },
      }}
    />
  );
};

export default EditorComponent;

// EditorComponent.js
import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageContent, setPageBackgroundColor, displayColorPicker } from '../store/pagesSlice';

const EditorComponent = () => {
  const editorRef = useRef(null);
  const pages = useSelector((state) => state.pages.pages);
  const currentPageIndex = useSelector((state) => state.pages.currentPageIndex);
  const currentPage = pages[currentPageIndex];
  console.log(currentPageIndex, currentPageIndex, 'hello');
  const dispatch = useDispatch();
  useEffect(() => {
    setInitialContentState(currentPage.content);
    // console.log(cur);
  }, [currentPageIndex]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(currentPage.content);
      // editorRef.current.getBody().style.backgroundColor = currentPage.color;
    }
  }, [currentPage.color]);

  const handleEditorChange = (newContent) => {
    dispatch(setPageContent(newContent));
  };

  const [initialContentState, setInitialContentState] = useState('');

  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      onInit={(_evt, editor) => editorRef.current = editor}
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
            width: 210mm;
            height: 297mm;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: ${currentPage.color}; /* Changed to dynamically set background color */
            overflow: scroll;
            margin: 0 auto;
            margin-bottom: 100px;
            margin-top: 100px;
            padding: 40px;
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
  );
};

export default EditorComponent;

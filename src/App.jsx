import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { setContent, setBackgroundColor } from './store';
import './App.css';

export default function App() {
  const editorRef = useRef(null);
  const content = useSelector((state) => state.editor.content);
  const backgroundColor = useSelector((state) => state.editor.color);
  const dispatch = useDispatch();
  const [initialContent] = useState('<p>This is the initial content of the editor.</p>');
  // const [backgroundColor, setBackgroundColor] = useState('');

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const changeBackgroundColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    editorRef.current.getBody().style.backgroundColor = randomColor;
    editorRef.current.focus(); // Ensure the editor is focused to apply the background color to the current selection
    editorRef.current.execCommand('mceToggleFormat', false, 'hilitecolor', randomColor); // Apply the background color to the current selection
    dispatch(setBackgroundColor(randomColor)); // Update the state with the new background color
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
    <>
      <Editor
        tinymceScriptSrc='/tinymce/tinymce.min.js'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={initialContent}
        onEditorChange={(newContent) => dispatch(setContent(newContent))}
        init={{
          height: '100vh',
          menubar: false,
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
            editor.ui.registry.addButton('changeBackground', {
              text: 'Change Background',
              onAction: () => {
                changeBackgroundColor();
              }
            });

            editor.on('init', () => {
              editor.getBody().style.overflow = 'hidden';
            });
          }
        }}
      />
    </>
  );
}

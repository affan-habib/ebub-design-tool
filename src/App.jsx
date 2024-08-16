import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { setContent } from './store';
import './App.css';

export default function App() {
  const editorRef = useRef(null);
  const content = useSelector((state) => state.editor.content);
  const dispatch = useDispatch();
  const [initialContent] = useState('<p>This is the initial content of the editor.</p>');

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

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
          branding: false, // Removes TinyMCE logo
          promotion: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | table | image media | help | fontsizeselect',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; margin: 0; padding: 0; } ' +
            'div[style*="page-break-after"] { page-break-after: always; margin: 20px 0; } ' +
            'div[style*="width: 8.5in; height: 11in;"] { width: 8.5in; height: 11in; border: 1px solid black; margin: 20px auto; }',
          setup: (editor) => {
            editor.on('init', () => {
              editor.getBody().style.overflow = 'hidden';
            });
          }
        }}
      />
      <button onClick={log}>Log editor content</button>
      <div style={{ width: '500px', border: '1px solid black', padding: '10px', marginTop: '20px' }}>
        <pre>{JSON.stringify(content, null, 2)}</pre>
      </div>
    </>
  );
}
import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageContent } from '../store/pagesSlice';
import { getEditorConfig } from '../config/editor-config';
import '../config/EditorComponent.css';
import { setupEditor } from '../config/media-move';
const EditorComponent = () => {
  const editorRef = useRef(null);
  const pages = useSelector((state) => state.pages.pages);
  const currentPageIndex = useSelector((state) => state.pages.currentPageIndex);
  const currentPage = pages[currentPageIndex];
  const dispatch = useDispatch();

  const handleEditorChange = (newContent) => {
    dispatch(setPageContent(newContent));
  };

  useEffect(() => {
    if (editorRef.current) {
      // editorRef.current.setContent(currentPage.content);
      editorRef.current.getBody().style.backgroundColor = currentPage.color;
      editorRef.current.getBody().style.margin = currentPage.margin;
    }
  }, [currentPage.color, currentPage.margin]);
  return (
    <div className="flex justify-center items-start pt-24 pb-24 bg-gray-200 overflow-y-auto h-screen">
      <div className="editor-content">
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          onInit={(_evt, editor) => {
            editorRef.current = editor;
          }}
          value={currentPage.content}
          onEditorChange={handleEditorChange}
          init={getEditorConfig()}
        />
      </div>
    </div>
  );
};

export default EditorComponent;

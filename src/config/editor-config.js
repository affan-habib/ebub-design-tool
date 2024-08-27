import { useSelector } from "react-redux";

export const getEditorConfig = () => {
  const pages = useSelector((state) => state.pages.pages);
  const currentPageIndex = useSelector((state) => state.pages.currentPageIndex);
  const currentPage = pages[currentPageIndex];
  return {
    menubar: true,
    contextmenu: 'link image inserttable | cell row column deletetable',
    width: '100%',
    height: '100%',
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'anchor',
      'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime',
      'media', 'table', 'preview', 'inserttable', 'cell', 'row', 'column', 'deletetable'
    ],
    toolbar: 'blocks fontsize fontfamily | bold italic forecolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | table | image media | fontsizeselect addContainer addGrid',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    content_css: 'src/pages/ebook/config/EditorComponent.css',
    branding: false,
    promotion: false,
    statusbar: false,
    image_caption: true,
    image_advtab: true,
    forced_root_block: false, // Disable wrapping content in <p> by default
    extended_valid_elements: 'img[style|src|alt|width|height]', // Ensure images are treated as block elements
    valid_children: '+body[style|img]', // Allow images to be direct children of body
    setup: (editor) => {
      editor.on('init', () => {
        editor.ui.registry.addButton('addContainer', {
          text: 'Add Container',
          onAction: function () {
            editor.insertContent('<div class="container" style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">Container Content</div>');
          }
        });

        editor.ui.registry.addButton('addGrid', {
          text: 'Add Grid',
          onAction: function () {
            const columns = prompt("Enter number of columns for the grid:");
            let gridContent = '<div class="grid" style="display: flex; margin: 10px 0;">';
            for (let i = 1; i <= columns; i++) {
              gridContent += `<div class="column" style="flex: 1; padding: 10px; border: 1px solid #ddd; margin-right: 10px;">Column ${i}</div>`;
            }
            gridContent += '</div>';
            editor.insertContent(gridContent);
          }
        });
        const container = editor.getContainer();
        const toolbar = container.querySelector('.tox-toolbar-overlord');
        const menubar = container.querySelector('.tox-menubar');
        const topEditor = container.querySelector('.tox-editor-header');

        if (menubar) {
          menubar.style.width = '100vw';
          menubar.style.position = 'fixed';
          menubar.style.top = '0';
          menubar.style.left = '0';
          menubar.style.zIndex = '1000';
        }

        if (toolbar) {
          toolbar.style.width = '100vw';
          toolbar.style.position = 'fixed';
          toolbar.style.top = '32px';
          toolbar.style.left = '0';
          toolbar.style.zIndex = '999';
        }
        if (topEditor) {
          topEditor.style.padding = '0';

        }
        editor.getBody().style.backgroundColor = currentPage.color;
        editor.getBody().style.margin = currentPage.margin;
      });
    },
  };
};

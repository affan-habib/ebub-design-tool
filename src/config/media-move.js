export const setupEditor = (editor) => {
    editor.on('keydown', function (e) {
      const selectedNode = editor.selection.getNode();
      if (selectedNode.tagName === 'IMG' || selectedNode.tagName === 'VIDEO') {
        const style = window.getComputedStyle(selectedNode);
        let marginLeft = parseInt(style.marginLeft, 10) || 0;
        let marginTop = parseInt(style.marginTop, 10) || 0;

        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            marginLeft -= 1; // Adjust margin left
            selectedNode.style.marginLeft = `${marginLeft}px`;
            break;
          case 'ArrowRight':
            e.preventDefault();
            marginLeft += 1; // Adjust margin right
            selectedNode.style.marginLeft = `${marginLeft}px`;
            break;
          case 'ArrowUp':
            e.preventDefault();
            marginTop -= 1; // Adjust margin top
            selectedNode.style.marginTop = `${marginTop}px`;
            break;
          case 'ArrowDown':
            e.preventDefault();
            marginTop += 1; // Adjust margin bottom
            selectedNode.style.marginTop = `${marginTop}px`;
            break;
          default:
            break;
        }
      }
    });
  };
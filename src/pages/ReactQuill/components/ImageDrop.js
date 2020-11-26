import ReactQuill, { Quill } from 'react-quill';

const Delta = Quill.import('delta');

export class ImageDrop {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.handleDrop = this.handleDrop.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.quill.root.addEventListener('drop', this.handleDrop, false);
    this.quill.root.addEventListener('paste', this.handlePaste, false);
  }

  handleDrop(evt) {
    evt.preventDefault();
    if (evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files.length) {
      if (document.caretRangeFromPoint) {
        const selection = document.getSelection();
        const range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
        if (selection && range) {
          selection.setBaseAndExtent(
            range.startContainer,
            range.startOffset,
            range.startContainer,
            range.startOffset,
          );
        }
      }
      this.readFiles(evt.dataTransfer.files, (file) => {
        this.options.uploadImage(file);
      });
    }
  }

  handlePaste(evt) {
    evt.preventDefault();
    if (evt.clipboardData && evt.clipboardData.items && evt.clipboardData.items.length) {
      this.readFiles(evt.clipboardData.items, (file) => {
        this.options.uploadImage(file);
      });
    }
  }

  readFiles(files, callback) {
    // check each file for an image
    [].forEach.call(files, (file) => {
      if (!file.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i)) {
        return;
      }
      const asFile = file.getAsFile ? file.getAsFile() : file;
      callback(asFile);
    });
  }
}

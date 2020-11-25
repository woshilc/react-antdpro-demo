import ReactQuill from 'react-quill';
let Quill = ReactQuill.Quill;
let Embed = Quill.import('blots/block/embed');

class FileBlot extends Embed {
  static create(data) {
    const node = super.create();
    const icon = document.createElement('span');
    icon.className = 'ql-image-icon';
    icon.innerHTML = 'icon';
    node.appendChild(icon);
    node.innerHTML += data.fileName;
    // denotationChar.innerHTML = data.denotationChar;
    // node.appendChild(denotationChar);
    // node.innerHTML += data.value;
    return FileBlot.setDataValues(node, data);
  }

  static setDataValues(element, data) {
    const domNode = element;
    Object.keys(data).forEach((key) => {
      domNode.dataset[key] = data[key];
    });
    return domNode;
  }

  static value(domNode) {
    return domNode.dataset;
  }
}

FileBlot.blotName = 'noah-image';
FileBlot.tagName = 'span';
FileBlot.className = 'noah-image';

Quill.register('formats/fileBlot', FileBlot);

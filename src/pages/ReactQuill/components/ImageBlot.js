import ReactQuill from 'react-quill';

let Quill = ReactQuill.Quill;
let Embed = Quill.import('blots/embed'); //不能用blots/block/embed,会导致换行并且文本内容可以被修改

//用于指定插入编辑器中的内容以及返回的delta对象的内容
class ImageBlot extends Embed {
  static create(data) {
    const node = super.create();
    node.setAttribute('style', 'color:#7194C6;cursor:pointer;');
    node.innerHTML += data.name;
    return ImageBlot.setDataValues(node, data);
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

ImageBlot.blotName = 'noah-image';
ImageBlot.tagName = 'span';
ImageBlot.className = 'ql-noah-image';

Quill.register({
  'formats/noah-image': ImageBlot,
});

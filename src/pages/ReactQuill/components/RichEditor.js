import React, { Component, Fragment } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-mention';
import 'quill-mention/dist/quill.mention.css';
import './ImageBlot';
import { ImageDrop } from './ImageDrop';
import PropTypes from 'prop-types';
import { Button, Modal, message, Tooltip, Spin } from 'antd';
import { PaperClipOutlined, DownCircleFilled, FileTextFilled } from '@ant-design/icons';
import styles from './index.less';

Quill.register('modules/imageDrop', ImageDrop);

class FileOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleOnClick = () => {
    let visible = this.state.visible;
    this.setState({
      visible: !visible,
    });
  };

  handleVisibleChange = (visible) => {
    if (!visible) {
      this.setState({
        visible: visible,
      });
    }
  };

  handleShowModal = () => {
    this.props.handleShowModal(this.props.item);
  };

  handleDeleteFile = () => {
    this.props.deleteFile([this.props.item.id]);
  };

  handleCloseOption = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const item = this.props.item;
    return (
      <Fragment>
        {item.type.split('/')[0] == 'image' ? (
          <img
            src={item.url}
            alt={item.name}
            style={{ maxWidth: '125px', height: '62px', borderRadius: '5px' }}
          />
        ) : (
          <div
            style={{
              height: '100%',
              paddingRight: '10px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <FileTextFilled style={{ fontSize: '30px', margin: '16px 6px', color: '#aaa' }} />
            <span>{item.name}</span>
          </div>
        )}
        <div className={styles['file-item-mask']} onClick={this.handleShowModal}></div>
        <Tooltip
          title={
            <div>
              {item.url.split(':')[0] != 'blob' && (
                <p style={{ margin: '0' }}>
                  <a href={item.url} onClick={this.handleCloseOption}>
                    Download
                  </a>
                </p>
              )}
              {this.props.delete && (
                <p style={{ margin: '0' }}>
                  <a onClick={this.handleDeleteFile}>Delete</a>
                </p>
              )}
            </div>
          }
          trigger="click"
          onClick={this.handleOnClick}
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <DownCircleFilled
            className={
              this.state.visible ? styles['file-item-option-show'] : styles['file-item-option']
            }
          />
        </Tooltip>
      </Fragment>
    );
  }
}

class FileList extends Component {
  static propTypes = {
    deleteFile: PropTypes.func,
    delete: PropTypes.bool,
  };

  static defaultProps = {
    deleteFile: () => {},
    delete: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      preView: '',
      preViewVisible: false,
    };
  }

  handleShowModal = (value) => {
    this.setState({
      preViewVisible: true,
      preView: value,
    });
  };

  handleOnClose = () => {
    this.setState({
      preViewVisible: false,
    });
  };

  render() {
    const { preView, preViewVisible } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <ul className={styles['file-list']}>
          {this.props.fileList &&
            this.props.fileList.map((item, index) => {
              return (
                <li className={styles['file-item']} key={item.id}>
                  <FileOption
                    item={item}
                    handleShowModal={this.handleShowModal}
                    deleteFile={this.props.deleteFile}
                    delete={this.props.delete}
                  />
                </li>
              );
            })}
        </ul>
        {preView && (
          <Modal
            title={preView.name}
            visible={preViewVisible}
            footer={null}
            onCancel={this.handleOnClose}
          >
            {preView.type.split('/')[0] == 'image' ? (
              <img src={preView.url} alt="" style={{ width: '100%' }} />
            ) : (
              <Fragment>
                <div>
                  <FileTextFilled style={{ fontSize: '64px', color: '#ccc' }} />
                </div>
                <div>{preView.name}</div>
              </Fragment>
            )}
          </Modal>
        )}
      </div>
    );
  }
}

const CustomToolbar = (props) => (
  //富文本编辑器工具栏，注意类名以及id名
  <div id={props.toolbarId} className={styles['toolbar-wrapper']}>
    <select className="ql-header" defaultValue="">
      <option value="1" />
      <option value="2" />
      <option value="3" />
      <option value="4" />
      <option value="" />
    </select>
    {/* <select className="ql-font"></select> */}
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-strike" />
    {/* <button className="ql-blockquote" />
        <button className="ql-script" value="sub" />
        <button className="ql-script" value="super" /> */}
    <select className="ql-color"></select>
    <select className="ql-background"></select>
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    {/* <select className="ql-align" ></select> */}
    <button className="ql-link" />
    {/* <button className="ql-image" /> */}
    {props.uploadButton && (
      <button className="ql-file" style={{ padding: '0px' }}>
        {/* <FileAddFilled /> */}
        <PaperClipOutlined style={{ fontSize: '16px' }} />
      </button>
    )}
    {/* <button className="ql-file"><PaperClipOutlined /></button>
        <button className="ql-mention"><div>@</div></button> */}
    <button className="ql-clean" />
    {props.showOption && (
      <Fragment>
        <button
          className="ql-submit"
          style={{
            padding: '0px',
            marginLeft: '5px',
            width: '70px',
            border: '1px solid #ccc',
            background: '#7194c6',
            borderRadius: '5px',
            float: 'right',
            color: 'white',
          }}
        >
          {props.buttonText}
        </button>
        <button
          className="ql-cancel"
          style={{
            padding: '0px',
            width: '60px',
            border: '1px solid #ccc',
            background: '#7194c6',
            borderRadius: '5px',
            float: 'right',
            color: 'white',
          }}
        >
          cancel
        </button>
      </Fragment>
    )}
  </div>
);

class RichEditor extends Component {
  static propTypes = {
    atValues: PropTypes.array, //@人员列表
    content: PropTypes.string, //编辑区域初始内容
    buttonText: PropTypes.string, //提交按钮名称
    getResult: PropTypes.func, //获取编辑结果
    toolbarId: PropTypes.string, //工具栏id
    deleteFile: PropTypes.func, //删除编辑区域文件
    close: PropTypes.func, //关闭编辑器
    fileList: PropTypes.array, //附件列表
    clearFileList: PropTypes.bool, //取消时是否清除附件列表
    uploadButton: PropTypes.bool, //是否显示附件按钮
    loadFileList: PropTypes.bool, //是否加载传入的filelist
    showOption: PropTypes.bool, //是否显示提交取消按钮
  };

  static defaultProps = {
    atValues: [],
    content: '<p><br/></p>',
    buttonText: 'submit',
    getResult: () => {},
    toolbarId: '',
    deleteFile: () => {},
    close: () => {},
    fileList: [],
    clearFileList: true,
    uploadButton: true,
    loadFileList: false,
    showOption: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      editorHtml: '',
      uploadBoxVisible: false,
      loading: false,
      src: '',
      srcList: [], //用于释放内存
      file: {},
      fileType: '',
      fileList: [],
      prevHtml: '',
      prevText: '',
    };
    this.reactQuillRef = null;
    this.uploadInput = null;
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
    if (this.props.loadFileList) {
      this.setState(
        {
          editorHtml: this.props.content,
          prevHtml: this.props.content,
          fileList: [...this.props.fileList],
        },
        () => {
          this.setPrevText();
        },
      );
    } else {
      this.setState(
        {
          editorHtml: this.props.content,
          prevHtml: this.props.content,
        },
        () => {
          this.setPrevText();
        },
      );
    }
  }

  setPrevText = () => {
    const quill = this.reactQuillRef.getEditor();
    const text = quill.getText();
    this.setState({
      prevText: text,
    });
  };

  modules = {
    toolbar: {
      //设置工具栏按钮的两种写法，采用css方式方便添加自定义按钮
      container: '#' + this.props.toolbarId,
      // container: [
      //     [{ header: [1, 2, 3, 4, false] }],
      //     ["bold", "italic", "underline", "strike", "blockquote"],
      //     [{ "script": "sub" }, { "script": "super" }, { "color": [] }, { "background": [] }],
      //     [{ "list": "ordered" }, { "list": "bullet" }, { "align": [] }],
      //     ["link", "image"],
      //     ["clean"]
      // ],
      handlers: {
        file: () => {
          this.setState({
            uploadBoxVisible: true,
          });
        },
        submit: () => {
          this.handleSubmit();
        },
        cancel: () => {
          this.handleReset();
        },
      },
    },
    mention: {
      //提及功能，若不需要该功能，不指定atvalues即可
      allowedChars: /^[\u4e00-\u9fa5_0-9A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@'],
      mentionContainerClass: styles['ql-mention-list-container'],
      //listItemClass: styles['ql-mention-list-item'],
      source: (searchTerm, renderItem, mentionChar) => {
        let values;
        if (mentionChar === '@') {
          values = this.props.atValues;
        }
        if (searchTerm.length === 0) {
          renderItem(values, searchTerm);
        } else {
          const matches = [];
          for (let i = 0; i < values.length; i++)
            if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
              matches.push(values[i]);
          renderItem(matches, searchTerm);
        }
      },
    },
    imageDrop: {
      uploadImage: (file) => {
        this.setState(
          {
            uploadBoxVisible: true,
          },
          () => {
            this.getImageBeforeUpload(file);
          },
        );
      },
    },
  };

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'align',
    'script',
    'color',
    'background',
    'link',
    'image',
    'mention',
    'clean',
    'formats/noah-image',
    'noah-image', //手动新增或者导入的blots，这里一定要配置，否则内容无法写入编辑器
  ];

  //获取焦点，需在父组件中通过onref调用
  getFocus = () => {
    this.reactQuillRef.focus();
  };

  //提供给创建页在提交时获取描述文本，通过onref调用，不想用onchange去频繁调用传参
  getDescription = () => {
    let result = {};
    let quill = this.reactQuillRef.getEditor();
    const quillText = quill.getText();
    const { editorHtml } = this.state;
    result.text = quillText;
    result.html = editorHtml;
    if (quillText && quillText.length > 1) {
      result.success = true;
    } else {
      result.success = false;
    }
    return result;
  };

  //清除creatObjectURL生成的对象，释放内存
  revokeSrc = (value) => {
    if (value.length > 0) {
      for (let src of value) {
        URL.revokeObjectURL(src);
      }
    }
  };

  handleDeleteFile = (value) => {
    let { fileList } = this.state;
    fileList = fileList.filter((file) => file.id != value);
    this.setState({
      fileList: fileList,
    });
    this.props.deleteFile(value);
  };

  //我也不知道quill有没有提供获取html文本的方法，反正我没找到，所以这里手动存储一下
  handleOnChange = (html) => {
    this.setState({
      editorHtml: html,
    });
  };

  handleSubmit = () => {
    let result = {};
    let userIds = [];
    let quill = this.reactQuillRef.getEditor();
    const quillSelection = quill.getSelection();
    const quillContent = quill.getContents();
    const quillText = quill.getText();
    const { editorHtml, prevHtml, prevText, fileList, srcList } = this.state;
    const loadFileList = this.props.loadFileList;
    const prevFileList = this.props.fileList;
    const reg = /(<p><br><\/p>|<p>\s+<\/p>)*$/gm;
    if (loadFileList) {
      const newFileList = [...new Set(fileList.concat(prevFileList))];
      if (newFileList.length > prevFileList.length) {
        result.success = true;
      } else {
        // if(editorHtml != prevHtml && quillText.trim() != prevText.trim() && quillText.trim() != ''){
        //     result.success = true;
        // }else{
        //     result.success = false;
        // }
        if (editorHtml != prevHtml) {
          result.success = true;
        } else {
          result.success = false;
        }
      }
    } else {
      if (fileList.length > 0) {
        result.success = true;
      } else {
        if (prevHtml != null) {
          if (editorHtml != prevHtml && editorHtml.replace(reg, '') != prevHtml.replace(reg, '')) {
            result.success = true;
          } else {
            result.success = false;
          }
        } else {
          if (editorHtml != prevHtml) {
            result.success = true;
          } else {
            result.success = false;
          }
        }
      }
    }
    this.revokeSrc(srcList);
    // result.selection = quillSelection;
    // result.content = quillContent;
    result.text = quillText; //纯文本
    result.html = editorHtml; //html文本
    result.fileList = fileList; //附件列表
    for (let content of quillContent.ops) {
      if (content.insert.mention) {
        userIds.push(Number.parseInt(content.insert.mention.id));
      }
    }
    if (userIds.length > 0) {
      result.mentions = userIds; //提及人员列表
    }
    this.props.getResult(result);
    this.setState({
      fileList: [],
      editorHtml: '',
    });
  };

  handleReset = () => {
    let { srcList, fileList } = this.state;
    let fileIds = [];
    if (fileList.length > 0) {
      for (let file of fileList) {
        fileIds.push(file.id);
      }
    }
    if (this.props.clearFileList && fileIds.length > 0) {
      this.props.deleteFile(fileIds);
    }
    this.revokeSrc(srcList);
    this.setState({
      editorHtml: this.props.content,
      fileList: this.props.fileList,
      srcList: [],
    });
    this.props.close();
  };

  hideUploadBox = () => {
    this.setState({
      uploadBoxVisible: false,
      src: '',
      file: {},
      fileType: '',
      loading: false,
    });
  };

  handleCancel = () => {
    if (this.state.loading == true) {
      return;
    }
    this.setState({
      uploadBoxVisible: false,
      src: '',
      file: {},
      fileType: '',
    });
  };

  selectImage = () => {
    this.uploadInput.click(); //点击modal的html结构中的input标签
  };

  //选择附件
  changeImageBeforeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    this.getImageBeforeUpload(file);
    e.target.value = null; //清空input值，否则无法重复选择同一张图
  };

  //接收附件
  getImageBeforeUpload = (file) => {
    let src = URL.createObjectURL(file);
    let srcList = this.state.srcList;
    srcList.push(src);
    this.setState({
      src: src,
      srcList: srcList,
      file: file,
      fileType: file.type,
    });
  };

  //上传附件
  handleUpload = () => {
    let this_ = this;
    const { file, src } = this_.state;
    if (!src) {
      return;
    }
    this_.setState({
      loading: true,
    });
    /*调用上传图片的封装方法*/
    this.uploadForImage(this_.props.action, file, function (response) {
      //回调函数处理进度和后端返回值
      if (response && response.success) {
        message.success('success！');
        this_.hideUploadBox(); //隐藏弹框
        //this_.imageHandler(response.data);//处理插入图片到编辑器
        let fileList = this_.state.fileList;
        let data = {};
        if (response.data.hasOwnProperty('url')) {
          data = response.data;
        } else {
          data.id = response.data.id;
          data.name = file.name;
          data.url = src;
          data.type = file.type;
        }
        fileList.push(data);
        this_.setState({
          fileList: fileList,
        });
      } else {
        message.error(response.data.message);
        this_.hideUploadBox();
      }
    });
  };

  //将图片信息插入编辑器
  imageHandler = (data) => {
    let quill = this.reactQuillRef.getEditor(); //获取到编辑器本身
    const cursorPosition = quill.getSelection() ? quill.getSelection().index : 0; //获取当前光标位置
    quill.insertEmbed(cursorPosition, 'noah-image', data, Quill.sources.USER); //插入图片
    // quill.insertText(cursorPosition + 1, " ", Quill.sources.USER);//插入空格
    // quill.setSelection(cursorPosition + 2);
    quill.setSelection(cursorPosition + 1);
  };

  //文件传输
  uploadForImage = (url, data, callback) => {
    //data是数据列表
    let this_ = this;
    if (!data) {
      this.hideUploadBox();
      return;
    }
    //创建XMLHttpRequest对象
    let xhr;
    if (window.XMLHttpRequest) {
      //非IE6
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    let form = new FormData();
    form.append('file_size', data.size);
    if (data.name.split('.')[0] == 'image') {
      const nameArr = data.name.split('.');
      const newName = `${nameArr[0]}${data.lastModified}.${nameArr[1]}`;
      form.append('filename', newName);
    } else {
      form.append('filename', data.name);
    }
    if (this.props.hasOwnProperty('taskId')) {
      form.append('task_id', this.props.taskId);
    }
    if (this.props.hasOwnProperty('commentId')) {
      form.append('comment_id', this.props.commentId);
    }
    if (this.props.hasOwnProperty('fileList')) {
      form.append('sn', this.props.fileList.length);
    }
    form.append('file', data); //文件得放最后一位，否则后台可能接收不到
    xhr.addEventListener(
      'readystatechange',
      function (e) {
        let response = e.target.response ? JSON.parse(e.target.response) : null;
        if (e.target.readyState === 4 && response) {
          callback(response);
        }
      },
      false,
    );
    xhr.addEventListener('load', (e) => {
      if (xhr.status == 400) {
        this.setState({
          loading: false,
        });
        message.error('文件格式异常，请重新上传');
      }
    });
    xhr.open('POST', url, true); // 第三个参数为async?，异步/同步
    //xhr.setRequestHeader("accessToken", token);
    xhr.send(form);
  };

  render() {
    return (
      <div className={styles['editor-wrapper']}>
        <div>
          <ReactQuill
            className={styles['quill']}
            theme="snow"
            //defaultValue={this.props.content}
            value={this.state.editorHtml}
            modules={this.modules}
            formats={this.formats}
            onChange={this.handleOnChange}
            ref={(node) => (this.reactQuillRef = node)}
          />
          {this.state.fileList.length > 0 && (
            <FileList fileList={this.state.fileList} deleteFile={this.handleDeleteFile} />
          )}
        </div>
        <CustomToolbar
          buttonText={this.props.buttonText}
          toolbarId={this.props.toolbarId}
          uploadButton={this.props.uploadButton}
          showOption={this.props.showOption}
        />

        <Modal
          title="title"
          visible={this.state.uploadBoxVisible}
          onCancel={this.handleCancel}
          onOk={this.handleUpload}
          maskClosable={false}
          width={500}
          confirmLoading={this.state.loading}
        >
          <Spin spinning={this.state.loading}>
            <div className="top_btn top_btn_upload">
              <div>
                <Button
                  onClick={this.selectImage}
                  style={{ border: 'none', color: '#fff' }}
                  type="primary"
                >
                  click
                </Button>
                <input
                  ref={(node) => (this.uploadInput = node)}
                  type="file"
                  style={{ width: '100px', border: 'none', visibility: 'hidden' }}
                  onChange={this.changeImageBeforeUpload}
                />
              </div>
              <div style={{ textAlign: 'center', margin: '10px 0' }}>
                {this.state.src ? (
                  this.state.fileType.split('/')[0] == 'image' ? (
                    <img
                      src={this.state.src}
                      alt=""
                      style={{ maxWidth: '100%', height: '300px' }}
                    />
                  ) : (
                    <Fragment>
                      <div>
                        <FileTextFilled style={{ fontSize: '64px', color: '#ccc' }} />
                      </div>
                      <div>{this.state.file.name}</div>
                    </Fragment>
                  )
                ) : (
                  <div style={{ background: '#f2f2f2', width: '100%', height: '300px' }}></div>
                )}
              </div>
            </div>
          </Spin>
        </Modal>
      </div>
    );
  }
}

export default RichEditor;

export let CommentFileList = FileList;

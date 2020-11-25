import { PageContainer } from '@ant-design/pro-layout';
import React, { Component, useState, Fragment } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Spin } from 'antd';
import RichEditor from './components/RichEditor.js';
import styles from './index.less';

const Editor1 = (props) => {
  const [value, setValue] = useState('123');
  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
};

const Editor2 = (props) => {
  return <Fragment></Fragment>;
};

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ width: '100%', background: 'white' }}>
        <Editor1 />
        <div style={{ marginTop: '20px' }}>
          <RichEditor toolbarId="test" />
        </div>
      </div>
    );
  }
}

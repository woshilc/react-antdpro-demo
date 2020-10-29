import { PageContainer } from '@ant-design/pro-layout';
import React, { Component, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Spin } from 'antd';
import styles from './index.less';

const Editor1 = (props) => {
  const [value, setValue] = useState('123');
  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
};

export default class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ width: '100%', background: 'white' }}>
        <Editor1 />
      </div>
    );
  }
}

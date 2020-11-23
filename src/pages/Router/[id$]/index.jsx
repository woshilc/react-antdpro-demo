import React, { Component } from 'react';
import { Link, router } from 'umi';
import { Beforeunload } from 'react-beforeunload';
import { Button } from 'antd';
import styles from '../index.less';

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // 拦截判断是否离开当前页面
    window.addEventListener('onunload', this.beforeunload);
  }

  componentWillUnmount() {
    // 销毁拦截判断是否离开当前页面
    window.removeEventListener('onunload', this.beforeunload);
  }

  beforeunload = (e) => {
    let confirmationMessage = '你确定离开此页面吗?';
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
  };

  handleOnClick = () => {
    window.name = '123';
  };

  render() {
    return (
      // <Beforeunload onBeforeunload={this.test}>
      <div>
        <div>
          <Link to="/router/1">id1</Link>
          <Link to="/router/2">id2</Link>
          <Link to="/router/3">id3</Link>
        </div>
        <div>{window.name}</div>
        <Button onClick={this.handleOnClick}>click</Button>
      </div>

      // </Beforeunload>
    );
  }
}

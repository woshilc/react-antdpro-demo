import React, { useState, useEffect, Component } from 'react';
import { Avatar } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

const Transition1 = (props) => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <div
        style={{ height: '100px', width: '100%', background: 'red' }}
        onClick={() => setShow(!show)}
      ></div>
      <div className={classnames(styles.test, { [styles.test2]: show })}></div>
    </div>
  );
};

export default class Transition extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Transition1 />
        <img
          src="https://www.baidu.com/img/PCdong_eab05f3d3a8e54ca5a0817f09b39d463.gif"
          width="400"
        />
        <Avatar
          src="https://www.baidu.com/img/PCdong_eab05f3d3a8e54ca5a0817f09b39d463.gif"
          size={128}
        />
      </div>
    );
  }
}

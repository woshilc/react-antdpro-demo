import React, { useState, useEffect, Component } from 'react';
import { Avatar, Select, Input } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

const { Option } = Select;

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

const Transition2 = (props) => {
  const [text, setText] = useState('123');

  const funTransitionHeight = (element, time) => {
    if (typeof window.getComputedStyle == 'undefined') {
      console.log('failed');
      return;
    }
    console.log(window.getComputedStyle);

    let height = window.getComputedStyle(element).height;
    element.style.transition = 'none';
    element.style.height = 'auto';

    let targetHeight = window.getComputedStyle(element).height;
    element.style.height = height;
    element.offsetWidth = element.offsetWidth;
    if (time) element.style.transition = 'height ' + time + 'ms';
    element.style.height = targetHeight;
  };

  return (
    <div>
      <Input
        value={text}
        onChange={(e) => {
          console.log(e.target.value);
          setText(e.target.value);
        }}
      />
    </div>
  );
};

export default class Transition extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
  };

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
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
          <Option value="jack">
            <b
              style={{
                color: 'red',
              }}
            >
              jack
            </b>
          </Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Transition2 />
      </div>
    );
  }
}

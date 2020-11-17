import React, { PureComponent } from 'react';
import styles from './index.less';

class Event1 extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //===========这种写法会导致removeEventListener无法有效卸载之前添加的事件=======
    // document.addEventListener('click',(e) => {
    //   alert(2);
    // });
    // document.body.addEventListener('click',(e) => {
    //   alert(3);
    // })
    // document.addEventListener('click',this.handleOnClick2);
    //  document.body.addEventListener('click',this.handleOnClick3);
    document.getElementById('click2').addEventListener('click', this.handleOnClick2);
    document.getElementById('click3').addEventListener('click', this.handleOnClick3);
  }

  componentWillUnmount() {
    //组件卸载时移除事件，防止事件重复绑定，多次触发
    document.getElementById('click2').removeEventListener('click', this.handleOnClick2);
    document.getElementById('click3').removeEventListener('click', this.handleOnClick3);
  }

  handleOnClick = (e) => {
    e.stopPropagation();
    // e.stopImmediatePropagation();
    e.nativeEvent.stopImmediatePropagation(); //貌似只对document.addEventListener有效
    alert(1);
  };

  handleOnClick2 = (e) => {
    alert(2);
  };

  handleOnClick3 = (e) => {
    alert(3);
  };

  render() {
    return (
      <div style={{ height: '100px', background: 'red', width: '100%' }} id="click3">
        <div style={{ height: '50px', background: 'yellow', width: '75%' }} id="click2">
          <div onClick={this.handleOnClick} style={{ background: 'white', width: '50%' }}>
            测试测试测试测试
          </div>
        </div>
        <a
          href={`https://blog.csdn.net/qq_29606781/article/details/67650869?
                  utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.not_use_machine_learn_pai
                  &depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.not_use_machine_learn_pai`}
          target="_blank"
          rel="noopener noreferrer"
        >
          js添加事件和移除事件:addEventListener()与removeEventListener()
        </a>
      </div>
    );
  }
}

class Event2 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: '0px',
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOnClick2);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOnClick2);
  }

  handleOnClick = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    const { width } = this.state;
    this.setState({
      width: width == '200px' ? '0px' : '200px',
    });
  };

  handleOnClick2 = (e) => {
    if (this.state.width == '200px') {
      alert('hidden');
      this.setState({
        width: '0px',
      });
    }
  };

  handleOnClick3 = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    alert('no hidden');
  };

  render() {
    return (
      <div style={{ height: '200px', width: '100%', background: '#ccc', display: 'flex' }}>
        <div style={{ flex: 'auto', background: '#e0ffff' }} onClick={this.handleOnClick}></div>
        <div
          style={{ flex: 'none', background: '#b0c4de', width: this.state.width }}
          onClick={this.handleOnClick3}
        ></div>
      </div>
    );
  }
}

function Wrapper(props) {
  return (
    <div
      style={{ width: '100%', background: 'white', margin: '0px 0px 10px 0px', padding: '12px' }}
    >
      {props.children}
    </div>
  );
}

export default class Event extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <a
          href="https://juejin.im/post/6844903892019331086"
          target="_blank"
          rel="noopener noreferrer"
        >
          在React中实现点击空白区域关闭指定元素的实现
        </a>
        <Wrapper>
          <Event1 />
        </Wrapper>
        <Wrapper>
          <Event2 />
        </Wrapper>
      </div>
    );
  }
}

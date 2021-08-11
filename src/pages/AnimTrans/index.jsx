import React, { Component, PureComponent, Fragment } from 'react';
import { Button } from 'antd';

export default class AnimTrans extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleChangeLocation);
  }

  componentWillUnmount() {
    removeEventListener('click', this.handleChangeLocation);
  }

  handleChangeLocation = (e) => {
    console.time('modal');
    const x = e.clientX;
    const y = e.clientY;
    console.log(x, y);
    const body = document.body;
    const width = body.clientWidth;
    const height = body.clientHeight;
    console.log(width, height);
    const node = document.getElementById('test2');
    node.style.top = y + 'px';
    node.style.left = x + 'px';

    console.log(document.styleSheets);
    let animationContent = `@keyframes move{
            0% { top: ${y}px; left: ${x}px; width: 0px; height: 0px; opacity: 0; }
            100% { top: 100px; left: ${
              width - 100 - 500
            }px; width: 500px; height: 500px; opacity: 1; }
        }`;
    document.styleSheets[0].insertRule(animationContent);
    console.log(document.styleSheets);
    node.style.animation = 'move 0.3s linear forwards';
    setTimeout(() => {
      node.style.animation = '';
      node.style.left = '';
      document.styleSheets[0].deleteRule('move');
      node.style.position = 'fixed';
      node.style.top = '100px';
      node.style.right = '100px';
      node.style.width = '500px';
      node.style.height = '500px';
      console.log(document.styleSheets);
      console.timeEnd('modal');
    }, 300);
  };

  handleOnClick = () => {
    const dom1 = document.getElementById('test1');
    const clientHeight = dom1.clientHeight;
    const clientWidth = dom1.clientWidth;
    dom1.style.height = clientHeight + 100 + 'px';
    dom1.style.width = clientWidth + 100 + 'px';
    // dom1.style.transition = 'width 0.5s, height 0.5s';
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleOnClick}>onClick</Button>
        <div
          style={{
            height: '100px',
            width: '200px',
            maxHeight: '500px',
            background: '#ccc',
            overflow: 'hidden',
            transition: 'width 0.5s, height 0.5s',
          }}
          id="test1"
        ></div>

        <div
          style={{
            height: '100px',
            width: '100px',
            background: '#aaa',
            position: 'fixed',
            top: '100px',
            right: '100px',
          }}
          id="test2"
        ></div>
      </div>
    );
  }
}

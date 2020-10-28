import React, { Component, Fragment } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
export default class ClassNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inlineThrough: true,
      underline: true,
      adsVisible: true,
    };
  }

  fontStyleChange = () => {
    const { inlineThrough, underline } = this.state;
    this.setState({
      inlineThrough: !inlineThrough,
      underline: !underline,
    });
  };

  adsVisibleChange = () => {
    const { adsVisible } = this.state;
    this.setState({
      adsVisible: !adsVisible,
    });
  };

  render() {
    return (
      <Fragment>
        <div style={{ width: '100%', background: '#2C3E50', color: 'aliceblue' }}>
          <div className={classnames(styles['font-size'], styles['font-color'])}>
            ant中使用classnames不能直接用字符串，会导致样式无法引入
          </div>
          <div className={styles['font-color']}>
            <span
              className={classnames(styles['font-size'], {
                [styles['line-through']]: this.state.inlineThrough,
              })}
            >
              classnames('foo', 'bar')
            </span>
            <span
              className={classnames(styles['font-size'], {
                [styles['underline']]: this.state.underline,
              })}
            >
              classNames(styles['foo'], styles['bar'])
            </span>
            <Button type="primary" onClick={this.fontStyleChange}>
              移除样式
            </Button>
          </div>
        </div>

        <div
          style={{
            width: '100%',
            marginTop: '24px',
            border: '3px solid black',
            overflow: 'hidden',
          }}
          className={styles['font-size']}
        >
          <div className={styles['header']}>
            Media 响应式布局,overflow:hidden可解决float样式引起的父元素高度塌陷
            <p>或者给父元素增加一个子元素，设置clear:both;可通过::after伪类选择器优化</p>
          </div>
          <div className={styles['content']}>
            <div className={classnames(styles['box'], styles['left'])}></div>
            <div className={classnames(styles['box'], styles['content-main'])}></div>
            <div className={classnames(styles['box'], styles['right'])}></div>
          </div>
          <div className={classnames(styles['footer'], styles['box'])}>12345</div>
        </div>

        <div style={{ width: '100%', marginTop: '24px', border: '3px solid black' }}>
          <div className={classnames(styles['box'], styles['left'])}></div>
          <div className={classnames(styles['box'], styles['content-main'])}></div>
          <div className={classnames(styles['box'], styles['right'])}></div>
          <div style={{ clear: 'both' }}>
            <a
              href="https://www.cnblogs.com/jmsh/p/12349518.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              float浮动造成高度塌陷的解决办法
            </a>
          </div>
        </div>

        <div className={styles['test2-wrapper']}>
          <div style={{ width: '30%', display: 'inline-block' }}>
            <div className={classnames(styles['test2'], styles['test2-left'])}></div>
          </div>
          <div style={{ width: '40%', display: 'inline-block' }}>
            <div className={classnames(styles['test2'], styles['test2-main'])}>
              <div style={{ position: 'absolute', top: '0', left: '0' }}>宽高相同</div>
            </div>
          </div>
          <div style={{ width: '30%', display: 'inline-block' }}>
            <div className={classnames(styles['test2'], styles['test2-right'])}></div>
          </div>
        </div>

        <div className={styles['flex-wrap']}>
          <div className={styles['flex-header']}>header</div>
          <div className={styles['flex-body']}>
            <div className={styles['flex-nav']}>nav</div>
            <div className={styles['flex-content']}>
              content
              <Button type="primary" onClick={this.adsVisibleChange}>
                click
              </Button>
              <p>
                <a
                  href="http://www.ruanyifeng.com/blog/2015/07/flex-examples.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Flex 布局教程：实例篇
                </a>
              </p>
              <p>
                <a
                  href="https://www.cnblogs.com/LangZ-/p/12703858.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  flex属性-flex:1到底是什么
                </a>
              </p>
            </div>
            {this.state.adsVisible && <div className={styles['flex-ads']}>ads</div>}
          </div>
          <div className={styles['flex-footer']}>footer</div>
        </div>
      </Fragment>
    );
  }
}

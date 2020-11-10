import React, { useState, useEffect, Component } from 'react';
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
      </div>
    );
  }
}

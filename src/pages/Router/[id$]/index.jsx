import React, { Component } from 'react';
import { Link } from 'umi';
import styles from '../index.less';

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.match.params);
  }

  render() {
    return (
      <div>
        <Link to="/router/1">id1</Link>
        <Link to="/router/2">id2</Link>
        <Link to="/router/3">id3</Link>
      </div>
    );
  }
}

import { PageContainer } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import styles from './index.less';

class JiShiQi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timeId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeId);
  }

  tick = () => {
    this.setState({
      date: new Date(),
    });
  };

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default () => {
  return (
    <div>
      <JiShiQi />
      <JiShiQi />
      <JiShiQi />
    </div>
  );
};

// export default () => {
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000);
//   }, []);
//   return (
//     <PageContainer content="这是一个新页面，从这里进行开发！" className={styles.main}>
//       <div
//         style={{
//           paddingTop: 100,
//           textAlign: 'center',
//         }}
//       >
//         <Spin spinning={loading} size="large" />
//       </div>
//     </PageContainer>
//   );
// };

import React, { PureComponent, Fragment } from 'react';
import { Tabs, Typography, Input, Button } from 'antd';
import Big from 'big.js';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './index.less';

const { TabPane } = Tabs;
const { Title, Paragraph, Text, Link } = Typography;

function Note1_1(props) {
  return (
    <Fragment>
      <Title level={1}>Sequelize</Title>
      <Title level={3}>Associations - 关联</Title>
      <Paragraph>
        关联类型分为三类，一对一（belongsTo，hasOne），一对多（belongsTo，hasMany），多对多（belongsToMany），
        其中互相关联的模型又分为sourceModel（源模型），targetModel（目标模型），source与target没有严格的定义，
        在当前模型中设置关联关系时则当前模型为sourceModel，引入的模型为targetModel。belongs指foreignKey在源模型中，has指foreignKey在目标模型中。
      </Paragraph>
    </Fragment>
  );
}

class Note1_2 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  calculate = () => {
    const a = 0.1 + 0.2;
    const b = Big(0.1).plus(0.2).toString();
    console.log(a, b);
    const c = Big(b).plus(1).toString();
    console.log(c);
    let d = Big(1.23455778);
    console.log(d.toFixed(3));
    let e = 1.23455778;
    console.log(e.toFixed(3));
  };

  render() {
    return (
      <Fragment>
        <Button onClick={this.calculate}>calculate</Button>
      </Fragment>
    );
  }
}

function Note1(props) {
  return (
    <Tabs defaultActiveKey="1" tabPosition="left">
      <TabPane tab="sequelize" key="1">
        <Note1_1 />
      </TabPane>
      <TabPane tab="big.js" key="2">
        <Note1_2 />
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
}

export default class Note extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ background: 'white', padding: '12px' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="eggjs" key="1">
            <Note1 />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

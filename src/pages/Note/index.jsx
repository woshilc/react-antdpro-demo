import React, { PureComponent, Fragment } from 'react';
import { Tabs, Typography } from 'antd';
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

function Note1(props) {
  return (
    <Tabs defaultActiveKey="1" tabPosition="left">
      <TabPane tab="sequelize" key="1">
        <Note1_1 />
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
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

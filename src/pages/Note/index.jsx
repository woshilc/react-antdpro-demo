import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './index.less';

const { TabPane } = Tabs;

function Note1(props) {
  return (
    <Tabs defaultActiveKey="1" tabPosition="left">
      <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
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
          <TabPane tab="Tab 1" key="1">
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

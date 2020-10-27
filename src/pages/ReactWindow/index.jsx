import React, { Component, PureComponent, Fragment, memo } from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Button, Switch } from 'antd';
import { areEqual, FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer'; //列表自适应
import memoize from 'memoize-one'; //记忆，防止重复渲染
import styles from './index.less';

class ItemRender extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: '123',
    };
  }

  componentDidMount() {
    console.log(this.props.record);
  }

  handleOnChange = (value) => {
    this.setState({
      show: value,
    });
  };

  handleOnClick = () => {
    this.props.open(this.props.record.id);
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    // console.log(this.props.record);
    // const {items} = this.props;
    return (
      <div
        style={this.state.show ? { padding: '0 24px', background: 'red' } : { padding: '0 24px' }}
        onClick={this.handleOnClick}
      >
        <Row>
          <Col span={6}>{this.props.record.id}</Col>
          <Col span={6}>{this.props.record.name}</Col>
          <Col span={6}>{this.props.record.description}</Col>
          <Col span={4}>
            <Switch onChange={this.handleOnChange} />
          </Col>
          <Col span={2}>
            <Input value={this.state.value} onChange={this.handleInputChange} />
          </Col>
        </Row>
      </div>
    );
  }
}

const Item = memo(({ data, index, style }) => {
  const { items, open } = data;
  const item = items[index];

  return (
    <div style={style}>
      <ItemRender record={item} open={open} />
    </div>
  );
}, areEqual);

const createItemData = memoize((items, open) => ({
  items,
  open,
}));

class ReactWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      listSpan: 24,
      detailSpan: 0,
      showDetail: false,
    };
  }

  deleteHandler = (id) => {
    console.warn(`TODO: ${id}`);
  };

  handleOnClick = (value) => {
    alert(value);
  };
  handleOnBlur = () => {
    alert(3);
  };

  //滚动加载
  onScroll = ({ scrollDirection, scrollOffset, scrollUpdateWasRequested }) => {
    if (
      this.props.page < 5 &&
      this.outerRef.scrollHeight - scrollOffset - this.outerRef.clientHeight <= 10
    ) {
      const { dispatch } = this.props;
      dispatch({
        type: 'window/fetch',
        payload: {
          page: this.props.page + 1,
        },
      });
    }
  };

  handleOnChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  //滚动到对应行
  scrollToItem = () => {
    const index = this.getIndex();
    this.listRef.scrollToItem(index);
  };

  getIndex = () => {
    const { inputValue } = this.state;
    const { list } = this.props;
    const index = list.findIndex((item) => item.id == inputValue);
    alert(index);
    return index;
  };

  //测试打开详情对列表页影响
  open = (id) => {
    console.log(id);
    this.setState({
      listSpan: 12,
      detailSpan: 12,
      showDetail: true,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'window/check',
      payload: {
        id: id,
      },
    });
  };

  render() {
    const itemData = createItemData(this.props.list, this.open);

    return (
      <Row>
        <Col
          span={this.state.listSpan}
          style={{ background: 'white', margin: 'auto', height: '700px' }}
          className={styles['test']}
        >
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                height={height}
                width={width}
                itemCount={this.props.list.length}
                itemSize={65}
                onScroll={this.onScroll}
                className="wrap"
                outerRef={(node) => (this.outerRef = node)}
                ref={(node) => (this.listRef = node)}
                itemData={itemData}
                // style={styles['window']}
              >
                {/* {({ index, style }) => (
                  <div style={style}>
                    <ItemRender record={this.props.list[index]} handleOnClick={this.handleOnClick} open={this.open}/>
                  </div>
                )} */}
                {Item}
              </FixedSizeList>
            )}
          </AutoSizer>
        </Col>
        <Col span={this.state.detailSpan}>
          {this.state.showDetail && (
            <div>
              <div>{this.props.record.id}</div>
              <div>{this.props.record.name}</div>
              <div>{this.props.record.description}</div>
            </div>
          )}
        </Col>
        <Col span={24}>
          <Input value={this.state.inputValue} onChange={this.handleOnChange} />
          <Button type="primary" onClick={this.scrollToItem}>
            click
          </Button>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  const { list, page, record } = state.window;
  return {
    list,
    page,
    record,
  };
}

export default connect(mapStateToProps)(ReactWindow);

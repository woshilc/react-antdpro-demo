import React, { PureComponent } from 'react';
import ImageMagnifier from './imageMagnifier';
import styles from './index.less';
import { Input, Button } from 'antd';

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl:
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=266396678,3085643236&fm=26&gp=0.jpg',
      containerl: 100,
      containerw: 200,
      containerh: 300,
      boxl: 10,
      boxw: 20,
      boxh: 30,
    };
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCalculate = () => {
    console.time('time');
    const { containerl, containerw, containerh, boxl, boxw, boxh } = this.state;
    let containerArr = [containerl, containerw, containerh];
    let boxArr = [boxl, boxw, boxh];
    let combinations = this.getCombinations(containerArr, boxArr);
    let result = [];
    for (let i = 0; i < combinations.length; i++) {
      console.log(i);
      let combination = combinations[i];
      console.log(combination);
      let count = 1;
      for (let j = 0; j < combination.length; j += 2) {
        if (combination[j] > combination[j + 1]) {
          count = count * Math.floor(combination[j] / combination[j + 1]);
          console.log(count);
        } else {
          break;
        }
      }
      result.push(count);
      count = 1;
    }
    console.log(result);
    console.timeEnd('time');
  };

  getCombinations = (containerArr, boxArr) => {
    let combinations = [];
    for (let i = 0; i < boxArr.length; i++) {
      let combination = [containerArr[0], boxArr[i]];
      let boxwhArr = [...boxArr];
      boxwhArr.splice(i, 1);
      for (let j = 0; j < boxwhArr.length; j++) {
        let combinationCopy = [...combination];
        combinationCopy.push(containerArr[1]);
        combinationCopy.push(boxwhArr[j]);
        let boxhArr = [...boxwhArr];
        boxhArr.splice(j, 1);
        combinationCopy.push(containerArr[2]);
        combinationCopy.push(boxhArr[0]);
        combinations.push(combinationCopy);
      }
    }
    return combinations;
  };

  render() {
    const { imgUrl } = this.state;
    return (
      <div>
        <div className={styles.container}>
          <div className={`${styles.item} ${styles['item-1']}`}>1</div>
          <div className={`${styles.item} ${styles['item-2']}`}>2</div>
          <div className={`${styles.item} ${styles['item-3']}`}>3</div>
          <div className={`${styles.item} ${styles['item-4']}`}>4</div>
          {/* <div className={`${styles.item} ${styles['item-5']}`}>5</div>
          <div className={`${styles.item} ${styles['item-6']}`}>6</div>
          <div className={`${styles.item} ${styles['item-7']}`}>7</div>
          <div className={`${styles.item} ${styles['item-8']}`}>8</div>
          <div className={`${styles.item} ${styles['item-9']}`}>9</div> */}
        </div>
        {/* <div style={{position:'relative'}}>
          <ImageMagnifier minImg={imgUrl} maxImg={imgUrl}/>
        </div> */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '250px 250px 250px',
            gridTemplateRows: '70px 70px',
          }}
        >
          <div>
            L:
            <Input name="containerl" onChange={this.handleOnChange} value={this.state.containerl} />
          </div>
          <div>
            W:
            <Input name="containerw" onChange={this.handleOnChange} value={this.state.containerw} />
          </div>
          <div>
            H:
            <Input name="containerh" onChange={this.handleOnChange} value={this.state.containerh} />
          </div>
          <div>
            L:
            <Input name="boxl" onChange={this.handleOnChange} value={this.state.boxl} />
          </div>
          <div>
            W:
            <Input name="boxw" onChange={this.handleOnChange} value={this.state.boxw} />
          </div>
          <div>
            H:
            <Input name="boxh" onChange={this.handleOnChange} value={this.state.boxh} />
          </div>
        </div>
        <Button onClick={this.handleCalculate}>calculate</Button>
      </div>
    );
  }
}

export default Grid;

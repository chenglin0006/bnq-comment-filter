import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Filter from '../../src/index'
import {Form} from "antd/lib/index";

const WrappedAdvancedFilter = Form.create()(Filter);
class App extends Component {
    constructor(props) {
        super(props);
        this._handleReset=this._handleReset.bind(this);
        this._handleSearch=this._handleSearch.bind(this);
        this._handleBack=this._handleBack.bind(this);
    }
    _handleSearch(){

    }
    _handleReset(){

    }
    _handleBack(){

    }
  render() {
      var filterData = [{
          id: 'activityCode',
          name: '活动编码',
          inputChangeName:'titleChangeFun'
  },{
          id: 'searchParam',
          name: '查询条件',
      }]
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <div className={'example-div'}>
              <WrappedAdvancedFilter
                  filterData={filterData}
                  handleSearch={this._handleSearch}
                  handleReset={this._handleReset}
                  handleBack={this._handleBack}
                  filterBtnInline={true}
              />
          </div>
      </div>
    );
  }
}

export default App;

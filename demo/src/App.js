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
      const treeData = [{
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [{
              title: 'Child Node1',
              value: '0-0-1',
              key: '0-0-1',
          }, {
              title: 'Child Node2',
              value: '0-0-2',
              key: '0-0-2',
          }],
      }, {
          title: 'Node2',
          value: '0-1',
          key: '0-1',
      }];
      var filterData = [{
          id: 'activityCode',
          name: '活动编码',
          inputChangeName:'titleChangeFun'
  },{
          id: 'searchParam',
          name: '查询条件',
      },{
          id:'treeSelect',
          type:'treeSelect',
          treeData:treeData,
          showSearch:false,
          allowClear:true,
          name:'树形选择器',
          placeholder:'请选择',
          multiple:true
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

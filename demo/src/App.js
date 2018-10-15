import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Filter from '../../src/index'
import {Form} from "antd/lib/index";
import moment from "moment";

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
    id: 'activityType',
    name: '活动类型',
    type: 'select',
    data:[{id:'1',name:'类型1'},{id:'2',name:'类型2'}],
    isHidePleaseSelect:false
},{
    id: 'searchParam',
    name: '查询条件',
},{
    id: 'startEndTime-1',
    name: '创建时间',
    type:'rangePicker',
    showTime:true,
    placeholder:['创建开始时间','创建结束时间']
},{
    id: 'startEndTime-2',
    name: '活动时间',
    type:'rangePicker',
    showTime:true,
    placeholder:['活动开始时间','活动结束时间']
},{
    id:'treeSelect',
    type:'treeSelect',
    treeData:treeData,
    showSearch:false,
    allowClear:true,
    name:'树形选择器',
    placeholder:'请选择',
    multiple:true
},{
    type: 'cascader',
    linkage: [
        {
            id: 'provinceId',
            name: '省',
            type: 'select',
            enumName: 'provinces',
            actionName: 'GET_CITY',
            url: '/district/citys',
            //isAddress: 'true', //决定域名来源
            relativeFields: ['cityId', 'shopId'],
            fetchFields: ['provinceId'],
            data:[{id:'1',name:'北京'},{id:'2',name:'上海'}]
        },
        {
            id: 'cityId',
            name: '市',
            type: 'select',
            enumName: 'cityList',
            actionName: 'GET_SHOP',
            url: '/shop/queryByArea',
            relativeFields: ['shopId'],
            fetchFields: ['provinceId', 'cityId']
        },
        {
            id: 'shopId',
            name: '门店',
            type: 'select',
            enumName: 'note'
        }
    ]
}]
const WrappedAdvancedFilter = Form.create()(Filter);
class App extends Component {
    constructor(props) {
        super(props);
        this._handleReset=this._handleReset.bind(this);
        this._handleSearch=this._handleSearch.bind(this);
        this._handleBack=this._handleBack.bind(this);
        this._handleCascaderChange=this._handleCascaderChange.bind(this);
    }
    _handleSearch(items){
        console.log(items);
        let params = {}
        for (let i in items) {
            if ((items[i] && items[i] !== 'undefined') || items[i] === 0) {
                //将起始时间区分开
                if (i.indexOf('startEndTime')>-1) {
                    let index = i.split('-')[1]||0;
                    let dateFormat = 'YYYY-MM-DD HH:mm:ss';
                    let startTime = moment(items[i][0]).format(dateFormat);
                    let endTime = moment(items[i][1]).format(dateFormat);
                    let startTimeStr =index==0?'startTime': 'startTime'+index;
                    let endTimeStr = index==0?'endTime':'endTime'+index;
                    params[startTimeStr] = startTime;
                    params[endTimeStr] = endTime;
                } else {
                    params[i] = items[i];
                }
            }
        };
    }
    _handleReset(){

    }
    _handleBack(){

    }
    _handleCascaderChange(fieldsValue, option){
        console.log(fieldsValue,option);
        if(fieldsValue.provinceId&&!fieldsValue.cityId){
            filterData.forEach((ele)=>{
                if(ele.type==='cascader'){
                    ele.linkage.forEach((item)=>{
                        if(item.id==='cityId'){
                            if(fieldsValue.provinceId+''===1+''){
                                item.data=[{id:'1',name:'北京市区'},{id:'2',name:'北京辖区'}]
                            } else if(fieldsValue.provinceId+''==2+''){
                                item.data=[{id:'3',name:'上海市区'},{id:'4',name:'上海辖区'}]
                            }
                        }
                    })
                }
            })
        } else if(fieldsValue.cityId){
            filterData.forEach((ele)=>{
                if(ele.type==='cascader'){
                    ele.linkage.forEach((item)=>{
                        if(item.id==='shopId'){
                            if(fieldsValue.cityId+''===1+''){
                                item.data=[{id:'1',name:'北京shop1'},{id:'2',name:'北京shop2'}]
                            } else if(fieldsValue.cityId+''===2+''){
                                item.data=[{id:'3',name:'北京shop3'},{id:'4',name:'北京shop4'}]
                            } else if(fieldsValue.cityId+''===3+''){
                                item.data=[{id:'5',name:'上海shop1'},{id:'6',name:'上海shop2'}]
                            } else if(fieldsValue.cityId+''===4+''){
                                item.data=[{id:'7',name:'上海shop3'},{id:'6',name:'上海shop4'}]
                            }
                        }
                    })
                }
            })
        }
        this.setState({});
    }
  render() {
    console.log(filterData,'===');
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
                  handleChange={this._handleCascaderChange}
              />
          </div>
      </div>
    );
  }
}

export default App;

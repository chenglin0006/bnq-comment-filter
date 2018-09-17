import {shallow} from 'enzyme';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filter from '../src/index'
import renderer from "react-test-renderer";
Enzyme.configure({ adapter: new Adapter() });

import {Form} from "antd/lib/index";
const WrappedAdvancedFilter = Form.create()(Filter);

test('filter', () => {
    const props = {
        // Jest 提供的mock 函数
        filterData:[{
            id: 'activityCode',
            name: '活动编码',
            inputChangeName:'titleChangeFun'
        },{
            id: 'searchParam',
            name: '查询条件',
        }],
        handleReset: jest.fn( (e) => {
            console.log('reset','=============')
        }),
        handleSearch:jest.fn( (e) => {
            console.log('search','=============')
        }),
        handleBack:jest.fn( (e) => {
            console.log('back','=============')
        }),
    }
    const filterWrapperTest = shallow(<div className={'test'} onClick={()=>{
        console.log('test');
    }}><WrappedAdvancedFilter {...props} ></WrappedAdvancedFilter></div>);
    filterWrapperTest.find('div.test').simulate('click');
    filterWrapperTest.find('button.reset').simulate('click');
});

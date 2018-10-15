import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Row, Col, Input, Button, Icon, Select, DatePicker,Divider,TreeSelect} from 'antd';
// import CascaderShop from '../cascaderShop/index';
import Cascader from './components/cascader'
import './index.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import locale from 'antd/lib/date-picker/locale/zh_CN';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this._handleSearch = this._handleSearch.bind(this);
        this._handleReset = this._handleReset.bind(this);
        this._handleBack = this._handleBack.bind(this);
        this._getFields = this._getFields.bind(this);
        this._getFormItem = this._getFormItem.bind(this);
        this.state = {
            expand: false,
        };

    }

    toggle() {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    _handleSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.props.handleSearch(values);
        });
    }

    _handleReset() {
        this.props.form.resetFields();
        this.props.handleReset();
    }

    _handleBack(){
        this.props.handleBack();
    }

    _getFormItem(option) {
        switch (option.type) {
            case 'select':
                return (
                    <Select placeholder={option.placeholder} showSearch={option.showSearch} filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        {option.isHidePleaseSelect ? null : <Option key="undefined" value="undefined">全部</Option>}
                        {option.data && option.data.map((item, key) => <Option key={key} value={item.id}>{item.name}</Option>)}
                    </Select>
                );
                break;
            case 'rangePicker':
                let dateFormat = 'YYYY-MM-DD';
                if(option.showTime){
                    dateFormat = 'YYYY-MM-DD HH:mm:ss';
                }
                return <RangePicker placeholder={option.placeholder||['开始时间', '结束时间']} locale={locale} allowClear={false} showTime={option.showTime?true:false} format={dateFormat} allowClear/>;
                break;
            case 'treeSelect':
                const {showSearch=false,allowClear=true,treeData,placeholder,multiple=false}=option
                let props = {
                    showSearch:showSearch,
                    allowClear:allowClear,
                    treeData:treeData,
                    placeholder:placeholder,
                    multiple:multiple
                }
                return <TreeSelect {...props}></TreeSelect>
                break;
            default:
                return <Input placeholder={option.placeholder}/>;
        }
    }

    _getFields() {
        const {filterData} = this.props;
        let count = this.state.expand ? filterData.length : this.props.collapseNum;
        if(!this.props.collapseNum){
            count=filterData&&filterData.length || 0;
        }
        const {getFieldDecorator} = this.props.form;
        const that = this;
        return filterData.map((option, i) => {
            if (option.type === 'cascader') {
                return (
                    <Cascader
                        key={i}
                        form={that.props.form}
                        data={option.linkage}
                        handleChange={this.props.handleChange}
                    />
                )
            } else {
                let decoratorRules = {
                    initialValue: option.initialValue
                }
                return (
                    <div key={i}>
                        <FormItem label={option.name} className={option.isHide?'hide':''} style={{ display: i < count ? 'block' : 'none' }}>
                            {getFieldDecorator(`${option.id}`,decoratorRules)(
                                that._getFormItem(option)
                            )}
                        </FormItem>
                    </div>
                );
            }
        });
    }

    render() {
        return (
            <div>
                <Form
                    layout="inline"
                    className="filter-form"
                    onSubmit={this._handleSearch}
                >
                    {this._getFields()}
                    <div className={"btnContainer filter-action-div"+(this.props.filterBtnInline?' inline':'')}>
                        <Button type="primary" className="search" htmlType="submit">搜索</Button>
                        <Button className="reset" onClick={this._handleReset}>重置</Button>
                        <Button className={this.props.hideBackBtn?'hide back':'back'} onClick={this._handleBack}>返回</Button>
                        {!this.props.collapseNum?'':<a style={{ marginLeft: 8, fontSize: 16 }} onClick={this.toggle}>
                            {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'}/>
                        </a>}
                    </div>
                    <Divider></Divider>
                </Form>
            </div>
        );
    }
}

Filter.propTypes = {
    filterData: PropTypes.arrayOf(PropTypes.object),//查询条件
    handleSearch: PropTypes.func,//搜索方法
    handleReset: PropTypes.func,//重置方法
    handleBack:PropTypes.func,//返回方法
    collapseNum: PropTypes.number,//查询条件折叠的数量
    filterBtnInline:PropTypes.bool,//按钮是否换行展示
    hideBackBtn:PropTypes.bool //是否包含返回按钮
}

## Install
npm i

##example
import Filter from 'bnq-common-filter'
const WrappedAdvancedFilter = Form.create()(Filter);

<WrappedAdvancedFilter
                  filterData={filterData}    //筛选项
                  handleSearch={this._handleSearch}  //搜索事件
                  handleReset={this._handleReset}    //重置事件
                  handleBacl={this._handleBack}    //返回事件（如果有返回按钮的话需要配置对应的事件）
                  filterBtnInline={true}             //行动点是否紧跟着筛选项不换行，默认false
                      hideBackBtn={true}                //是否隐藏返回按钮，默认false
   />
      支持筛选的元素类型:input/select/rangePicker/treeSelect/cascader
      例子：var filterData = [
                {
                    id: 'searchParam',
                    name: '查询条件',
                },{
                     id: 'startEndTime',
                     name: '起止时间',
                     type:'rangePicker',
                     showTime:true,
                     placeholder:['创建开始时间','创建结束时间']
                 },
                    {
                        id: 'activityType',
  name: '活动类型',
   type: 'select',
  data:[{id:'1',name:'类型1'},{id:'2',name:'类型2'}],
  isHidePleaseSelect:false,
  initialValue:'2',
                    },
                {
                     id:'treeSelect',
                     type:'treeSelect',
                     treeData:treeData,
                     showSearch:false,
                     allowClear:true,
                     name:'树形选择器',
                     placeholder:'请选择',
                     multiple:true
                },
                {
                    type: 'cascader',   //多级联动
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
                }
              ]
##test
npm run test

##demo
cd demo
npm start

##build
npm run bulid

##publish
npm publish





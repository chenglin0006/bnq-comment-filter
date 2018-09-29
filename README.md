## Install

```
npm i
```
##example
import Filter from 'bnq-common-filter'
const WrappedAdvancedFilter = Form.create()(Filter);

<WrappedAdvancedFilter
                  filterData={filterData}
                  handleSearch={this._handleSearch}
                  handleReset={this._handleReset}
                  filterBtnInline={true}
              />
      filterData:input/select/datepicker/treeSelect/cascader

              var filterData = [
                {
                    id: 'activityCode',
                    name: '活动编码',
                    inputChangeName:'titleChangeFun'
                },
                {
                    id: 'searchParam',
                    name: '查询条件',
                },
                {
                    id: 'selectId',
                     name: 'test',
                     type:select,
                     data:[{name:'',id:''}]
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


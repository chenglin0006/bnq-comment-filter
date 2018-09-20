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
      filterData:input/select/datepicker
              var filterData = [{
                        id: 'activityCode',
                        name: '活动编码',
                        inputChangeName:'titleChangeFun'
                },{
                        id: 'searchParam',
                        name: '查询条件',
                    },{
                    id: 'selectId',
                     name: 'test',
                     type:select,
                     data:[{name:'',id:''}]
                    }]


##test
npm run test


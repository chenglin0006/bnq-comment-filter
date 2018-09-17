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


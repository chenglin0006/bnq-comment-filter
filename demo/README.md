#start steps
    npm install
    npm start

#test components


#props

Filter.propTypes = {
    filterData: PropTypes.arrayOf(PropTypes.object),//查询条件,数据结构参考demo
    handleSearch: PropTypes.func,//搜索方法
    handleReset: PropTypes.func,//重置方法
    handleBack:PropTypes.func,//返回方法
    collapseNum: PropTypes.number,//查询条件折叠的数量
    filterBtnInline:PropTypes.bool,//按钮是否换行展示
    hideBackBtn:PropTypes.bool //是否包含返回按钮
}

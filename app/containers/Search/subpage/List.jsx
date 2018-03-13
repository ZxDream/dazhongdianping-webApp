import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'

import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import { getSearchData } from '../../../fetch/search/search'


const initialState = {
	data: [],
	hasMore: false,
	isLoadingMore: false,
	page: 0
}

class SearchList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    	this.state = initialState
    }
    render() {
        return (
            <div>
            	{
            		this.state.data.length
	            	? <ListComponent data={this.state.data}/>
	            	: <div>正在加载...</div>
            	}
                {
                    this.state.hasMore
                    ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                    : ''
                }
            </div>
        )
    }

    componentDidMount() {
    	this.loadFirstPageData()
    }

    loadFirstPageData() {
    	const cityName = this.props.userinfo.cityName
    	const keyword = this.props.keyword || ''
    	const category = this.props.category
    	const result = getSearchData(0, cityName, category, keyword)
    	this.resultHandle(result)
    }

    loadMoreData() {
        this.setState({
            isLoadingMore: true
        })
        const cityName = this.props.userinfo.cityName
        const keyword = this.props.keyword || ''
        const category = this.props.category
        const result = getSearchData(0, cityName, category, keyword)
        this.resultHandle(result)

        this.setState({
            isLoadingMore: false
        })
    }

    resultHandle(result) {
        const page = this.state.page
        this.setState({
            page: page + 1
        })
    	result.then(res => {
    		return res.json()
    	}).then(json => {
    		const hasMore = json.hasMore
            const data = json.data
            this.setState({
                hasMore: hasMore,
                data: this.state.data.concat(data)
            })
    	})
    }

    componentDidUpdate(preProps, preState) {
        const keyword = this.props.keyword
        const category = this.props.category
        if(keyword === preProps.keyword && category === preProps.category) {
            return
        }
        this.setState(initialState)
        this.loadFirstPageData()
    }
}

function mapStateToProps(state) {
	return {
		userinfo: state.userinfo
	}
}

export default connect(
	mapStateToProps
)(SearchList)
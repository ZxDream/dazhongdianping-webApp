import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import CommentList from '../../../components/CommentList'
import { getCommentData } from '../../../fetch/detail/detail.js'
import LoadMore from '../../../components/LoadMore'


import './style.less'

class Comment extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        	data: [],
        	hasMore: false,
        	isLoadingMore: false,
        	page: 0
        }
    }
    render() {
        return (
            <div id="detail-subpage-comment">
            	<h2>用户点评</h2>
            	{
            		this.state.data.length
            		? <CommentList data={this.state.data}/>
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
    	const id = this.props.id
    	const result = getCommentData(0, id)
    	this.resultHandle(result)
    }

    loadMoreData() {
        this.setState({
            isLoadingMore: true
        })
        const id = this.props.id
        const page = this.state.page
        const result = getCommentData(page, id)
        this.resultHandle(result)
        this.setState({
            isLoadingMore: false
        })
    }

    resultHandle(result) {
    	result.then(res => {
    		return res.json()
    	}).then(json => {
    		const page = this.state.page
    		const hasMore = json.hasMore
    		const data = json.data
    		this.setState({
    			page: page + 1,
    			hasMore: hasMore,
    			data: this.state.data.concat(data)
    		})
    	})
    }
}

export default Comment
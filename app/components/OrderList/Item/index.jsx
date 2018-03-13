import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Item extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            commentState: 0
        }
    }
    render() {
    	const data =this.props.data
        const commentState = this.state.commentState
        const submitComment = this.props.submitComment
        return (
            <div id="orderlist-item" className="clear-fix">
            	<div className="float-left item-img">
            		<img src={require('../../../static/img/' + data.img)}/>
            	</div>
            	<div className="item-info float-left">
            		<p className="info-btm">商户: {data.title}</p>
            		<p className="info-btm">数量: {data.count}</p>
            		<p>价格:￥{data.price}</p>
            	</div>
            	<div className="float-right item-commentBtn">
            		{
                        commentState === 0
                        ? <button className="unCommentBtn" onClick={this.showComment.bind(this)}>评价</button>
                        : commentState === 1
                            ? ''
                            :<button className="didCommentBtn">已评价</button>
                    }
            	</div>
                {
                    commentState === 1
                    ? <div className="item-container-comment">
                        <div className="item-textareaWrapper">
                            <textarea ref="commentText"></textarea>
                        </div>
                        <div className="item-btnGroup">
                            <button className="btnGroup-submit" onClick={this.submitClickHandle.bind(this)}>提交</button>
                            <button className="btnGroup-cancel" onClick={this.hideComment.bind(this)}>取消</button>
                        </div>
                    </div>
                    : ''
                }
            </div>
        )
    }

    componentDidMount() {
        const commentState = this.props.data.commentState
        this.setState({
            commentState: commentState
        })
    }

    showComment() {
        this.setState({
            commentState: 1
        })
    }

    hideComment() {
        this.setState({
            commentState: 0
        })
    }

    submitClickHandle() {
        const submitComment = this.props.submitComment
        const id = this.props.data.id
        const commentTextDOM = this.refs.commentText
        const value = commentTextDOM.value.trim()
        if(!value) {
            return
        }
        submitComment(id, value, this.commentOK.bind(this))


    }

    commentOK() {
        this.setState({
            commentState: 2
        })
    }
}

export default Item
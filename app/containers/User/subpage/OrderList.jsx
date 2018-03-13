import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getOrderListData } from '../../../fetch/user/orderlist.js'
import { postComment } from '../../../fetch/user/orderlist.js'

import OrderListComponent from '../../../components/OrderList'

import './style.less'

class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        	data: []
        }
    }
    render() {
    	const data = this.state.data
        return (
            <div id="container-orderlist">
            	<h3>您的订单</h3>
            	{
            		data.length
            		? <OrderListComponent data={data} submitComment={this.submitComment.bind(this)}/>
            		: ''
            	}
            </div>
        )
    }

    componentDidMount() {
    	const username = this.props.username
    	if(username) {
    		this.loadOrderListData(username)
    	}
    }

    loadOrderListData(username) {
    	const result = getOrderListData(username)
    	result.then(res => {
            return res.json()
        }).then(json => {
            this.setState({
            	data: json
            })
        })
    }

    submitComment(id, value, callback) {
        const result = postComment(id, value)
        result.then(res => {
            return res.json()
        }).then(json => {
            if(json.errno === 0) {
                callback()
            }
        })
    }
}

export default OrderList
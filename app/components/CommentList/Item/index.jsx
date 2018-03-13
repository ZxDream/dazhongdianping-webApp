import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Star from '../../Star'

import './style.less'

class Item extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const data = this.props.data
        return (
            <div id="commentList-item">
            	<div className="item-user">
                    <i className="icon-user"></i>
                    <span>{data.username}</span>
                </div>
                <Star star={data.star}/>
                <p>{data.comment}</p>
            </div>
        )
    }
}

export default Item
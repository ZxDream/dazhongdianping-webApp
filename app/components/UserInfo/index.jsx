import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class UserInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div id="userinfo-container">
            	<p>
            		<i className="icon-user"></i>
            		<span>{this.props.username}</span>
            	</p>
            	<p>
            		<i className="icon-map-marker"></i>
            		<span>{this.props.cityName}</span>
            	</p>
            </div>
        )
    }
}

export default UserInfo
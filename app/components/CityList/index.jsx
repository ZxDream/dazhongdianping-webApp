import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class CityList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div id="city-list-wrapper">
            	<h1>城市列表</h1>
            	<ul className="clear-fix">
            		<li onClick={this.clickHandle.bind(this, '北京')}>
            			<span>北京</span>
            		</li>
            		<li onClick={this.clickHandle.bind(this, '上海')}>
            			<span>上海</span>
            		</li>
            		<li onClick={this.clickHandle.bind(this, '杭州')}>
            			<span>杭州</span>
            		</li>
            		<li onClick={this.clickHandle.bind(this, '广州')}>
            			<span>广州</span>
            		</li>
            		<li onClick={this.clickHandle.bind(this, '苏州')}>
            			<span>苏州</span>
            		</li>
            		<li onClick={this.clickHandle.bind(this, '深圳')}>
            			<span>深圳</span>
            		</li>
            		<li onClick={this.clickHandle.bind(this, '南京')}>
            			<span>南京</span>
            		</li>
            		<li onClick={this.clickHandle.bind(this, '天津')}>
            			<span>天津</span>
            		</li>
            		<li onClick={this.clickHandle.bind(this, '重庆')}>
            			<span>重庆</span>
            		</li>
            		<li onClick={this.clickHandle.bind(this, '厦门')}>
            			<span>厦门</span>
            		</li>
            		<li onClick={this.clickHandle.bind(this, '武汉')}>
            			<span>武汉</span>
            		</li>
            		<li onClick={this.clickHandle.bind(this, '西安')}>
            			<span>西安</span>
            		</li>
            	</ul>
            </div>
        )
    }

    clickHandle(newCity) {
    	const changeFn = this.props.changeFn
    	changeFn(newCity)
    }
}

export default CityList
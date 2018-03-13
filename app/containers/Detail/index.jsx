import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'
import Info from './subpage/Info'
import Comment from './subpage/Comment'
import Buy from './subpage/Buy'

class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const id = this.props.match.params.id
        return (
            <div>
                <Header history={this.props.history} title="商户详情"/>
                <Info id={id}/>
                <Buy history={this.props.history} id={id}/>
                <Comment id={id}/>
            </div>
        )
    }
}



export default Detail
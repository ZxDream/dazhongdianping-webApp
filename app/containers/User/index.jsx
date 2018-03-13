import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Header from '../../components/Header'
import UserInfo from '../../components/UserInfo'
import OrderList from './subpage/OrderList'

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const userinfo = this.props.userinfo
        return (
            <div>
                <Header history={this.props.history} title="用户中心" backRouter="/"/>
                <UserInfo username={userinfo.username} cityName={userinfo.cityName}/>
                <OrderList username={userinfo.username}/>
            </div>
        )
    }

    componentDidMount() {
        const username = this.props.userinfo.username
        if(!username) {
            this.props.history.push('/Login')
        }
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
    }
}

export default withRouter(connect(
    mapStateToProps
)(User))
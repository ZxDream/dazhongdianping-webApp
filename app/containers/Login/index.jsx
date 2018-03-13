import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 

import Header from '../../components/Header'
import LoginComponent from '../../components/Login'


class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        	checking: false
        }
    }
    render() {
        return (
            <div>
            	<Header history={this.props.history} title="登录"/>
        		{
        			this.state.checking
        			? <div></div>
        			: <LoginComponent loginHandleFn={this.loginHandle.bind(this)}/>
        		}
            </div>
        )
    }

    componentDidMount() {
    	this.doCheck()
    }

    loginHandle(username) {
    	const actions = this.props.userInfoActions
    	let userinfo = this.props.userinfo
    	userinfo.username = username
    	actions.update(userinfo)

    	const params = this.props.match.params
    	const router = params.router
        if(router) {
            this.props.history.push(decodeURIComponent(router))
    	} else {
    		this.goUserPage()
    	}
    }

    doCheck() {
    	const userinfo = this.props.userinfo
        if (userinfo.username) {
            this.goUserPage();
        } else {
            this.setState({
                checking: false
            })
        }
    }

    goUserPage() {
    	this.props.history.push('/User')
    }
}

function mapStateToProps(state) {
	return {
		userinfo: state.userinfo
	}
}

function mapDispatchToProps(dispatch) {
	return {
		userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
	}
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login))
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore'
import { CITYNAME } from '../config/localStoreKey'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'

import {Route, Switch} from 'react-router-dom'

import Home from '../containers/Home'
import City from '../containers/City'
import Login from '../containers/Login'
import User from '../containers/User'
import Search from '../containers/Search'
import Detail from '../containers/Detail'
import NotFound from '../containers/404'



class App extends React.Component {
	constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        	initDone: false
        }
    }

	render() {
		return (
			<div>
				{
                    this.state.initDone
                    ? <Switch>
                    	<Route exact path='/' component={Home}/>
						<Route path='/city' component={City}/>
		                <Route path='/Login/:router?' component={Login}/>
		                <Route path='/User' component={User}/>
		                <Route path='/search/:category/:keyword?' component={Search}/>
		                <Route path='/detail/:id' component={Detail}/>
		                <Route component={NotFound}/>
                    </Switch>
                    : <div>正在加载...</div>
                }
			</div>
		)
	}

	componentDidMount() {
		let cityName = LocalStore.getItem(CITYNAME)
		if (cityName == null) {
			cityName = '北京'
		}
		this.props.userInfoActions.update({
			cityName: cityName
		})

		this.setState({
			initDone: true
		})
	}
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))
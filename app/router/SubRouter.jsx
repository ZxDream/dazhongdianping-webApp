import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from '../containers/Home'
import City from '../containers/City'
import Login from '../containers/Login'
import User from '../containers/User'
import Search from '../containers/Search'
import Detail from '../containers/Detail'
import NotFound from '../containers/404'

export default class SubRouter extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Switch>
				<Route exact path='/' component={Home}/>
				<Route path='/city' component={City}/>
				<Route path='/Login/:router?' component={Login}/>
				<Route path='/User' component={User}/>
				<Route path='/search/:category/:keyword?' component={Search}/>
				<Route path='/detail/:id' component={Detail}/>
				<Route component={NotFound}/>
			</Switch>
		)
	}
}
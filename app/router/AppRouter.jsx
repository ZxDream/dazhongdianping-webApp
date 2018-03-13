import React, {Component} from 'react'
import {Route, HashRouter as Router} from 'react-router-dom'

import App from '../containers'
import SubRouter from './SubRouter'

/*import createBrowserHistory from 'history/createBrowserHistory'
const customHistory = createBrowserHistory()*/

export default class AppRouter extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Router>
				<App/>
			</Router>
		)
	}
}












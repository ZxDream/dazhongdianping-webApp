import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import './static/css/common.less'
import './static/css/font.css'

const store = configureStore()

import AppRouter from './router/AppRouter'

render(
    <Provider store={store}>
        <AppRouter/>
    </Provider>,
    document.getElementById('root')
)

import React from 'react'
import ReactDOM from 'react-dom'
import App from '~/App'
import { sw } from '~/Utils'

ReactDOM.render(<App/>, document.getElementById('root-main'))

sw()

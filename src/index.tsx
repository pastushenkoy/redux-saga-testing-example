import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/components/App'
import { Provider } from 'react-redux'
import { store, sagaMiddleware } from './state/createStore'
import { watchClick } from './state/sagas'

sagaMiddleware.run(watchClick)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	,
	document.getElementById('root'),
)

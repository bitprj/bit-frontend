import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import invariant from 'redux-immutable-state-invariant'

import rootReducer from './rootReducer'

import * as accountActions from './actions/account'
import * as learnDataActions from './actions/learnData'
import * as studentDataActions from './actions/studentData'
import * as themeActions from './actions/theme'
import * as viewManagerActions from './actions/viewManager'
const actionCreators = {
	...accountActions,
	...learnDataActions,
	...studentDataActions,
	...themeActions,
	...viewManagerActions
}

export default function configureStore(initialState) {
	const composeEnhancers = composeWithDevTools({
		actionCreators,
		trace: true,
		traceLimit: 25
	})

	const middleware = [thunk]

	process.env.NODE_ENV !== 'production' &&
		middleware.unshift(
			invariant({ ignore: ['learnData.currentCardUnnestedUnlockedHintRefs'] })
		)

	const store = createStore(
		rootReducer,
		initialState,
		composeEnhancers(applyMiddleware(...middleware))
	)

	// Enable Webpack hot module replacement for reducers
	// if (module.hot) {
	// 	module.hot.accept('./reducers', () =>
	// 		store.replaceReducer(require('./reducers'))
	// 	)
	// }

	return store
}

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

// const logger = store => {
//     return next => {
//         return action => {
//             console.log('[Middleware] Dispatching', action)
//             const result = next(action)
//             console.log('[Middleware] next state', store.getState())
//             return result
//         }
//     }
// }

export default function store() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
}
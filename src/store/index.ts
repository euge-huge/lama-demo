import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { authReducer, regionsReducer } from './reducers'

const rootReducer = combineReducers({
  auth: authReducer,
  regions: regionsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>

export default store

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  authReducer,
  regionsReducer,
  citiesReducer,
  commonStoreReducer
} from './reducers'

const rootReducer = combineReducers({
  auth: authReducer,
  regions: regionsReducer,
  cities: citiesReducer,
  common: commonStoreReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof rootReducer>

export default store

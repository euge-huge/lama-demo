import {
  CitiyAction,
  CitiesState,
  SET_CITIES,
  SET_CITIES_LOADING
} from '../types'

const initialState: CitiesState = {
  cities: [],
  loading: false
}

const citiesReducer = (
  state = initialState,
  action: CitiyAction
): CitiesState => {
  switch (action.type) {
    case SET_CITIES:
      return {
        ...state,
        cities: action.payload,
        loading: false
      }
    case SET_CITIES_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default: {
      return state
    }
  }
}

export default citiesReducer

import {
  RegionAction,
  RegionsState,
  SET_REGIONS,
  SET_REGIONS_LOADING
} from '../types'

const initialState: RegionsState = {
  regions: [],
  loading: false
}

const regionsReducer = (
  state = initialState,
  action: RegionAction
): RegionsState => {
  switch (action.type) {
    case SET_REGIONS:
      return {
        ...state,
        regions: action.payload,
        loading: false
      }
    case SET_REGIONS_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default: {
      return state
    }
  }
}

export default regionsReducer

import {
  CREATE_REGION,
  RegionAction,
  RegionsState,
  SET_REGIONS
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
    case CREATE_REGION:
      return {
        ...state,
        regions: state.regions.concat(action.payload)
      }
    case SET_REGIONS:
      return {
        ...state,
        regions: action.payload
      }
    default: {
      return state
    }
  }
}

export default regionsReducer

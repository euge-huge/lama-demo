import { CommonStateAction, CommonState, SET_ALERT } from '../types'

const initialState: CommonState = {
  alert: {
    isOpen: false,
    message: null
  }
}

const commonStoreReducer = (
  state = initialState,
  action: CommonStateAction
): CommonState => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload
      }
    default: {
      return state
    }
  }
}

export default commonStoreReducer

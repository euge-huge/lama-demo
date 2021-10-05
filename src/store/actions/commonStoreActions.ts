import { ThunkAction } from 'redux-thunk'

import { RootState } from '..'
import { CommonStateAction, Alert, SET_ALERT, AlertTypes } from '../types'

export const openAlert = (
  message: string,
  type: AlertTypes
): ThunkAction<void, RootState, null, CommonStateAction> => {
  return (dispatch) => {
    const alert: Alert = {
      isOpen: true,
      message,
      type
    }
    dispatch({
      type: SET_ALERT,
      payload: alert
    })
  }
}

export const closeAlert = (): ThunkAction<
  void,
  RootState,
  null,
  CommonStateAction
> => {
  return (dispatch) => {
    const alert: Alert = {
      isOpen: false,
      message: null
    }
    dispatch({
      type: SET_ALERT,
      payload: alert
    })
  }
}

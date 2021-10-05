import { ThunkAction } from 'redux-thunk'

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth'
import {
  serverTimestamp,
  getFirestore,
  setDoc,
  doc,
  getDoc
} from 'firebase/firestore'

import { RootState } from '..'
import { openAlert } from './commonStoreActions'
import {
  User,
  AuthAction,
  SignUpData,
  SignInData,
  SET_USER,
  SET_SUCCESS,
  SET_LOADING,
  SIGN_OUT,
  SET_ERROR,
  NEED_VERIFICATION
} from '../types'

// Sign up
export const signup = (
  data: SignUpData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const auth = getAuth()

      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      if (res.user) {
        const userData: User = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          id: res.user.uid,
          createdAt: serverTimestamp()
        }

        const db = getFirestore()

        await setDoc(doc(db, 'users', res.user.uid), userData)

        await sendEmailVerification(res.user)

        dispatch({
          type: NEED_VERIFICATION
        })

        dispatch({
          type: SET_USER,
          payload: userData
        })
      }
    } catch (err: any) {
      onError()

      dispatch(setError(err.message))
    }
  }
}

// Sign in
export const signin = (
  data: SignInData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, data.email, data.password)
    } catch (err: any) {
      onError()
      dispatch(setError(err.message))
    }
  }
}

// Log out
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const auth = getAuth()
      await auth.signOut()
      dispatch({
        type: SIGN_OUT
      })
      dispatch(openAlert('Вы вышли из системы', 'warning'))
    } catch (err: any) {
      dispatch(setLoading(false))
    }
  }
}

// Set need verification
export const setNeedVerification = (): ThunkAction<
  void,
  RootState,
  null,
  AuthAction
> => {
  return (dispatch) => {
    dispatch({
      type: NEED_VERIFICATION
    })
  }
}

// Get user by id
export const getUserById = (
  id: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const db = getFirestore()

      const user = await getDoc(doc(db, 'users', id))

      if (user.exists()) {
        const userData = user.data() as User
        dispatch({
          type: SET_USER,
          payload: userData
        })
      }
    } catch (err: any) {}
  }
}

// Send password reset email
export const sendPassResetEmail = (
  email: string,
  successMsg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      dispatch(openAlert(successMsg, 'success'))
    } catch (err: any) {
      dispatch(setError(err.message))
    }
  }
}

// Send email verify  email
export const sendVerifyEmail = (
  successMsg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const auth = getAuth()
      if (auth.currentUser) await sendEmailVerification(auth.currentUser)
      else dispatch(setError('Нет доступа'))

      dispatch(openAlert(successMsg, 'success'))
    } catch (err: any) {
      dispatch(setError(err.message))
    }
  }
}

// Set loading
export const setLoading = (
  value: boolean
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: value
    })
  }
}

// Set error
export const setError = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR,
      payload: msg
    })
  }
}

// Set success
export const setSuccess = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SUCCESS,
      payload: msg
    })
  }
}

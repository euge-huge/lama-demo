import { ThunkAction } from 'redux-thunk'
import {
  SignUpData,
  AuthAction,
  SET_USER,
  SET_SUCCESS,
  SET_LOADING,
  SIGN_OUT,
  User,
  SignInData,
  SET_ERROR,
  NEED_VERIFICATION
} from '../types'
import { RootState } from '..'
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

// Create user
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

      dispatch({
        type: SET_ERROR,
        payload: err.message
      })
    }
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
    } catch (err) {
      console.log(err)
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

// Log in
export const signin = (
  data: SignInData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, data.email, data.password)
    } catch (err: any) {
      console.log(err.message)
      onError()
      dispatch(setError(err.code))
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
    } catch (err) {
      console.log(err)
      dispatch(setLoading(false))
    }
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

// Send password reset email
export const sendPassResetEmail = (
  email: string,
  successMsg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      dispatch(setSuccess(successMsg))
    } catch (err: any) {
      console.log(err)
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
      else dispatch(setError('Нет доступа.'))

      dispatch(setSuccess(successMsg))
    } catch (err: any) {
      console.log(err)
      dispatch(setError(err.message))
    }
  }
}

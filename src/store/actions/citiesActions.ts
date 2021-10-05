import { ThunkAction } from 'redux-thunk'

import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

import { RootState } from '..'
import { openAlert } from './commonStoreActions'
import {
  CitiyAction,
  CitiyDataForm,
  City,
  SET_CITIES,
  SET_CITIES_LOADING
} from '../types'

export const getAllCitiessForUser = (): ThunkAction<
  void,
  RootState,
  null,
  CitiyAction
> => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))

      const db = getFirestore()

      const res = await getDocs(collection(db, 'cities'))

      const cities: City[] = res.docs.map((doc) => {
        const city = doc.data() as City

        return {
          ...city,
          id: doc.id
        }
      })

      const citiesByOwnerId: City[] = cities
        .filter((city) => city.ownerId === getAuth().currentUser?.uid)
        .sort((a, b) => a.createdAt - b.createdAt)

      dispatch({
        type: SET_CITIES,
        payload: citiesByOwnerId
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateCity = (
  data: City
): ThunkAction<void, RootState, null, CitiyAction> => {
  return async (dispatch) => {
    try {
      const db = getFirestore()

      await setDoc(doc(db, 'cities', data.id), {
        ...data
      })

      dispatch(openAlert('Населенный пункт обновлен!', 'success'))

      dispatch(getAllCitiessForUser())
    } catch (err: any) {
      dispatch(openAlert(err.message, 'error'))
    }
  }
}

export const createCity = (
  data: CitiyDataForm
): ThunkAction<void, RootState, null, CitiyAction> => {
  return async (dispatch) => {
    try {
      const db = getFirestore()

      const createdAt = serverTimestamp()

      await addDoc(collection(db, 'cities'), {
        ...data,
        createdAt,
        ownerId: getAuth().currentUser?.uid
      })

      dispatch(getAllCitiessForUser())

      dispatch(openAlert('Новый населенный пункт создан!', 'success'))
    } catch (err: any) {
      dispatch(openAlert(err.message, 'error'))
    }
  }
}

export const deleteСityById = (
  id: string
): ThunkAction<void, RootState, null, CitiyAction> => {
  return async (dispatch) => {
    try {
      const db = getFirestore()

      await deleteDoc(doc(db, 'cities', id))

      dispatch(getAllCitiessForUser())

      dispatch(openAlert('Населенный пункт удален!', 'warning'))
    } catch (err: any) {
      dispatch(openAlert(err.message, 'error'))
    }
  }
}

// Set loading
export const setLoading = (
  value: boolean
): ThunkAction<void, RootState, null, CitiyAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_CITIES_LOADING,
      payload: value
    })
  }
}

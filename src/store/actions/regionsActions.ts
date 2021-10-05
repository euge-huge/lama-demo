import { ThunkAction } from 'redux-thunk'

import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  getDocs,
  setDoc,
  getFirestore,
  serverTimestamp
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

import { RootState } from '..'
import { openAlert } from './commonStoreActions'
import {
  RegionAction,
  Region,
  RegionDataForm,
  SET_REGIONS,
  SET_REGIONS_LOADING
} from '../types'

export const getAllRegionsForUser = (): ThunkAction<
  void,
  RootState,
  null,
  RegionAction
> => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const db = getFirestore()

      const res = await getDocs(collection(db, 'regions'))

      const regions: Region[] = res.docs.map((doc) => {
        const region = doc.data() as Region

        return {
          ...region,
          id: doc.id
        }
      })

      const regionsByOwnerId: Region[] = regions
        .filter((region) => region.ownerId === getAuth().currentUser?.uid)
        .sort((a, b) => a.createdAt - b.createdAt)

      dispatch({
        type: SET_REGIONS,
        payload: regionsByOwnerId
      })
    } catch (err: any) {
      dispatch(openAlert(err.message, 'error'))
    }
  }
}

export const createNewRegion = (
  data: RegionDataForm
): ThunkAction<void, RootState, null, RegionAction> => {
  return async (dispatch) => {
    try {
      const db = getFirestore()

      const createdAt = serverTimestamp()

      await addDoc(collection(db, 'regions'), {
        ...data,
        createdAt,
        ownerId: getAuth().currentUser?.uid
      })

      dispatch(getAllRegionsForUser())

      dispatch(openAlert('Новый регион создан!', 'success'))
    } catch (err: any) {
      dispatch(openAlert(err.message, 'error'))
    }
  }
}

export const updateRegion = (
  data: Region
): ThunkAction<void, RootState, null, RegionAction> => {
  return async (dispatch) => {
    try {
      const db = getFirestore()

      await setDoc(doc(db, 'regions', data.id), {
        ...data
      })

      dispatch(getAllRegionsForUser())

      dispatch(openAlert('Регион обновлен!', 'success'))
    } catch (err: any) {
      dispatch(openAlert(err.message, 'error'))
    }
  }
}

export const deleteRegionById = (
  id: string
): ThunkAction<void, RootState, null, RegionAction> => {
  return async (dispatch) => {
    try {
      const db = getFirestore()

      await deleteDoc(doc(db, 'regions', id))

      dispatch(getAllRegionsForUser())

      dispatch(openAlert('Регион удален!', 'warning'))
    } catch (err: any) {
      dispatch(openAlert(err.message, 'error'))
    }
  }
}

// Set loading
export const setLoading = (
  value: boolean
): ThunkAction<void, RootState, null, RegionAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_REGIONS_LOADING,
      payload: value
    })
  }
}

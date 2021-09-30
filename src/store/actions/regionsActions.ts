import { ThunkAction } from 'redux-thunk'
import {
  RegionAction,
  Region,
  CREATE_REGION,
  RegionDataForm,
  SET_REGIONS
} from '../types'
import { RootState } from '..'
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  serverTimestamp
} from '@firebase/firestore'
import { getAuth } from '@firebase/auth'

export const createNewRegion = (
  data: RegionDataForm
): ThunkAction<void, RootState, null, RegionAction> => {
  return async (dispatch) => {
    try {
      const db = getFirestore()

      const createdAt = serverTimestamp()

      const res = await addDoc(collection(db, 'regions'), {
        ...data,
        createdAt,
        ownerId: getAuth().currentUser?.uid
      })

      const newRegion: Region = {
        ...data,
        id: res.id,
        createdAt,
        ownerId: getAuth().currentUser?.uid
      }

      dispatch({
        type: CREATE_REGION,
        payload: newRegion
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const getAllRegions = (): ThunkAction<
  void,
  RootState,
  null,
  RegionAction
> => {
  return async (dispatch) => {
    try {
      const db = getFirestore()

      const res = await getDocs(collection(db, 'regions'))

      console.log(res.docs)

      const regions: Region[] = res.docs.map((doc) => doc.data() as Region)

      const regionsByOwnerId: Region[] = regions.filter(
        (region) => region.ownerId === getAuth().currentUser?.uid
      )

      dispatch({
        type: SET_REGIONS,
        payload: regionsByOwnerId
      })
    } catch (err) {
      console.log(err)
    }
  }
}

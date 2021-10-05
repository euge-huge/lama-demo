import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { CssBaseline } from '@mui/material'

import Routes from './Routes'

import { RootState } from './store'

import {
  getUserById,
  setLoading,
  setNeedVerification
} from './store/actions/authActions'
import { getAllRegionsForUser } from './store/actions/regionsActions'
import { getAllCitiessForUser } from './store/actions/citiesActions'

import { Spinner } from './modules/common/Spinner'
import { Toaster } from './modules/common/Toaster'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state: RootState) => state.auth)

  // Check if user exists
  useEffect(() => {
    dispatch(setLoading(true))
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setLoading(true))
        await dispatch(getUserById(user.uid))
        if (!user.emailVerified) {
          dispatch(setNeedVerification())
        }

        dispatch(getAllCitiessForUser())
        dispatch(getAllRegionsForUser())
      }
      dispatch(setLoading(false))
    })

    return () => {
      unsubscribe()
    }
  }, [dispatch])

  // Loading Page
  if (loading) {
    return (
      <div
        style={{
          position: 'absolute',
          height: '100vh',
          width: '100vw',
          top: '0',
          left: '0'
        }}
      >
        <Spinner size={60} logo={true} />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <CssBaseline />

      <Toaster />

      <Routes />
    </BrowserRouter>
  )
}

export default App

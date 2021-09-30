import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'

import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { RootState } from './store'

import {
  getUserById,
  setLoading,
  setNeedVerification
} from './store/actions/authActions'

import { AuthLayout, MainLayout } from './modules/layouts'
import { PrivateRoute, PublicRoute } from './modules/auth'
import { SignUp, SignIn, ForgotPassword, Regions } from './modules/pages'

import { CssBaseline } from '@mui/material'
import VerifyEmail from './modules/pages/VerifyEmail'
import { Spinner } from './modules/common/Spinner/Spinner'
import Cities from './modules/pages/Cities'

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
      }
      dispatch(setLoading(false))
    })

    return () => {
      unsubscribe()
    }
  }, [dispatch])

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
        <Spinner />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <CssBaseline />

      <Switch>
        {/* Auth Routes */}
        <PublicRoute
          path="/signup"
          layout={AuthLayout}
          component={SignUp}
          exact
        />
        <PublicRoute
          path="/signin"
          layout={AuthLayout}
          component={SignIn}
          exact
        />
        <PublicRoute
          path="/forgot-password"
          layout={AuthLayout}
          component={ForgotPassword}
          exact
        />

        <PrivateRoute
          path="/verify-email"
          component={VerifyEmail}
          layout={AuthLayout}
          exact
        />

        {/* Main Layout Routes */}
        <PrivateRoute
          path="/cities"
          component={Cities}
          layout={MainLayout}
          exact
        />

        <PrivateRoute
          path="/regions"
          component={Regions}
          layout={MainLayout}
          exact
        />
      </Switch>
    </BrowserRouter>
  )
}

export default App

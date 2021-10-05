import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import { AuthLayout, MainLayout } from './modules/layouts'
import {
  Cities,
  ForgotPassword,
  Regions,
  SignIn,
  SignUp,
  VerifyEmail
} from './modules/pages'

import { RootState } from './store'

const Routes: React.FC = () => {
  const { authenticated, needVerification } = useSelector(
    (state: RootState) => state.auth
  )

  if (authenticated && !needVerification)
    return (
      <Switch>
        <Route path="/" exact>
          <MainLayout title="Населенные пункты">
            <Cities />
          </MainLayout>
        </Route>
        <Route path="/regions" exact>
          <MainLayout title="Регионы">
            <Regions />
          </MainLayout>
        </Route>
        <Redirect to="/" />
      </Switch>
    )

  if (authenticated && needVerification)
    return (
      <Switch>
        <Route path="/verify-email" exact>
          <AuthLayout title="Подтверждение почты">
            <VerifyEmail />
          </AuthLayout>
        </Route>

        <Redirect to="/verify-email" />
      </Switch>
    )

  if (!authenticated)
    return (
      <Switch>
        <Route path="/signin" exact>
          <AuthLayout title="Вход">
            <SignIn />
          </AuthLayout>
        </Route>
        <Route path="/signup" exact>
          <AuthLayout title="Регистрация">
            <SignUp />
          </AuthLayout>
        </Route>
        <Route path="/forgot-password" exact>
          <AuthLayout title="Восстановление пароля">
            <ForgotPassword />
          </AuthLayout>
        </Route>

        <Redirect to="/signin" />
      </Switch>
    )
  return null
}

export default Routes

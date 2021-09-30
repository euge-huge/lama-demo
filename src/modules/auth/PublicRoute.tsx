import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { RootState } from '../../store'

interface Props extends RouteProps {
  component: any
  layout: any
}

const PublicRoute: FC<Props> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  const { authenticated, needVerification } = useSelector(
    (state: RootState) => state.auth
  )

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!authenticated)
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          )

        if (authenticated && needVerification)
          return <Redirect to="/verify-email" />

        if (authenticated) return <Redirect to="/cities" />
      }}
    />
  )
}

export default PublicRoute

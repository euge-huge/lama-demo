import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { RootState } from '../../store'

interface Props extends RouteProps {
  component: any
  layout: any
}

const PrivateRoute: FC<Props> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  const { authenticated } = useSelector((state: RootState) => state.auth)

  return (
    <Route
      {...rest}
      render={(props: any) =>
        authenticated ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  )
}

export default PrivateRoute

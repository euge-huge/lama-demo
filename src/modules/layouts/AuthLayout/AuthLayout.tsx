import React from 'react'

import useStyles from './styles'

interface IProps {
  children: any
}

const AuthLayout: React.FC<IProps> = ({ children }: IProps) => {
  const c = useStyles()

  return <div className={c.root}>{children}</div>
}

export default AuthLayout

import React, { useEffect } from 'react'

import logo from '../../../assets/logo.svg'

import useStyles from './styles'

interface IProps {
  children: any
  title: string
}

const AuthLayout: React.FC<IProps> = ({ children, title }: IProps) => {
  const c = useStyles()

  useEffect(() => {
    document.title = 'Лама | ' + title
  }, [title])

  return (
    <div className={c.layoutRoot}>
      <img className={c.authLayoutLogo} src={logo} alt="logo" />
      {children}
    </div>
  )
}

export default AuthLayout

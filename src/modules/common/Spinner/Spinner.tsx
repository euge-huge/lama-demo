import React from 'react'

import { CircularProgress } from '@mui/material'

import logoSrc from '../../../assets/logo.svg'

import useStyles from './styles'

interface IProps {
  size?: number
  logo?: boolean
}

export const Spinner: React.FC<IProps> = ({ size = 60, logo = false }) => {
  const c = useStyles()

  return (
    <div className={c.spinner}>
      {logo && <img className={c.logo} src={logoSrc} alt="logo" />}
      <CircularProgress size={size} />
    </div>
  )
}

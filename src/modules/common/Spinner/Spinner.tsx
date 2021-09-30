import React from 'react'

import { CircularProgress } from '@mui/material'

import useStyles from './styles'

export const Spinner = () => {
  const c = useStyles()

  return (
    <div className={c.spinner}>
      <CircularProgress size={60} />
    </div>
  )
}

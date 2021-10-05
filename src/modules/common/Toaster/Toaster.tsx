import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar, Alert } from '@mui/material'
import { RootState } from '../../../store'
import { closeAlert } from '../../../store/actions/commonStoreActions'

export const Toaster = () => {
  const dispatch = useDispatch()

  const { alert } = useSelector((state: RootState) => state.common)

  return (
    <Snackbar
      open={alert.isOpen}
      autoHideDuration={4000}
      onClose={() => {
        dispatch(closeAlert())
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity={alert.type}>{alert.message}</Alert>
    </Snackbar>
  )
}

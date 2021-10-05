import React, { useState, FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Paper, Typography, Box, TextField, Button, Alert } from '@mui/material'

import { RootState } from '../../../store'
import {
  sendPassResetEmail,
  setError,
  setSuccess
} from '../../../store/actions/authActions'

import useStyles from './styles'

const ForgotPassword: React.FC = () => {
  const c = useStyles()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { error, success } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''))
      }
      if (success) {
        dispatch(setSuccess(''))
      }
    }
  }, [error, dispatch, success])

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (success) {
      dispatch(setSuccess(''))
    }
    if (error) {
      dispatch(setError(''))
    }
    setLoading(true)
    await dispatch(
      sendPassResetEmail(
        email,
        'Сообщение с инструкцией для восстановления пароля отправлено!'
      )
    )
    setLoading(false)
  }

  return (
    <Paper elevation={2} className={c.root}>
      <Typography className={c.header} variant="h5" component="h4">
        Восстановление пароля
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Box className={c.form} component="form" onSubmit={submitHandler}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: '10px' }}
          fullWidth
        >
          {loading ? 'Loading...' : 'Восстановить'}
        </Button>
      </Box>
    </Paper>
  )
}

export default ForgotPassword

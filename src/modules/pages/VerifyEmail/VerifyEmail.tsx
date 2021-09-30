import React, { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  sendVerifyEmail,
  setError,
  setSuccess,
  signout
} from '../../../store/actions/authActions'
import { RootState } from '../../../store'

import { Paper, Typography, Button } from '@mui/material'

import useStyles from './styles'
import { getAuth } from '@firebase/auth'

const VerifyEmail: FC = () => {
  const c = useStyles()

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

  const sendVerifyHandler = async (e: React.MouseEvent) => {
    setLoading(true)
    await dispatch(sendVerifyEmail('Сообщение отправлено!'))
    setLoading(false)
  }

  const signoutHandler = async (e: React.MouseEvent) => {
    setLoading(true)
    await dispatch(signout())
    setLoading(false)
  }

  return (
    <Paper elevation={2} className={c.root}>
      <Typography className={c.header} variant="h5" component="h4">
        Аккаунт не подтвержден!
      </Typography>

      <Typography component="p" sx={{ marginTop: '10px' }}>
        На ваш email: {getAuth().currentUser?.email}, выслано письмо с
        подтверждением! Следуйте инструкции в письме, чтобы завершить
        регистрацию!
      </Typography>

      <Typography component="p" sx={{ marginTop: '10px' }}>
        Если письмо не пришло или устарело, нажмите на кнопку ниже.
      </Typography>

      <Button
        variant="contained"
        onClick={sendVerifyHandler}
        sx={{ marginTop: '10px' }}
        fullWidth
      >
        {loading ? 'Loading...' : 'Отправить еще раз'}
      </Button>

      <Button
        variant="contained"
        onClick={signoutHandler}
        sx={{ marginTop: '10px' }}
        fullWidth
      >
        Войти в другой аккаунт
      </Button>
    </Paper>
  )
}

export default VerifyEmail

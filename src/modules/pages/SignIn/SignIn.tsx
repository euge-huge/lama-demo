import React, { FC, useState, FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { RootState } from '../../../store'
import { signin, setError } from '../../../store/actions/authActions'

import { Paper, Typography, Box, TextField, Button, Link } from '@mui/material'

import useStyles from './styles'

const SignIn: FC = () => {
  const c = useStyles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { error } = useSelector((state: RootState) => state.auth)

  const history = useHistory()

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''))
      }
    }
  }, [error, dispatch])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (error) {
      dispatch(setError(''))
    }
    setLoading(true)
    dispatch(signin({ email, password }, () => setLoading(false)))
  }

  return (
    <Paper elevation={2} className={c.root}>
      <Typography className={c.header} variant="h5" component="h4">
        Авторизация
      </Typography>

      <Box className={c.form} component="form" onSubmit={submitHandler}>
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <TextField
          id="password"
          sx={{ marginTop: '15px' }}
          className={c.input}
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <div className={c.links}>
          <Link
            href="/forgot-password"
            onClick={(e: any) => {
              e.preventDefault()
              history.push('/forgot-password')
            }}
          >
            Забыли пароль?
          </Link>

          <Link
            href="/signup"
            onClick={(e: any) => {
              e.preventDefault()
              history.push('/signup')
            }}
          >
            Создать аккаунт
          </Link>
        </div>

        <Button variant="contained" type="submit" fullWidth>
          {loading ? 'Loading...' : 'Войти'}
        </Button>
      </Box>
    </Paper>
  )
}

export default SignIn

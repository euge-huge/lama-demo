import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Link,
  Alert
} from '@mui/material'

import { RootState } from '../../../store'
import { signup, setError } from '../../../store/actions/authActions'

import useStyles from './styles'

const SignUp: React.FC = () => {
  const c = useStyles()

  const dispatch = useDispatch()
  const history = useHistory()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const { error } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''))
      }
    }
  }, [error, dispatch])

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (error) {
      dispatch(setError(''))
    }
    setLoading(true)

    if (password === confirmPassword)
      dispatch(
        signup({ email, lastName, password, firstName }, () =>
          setLoading(false)
        )
      )
  }

  return (
    <Paper elevation={2} className={c.root}>
      <Typography className={c.header} variant="h5" component="h4">
        Регистрация
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box className={c.form} component="form" onSubmit={submitHandler}>
        <TextField
          id="firstName"
          label="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <TextField
          id="lastName"
          sx={{ marginTop: '15px' }}
          label="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <TextField
          id="email"
          sx={{ marginTop: '15px' }}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <TextField
          id="password"
          sx={{ marginTop: '15px' }}
          type="password"
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <TextField
          id="confirmPassword"
          sx={{ marginTop: '15px' }}
          type="password"
          label="Подтверждение пароля"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <Typography className={c.links}>
          Уже есть аккаунт?{' '}
          <Link
            href="/signin"
            onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
              e.preventDefault()
              history.push('/signin')
            }}
          >
            Войти.
          </Link>
        </Typography>

        <Button variant="contained" type="submit" fullWidth>
          {loading ? 'Loading...' : 'Регистрация'}
        </Button>
      </Box>
    </Paper>
  )
}

export default SignUp

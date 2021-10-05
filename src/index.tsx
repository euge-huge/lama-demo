import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { ThemeProvider, createTheme } from '@mui/material'

import App from './App'

import './firebase'

import store from './store'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00631d'
    }
  },
  typography: {
    fontSize: 13
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

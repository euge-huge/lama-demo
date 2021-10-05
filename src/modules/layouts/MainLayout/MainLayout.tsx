import React, { useEffect } from 'react'

import { Box, Toolbar } from '@mui/material'

import { Navigation } from './Components/Navigation'

interface IProps {
  children: any
  title: string
}

const MainLayout: React.FC<IProps> = ({ children, title }: IProps) => {
  useEffect(() => {
    document.title = 'Лама | ' + title
  }, [title])

  return (
    <Box sx={{ display: 'flex' }}>
      <Navigation />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default MainLayout

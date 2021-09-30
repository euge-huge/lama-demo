import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signout } from '../../../../../store/actions/authActions'

import { RootState } from '../../../../../store'

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Box
} from '@mui/material'

import {
  AccountCircle,
  MenuOpen,
  TableChart,
  AddLocationAlt
} from '@mui/icons-material'

export const Header = () => {
  const dispatch = useDispatch()

  const { authenticated: auth, user } = useSelector(
    (state: RootState) => state.auth
  )

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const logoutHandler = async () => {
    await dispatch(signout())
  }

  const history = useHistory()

  return (
    <>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: '250px' }}>
          <Toolbar />
          <List>
            <ListItem
              button
              onClick={() => {
                history.push('/cities')
                setDrawerOpen(false)
              }}
            >
              <ListItemIcon>
                <TableChart />
              </ListItemIcon>
              <ListItemText primary="Таблица городов" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                history.push('/regions')
                setDrawerOpen(false)
              }}
            >
              <ListItemIcon>
                <AddLocationAlt />
              </ListItemIcon>
              <ListItemText primary="Добавить регион" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuOpen />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Тестовое задание
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>
                  {user?.firstName} {user?.lastName}
                </MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

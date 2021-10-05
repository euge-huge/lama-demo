import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

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
  Divider,
  Box
} from '@mui/material'

import {
  AccountCircle,
  Menu as MenuIcon,
  TableChart,
  AddLocationAlt
} from '@mui/icons-material'

import { RootState } from '../../../../../store'
import { signout } from '../../../../../store/actions/authActions'

import logo from '../../../../../assets/logo.svg'

const drawerWidth = 240

export const Navigation: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const { authenticated: auth, user } = useSelector(
    (state: RootState) => state.auth
  )

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logoutHandler = async () => {
    await dispatch(signout())
  }

  const drawer = (
    <>
      <Toolbar>
        <img
          src={logo}
          alt="logo"
          style={{ maxHeight: 40, margin: '0 auto' }}
        />
      </Toolbar>
      <Divider />
      <List>
        <ListItem
          button
          key="Населенные пункты"
          onClick={() => {
            history.push('/')
            handleDrawerToggle()
          }}
        >
          <ListItemIcon>
            <TableChart />
          </ListItemIcon>
          <ListItemText primary="Населенные пункты" />
        </ListItem>
      </List>
      <Divider />
      <ListItem
        button
        key="Регионы"
        onClick={() => {
          history.push('/regions')
          handleDrawerToggle()
        }}
      >
        <ListItemIcon>
          <AddLocationAlt />
        </ListItemIcon>
        <ListItemText primary="Регионы" />
      </ListItem>
    </>
  )

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Население
          </Typography>

          {auth && (
            <div>
              <IconButton size="large" onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
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

                <MenuItem onClick={logoutHandler}>Выйти</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )
}

import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  layoutRoot: {
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  authLayoutLogo: {
    maxHeight: 50,
    marginBottom: 20
  }
})

export default useStyles

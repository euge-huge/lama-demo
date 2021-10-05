import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: '99%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px auto',
    padding: '10px 20px',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      height: 300
    }
  },
  input: {
    [theme.breakpoints.down('lg')]: {
      width: '99%',
      margin: '0 auto'
    }
  },
  region: {
    width: 270,
    [theme.breakpoints.down('lg')]: {
      width: '99%',
      margin: '0 auto'
    }
  },
  button: {
    [theme.breakpoints.down('lg')]: {
      width: '99%',
      margin: '0 auto'
    }
  }
}))

export default useStyles

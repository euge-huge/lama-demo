import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px auto',
    padding: '10px 20px',
    [theme.breakpoints.down('lg')]: {
      width: '99%',
      flexDirection: 'column',
      height: 170
    }
  },
  input: {
    width: 360,
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
  },
  list: {
    width: '80%',
    margin: '0 auto!important',
    [theme.breakpoints.down('lg')]: {
      width: '99%'
    }
  },
  listItem: {
    borderBottom: '1px #c5c5c5 solid'
  },
  editInput: {
    width: '70%'
  }
}))

export default useStyles

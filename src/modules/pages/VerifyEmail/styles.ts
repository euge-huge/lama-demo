import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 'auto',
    padding: '15px',
    width: '450px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  },
  header: {
    textAlign: 'center'
  },
  form: {
    marginTop: '10px'
  },
  input: {
    marginTop: '10px'
  },
  links: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 0'
  }
}))

export default useStyles

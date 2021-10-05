import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  spinner: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(1px)',
    zIndex: 999
  },
  logo: {
    maxHeight: 50,
    marginBottom: 25
  }
})

export default useStyles

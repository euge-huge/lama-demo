import React from 'react'

import { useDispatch } from 'react-redux'
import { createNewRegion } from '../../../store/actions/regionsActions'

import useStyles from './styles'

const Regions: React.FC = () => {
  const c = useStyles()

  const dispatch = useDispatch()
  return (
    <div>
      <h1>Regions</h1>
      <button
        onClick={async () => {
          await dispatch(
            createNewRegion({
              name: 'Irkutskaya oblast'
            })
          )
        }}
      >
        create
      </button>
    </div>
  )
}

export default Regions
